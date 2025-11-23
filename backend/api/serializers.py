from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Book, Comment

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class CommentSerializer(serializers.ModelSerializer):
    user_username = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Comment
        fields = ['id', 'book', 'user', 'user_username', 'text', 'rating', 'created_at']
        read_only_fields = ['user', 'created_at']

class BookSerializer(serializers.ModelSerializer):
    uploaded_by_username = serializers.ReadOnlyField(source='uploaded_by.username')
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Book
        fields = ['id', 'title', 'author', 'genre', 'description', 'price', 'is_free', 'pdf_file', 'cover_image', 'uploaded_by', 'uploaded_by_username', 'created_at', 'comments']
        read_only_fields = ['uploaded_by', 'created_at']
