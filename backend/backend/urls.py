from django.contrib import admin
from django.urls import path, include, re_path
from django.views.static import serve
from rest_framework_simplejwt.views import (TokenObtainPairView,TokenRefreshView,)
from django.conf import settings


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('store.urls')),
    path('token/', TokenObtainPairView.as_view()),
    path('token/refresh/', TokenRefreshView.as_view()),
    # Serve uploaded media files. In production the media directory is shipped
    # with the app, so it is served directly by Django regardless of DEBUG.
    re_path(
        r'^media/(?P<path>.*)$',
        serve,
        {'document_root': settings.MEDIA_ROOT},
    ),
]
