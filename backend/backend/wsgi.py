"""
WSGI config for backend project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/6.0/howto/deployment/wsgi/
"""

import os

from django.conf import settings
from django.core.wsgi import get_wsgi_application
from whitenoise import WhiteNoise

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

application = get_wsgi_application()

# Serve the committed media files through WhiteNoise (cache headers, range
# requests, safe path handling) instead of Django's debug-only static server.
application = WhiteNoise(application)
application.add_files(str(settings.MEDIA_ROOT), prefix=settings.MEDIA_URL)
