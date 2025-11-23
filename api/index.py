import os
import sys
from django.core.wsgi import get_wsgi_application

# Add the backend directory to the Python path
# This allows us to import from bookstore_backend
current_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(os.path.join(current_dir, 'backend'))

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'bookstore_backend.settings')

app = get_wsgi_application()
