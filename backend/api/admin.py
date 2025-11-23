from django.contrib import admin
from .models import Book, Comment

@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'genre', 'price', 'is_free', 'uploaded_by', 'created_at')
    list_filter = ('genre', 'is_free', 'created_at')
    search_fields = ('title', 'author', 'description')

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('book', 'user', 'rating', 'created_at')
    list_filter = ('rating', 'created_at')
    search_fields = ('text', 'user__username', 'book__title')
