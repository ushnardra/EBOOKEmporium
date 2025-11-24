import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'bookstore_backend.settings')
django.setup()

from django.contrib.auth.models import User

if User.objects.filter(username='admin').exists():
    User.objects.get(username='admin').delete()
    print('Existing superuser "admin" deleted')

User.objects.create_superuser('admin', 'admin@example.com', 'password123')
print('Superuser "admin" created with password "password123"')
