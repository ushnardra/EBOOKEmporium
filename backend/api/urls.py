from django.urls import path
from .views import UserCreate, LoginView, BookListCreate, BookDetail, CommentCreate

urlpatterns = [
    path('signup/', UserCreate.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('books/', BookListCreate.as_view(), name='book-list-create'),
    path('books/<int:pk>/', BookDetail.as_view(), name='book-detail'),
    path('books/<int:book_id>/comments/', CommentCreate.as_view(), name='comment-create'),
]
