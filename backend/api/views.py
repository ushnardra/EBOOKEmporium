import requests as http_requests
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from .models import Book, Comment
from .serializers import UserSerializer, BookSerializer, CommentSerializer

class UserCreate(generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(username=username, password=password)
        if user:
            token, _ = Token.objects.get_or_create(user=user)
            return Response({"token": token.key, "username": user.username})
        else:
            return Response({"error": "Wrong Credentials"}, status=status.HTTP_400_BAD_REQUEST)


class SocialLoginView(APIView):
    """
    Handles social authentication from the frontend.
    Accepts a provider ('google' or 'github') and an access_token.
    Verifies with the provider, creates/retrieves the user, returns a DRF token.
    """
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        provider = request.data.get('provider')
        access_token = request.data.get('access_token')

        if not provider or not access_token:
            return Response(
                {'error': 'Provider and access_token are required.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            if provider == 'google':
                user_info = self._verify_google_token(access_token)
            elif provider == 'github':
                user_info = self._verify_github_token(access_token)
            else:
                return Response(
                    {'error': f'Unsupported provider: {provider}'},
                    status=status.HTTP_400_BAD_REQUEST
                )
        except Exception as e:
            return Response(
                {'error': f'Failed to verify token: {str(e)}'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Get or create user
        email = user_info.get('email', '')
        name = user_info.get('name', '')
        social_id = user_info.get('id', '')

        # Try to find existing user by email
        user = None
        if email:
            user = User.objects.filter(email=email).first()

        if not user:
            # Create a new user with a unique username
            base_username = name.replace(' ', '_').lower() if name else f'{provider}_user'
            username = base_username
            counter = 1
            while User.objects.filter(username=username).exists():
                username = f'{base_username}_{counter}'
                counter += 1

            user = User.objects.create_user(
                username=username,
                email=email,
                first_name=name.split(' ')[0] if name else '',
                last_name=' '.join(name.split(' ')[1:]) if name and len(name.split(' ')) > 1 else '',
            )
            # Set unusable password since this is a social login
            user.set_unusable_password()
            user.save()

        # Create/get DRF token
        token, _ = Token.objects.get_or_create(user=user)

        return Response({
            'token': token.key,
            'username': user.username,
            'email': user.email,
            'provider': provider,
        })

    def _verify_google_token(self, access_token):
        """Verify Google access token by calling Google's userinfo endpoint."""
        response = http_requests.get(
            'https://www.googleapis.com/oauth2/v3/userinfo',
            headers={'Authorization': f'Bearer {access_token}'},
            timeout=10
        )
        if response.status_code != 200:
            raise Exception('Invalid Google token')
        data = response.json()
        return {
            'id': data.get('sub'),
            'email': data.get('email', ''),
            'name': data.get('name', ''),
            'picture': data.get('picture', ''),
        }

    def _verify_github_token(self, access_token):
        """Verify GitHub access token by calling GitHub's user API."""
        # Get user profile
        response = http_requests.get(
            'https://api.github.com/user',
            headers={
                'Authorization': f'token {access_token}',
                'Accept': 'application/json',
            },
            timeout=10
        )
        if response.status_code != 200:
            raise Exception('Invalid GitHub token')
        data = response.json()

        # Get user email (may be private)
        email = data.get('email', '')
        if not email:
            email_response = http_requests.get(
                'https://api.github.com/user/emails',
                headers={
                    'Authorization': f'token {access_token}',
                    'Accept': 'application/json',
                },
                timeout=10
            )
            if email_response.status_code == 200:
                emails = email_response.json()
                primary = next((e for e in emails if e.get('primary')), None)
                if primary:
                    email = primary.get('email', '')

        return {
            'id': str(data.get('id')),
            'email': email,
            'name': data.get('name') or data.get('login', ''),
            'avatar': data.get('avatar_url', ''),
        }


class GithubCodeExchangeView(APIView):
    """
    Exchanges a GitHub authorization code for an access token.
    GitHub OAuth requires the code exchange to happen server-side
    because the client_secret must remain private.
    """
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        import os
        code = request.data.get('code')
        if not code:
            return Response(
                {'error': 'Authorization code is required.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        client_id = os.environ.get('GITHUB_CLIENT_ID', '')
        client_secret = os.environ.get('GITHUB_CLIENT_SECRET', '')

        if not client_id or not client_secret:
            return Response(
                {'error': 'GitHub OAuth is not configured. Set GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET environment variables.'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        # Exchange code for access token
        try:
            token_response = http_requests.post(
                'https://github.com/login/oauth/access_token',
                data={
                    'client_id': client_id,
                    'client_secret': client_secret,
                    'code': code,
                },
                headers={'Accept': 'application/json'},
                timeout=10
            )

            if token_response.status_code != 200:
                raise Exception('Failed to exchange code')

            token_data = token_response.json()
            access_token = token_data.get('access_token')

            if not access_token:
                error_desc = token_data.get('error_description', 'Unknown error')
                raise Exception(f'No access_token received: {error_desc}')

            return Response({'access_token': access_token})

        except Exception as e:
            return Response(
                {'error': f'GitHub code exchange failed: {str(e)}'},
                status=status.HTTP_400_BAD_REQUEST
            )

class BookListCreate(generics.ListCreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [permissions.AllowAny]

    def perform_create(self, serializer):
        # Only set uploaded_by if user is authenticated
        if self.request.user.is_authenticated:
            serializer.save(uploaded_by=self.request.user)
        else:
            # For anonymous uploads, we need a default user or make the field nullable
            # Let's get or create a default "Anonymous" user
            from django.contrib.auth.models import User
            anonymous_user, _ = User.objects.get_or_create(
                username='anonymous',
                defaults={'email': 'anonymous@example.com'}
            )
            serializer.save(uploaded_by=anonymous_user)

class BookDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class CommentCreate(generics.CreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        book_id = self.kwargs.get('book_id')
        book = Book.objects.get(id=book_id)
        serializer.save(user=self.request.user, book=book)
