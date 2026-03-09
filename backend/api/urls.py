from django.urls import path
from .views import UserCreate, LoginView, BookListCreate, BookDetail, CommentCreate, SocialLoginView, GithubCodeExchangeView

urlpatterns = [
    path('signup/', UserCreate.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('social-login/', SocialLoginView.as_view(), name='social-login'),
    path('github/exchange-code/', GithubCodeExchangeView.as_view(), name='github-exchange-code'),
    path('books/', BookListCreate.as_view(), name='book-list-create'),
    path('books/<int:pk>/', BookDetail.as_view(), name='book-detail'),
    path('books/<int:book_id>/comments/', CommentCreate.as_view(), name='comment-create'),
]
