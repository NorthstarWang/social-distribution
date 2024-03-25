from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.views.generic import TemplateView
from django.views.static import serve
import os

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('backend.urls')),
]

if not settings.DEBUG:
    urlpatterns += [
        re_path(r'^_next/static/(?P<path>.*)$', serve, {
            'document_root': os.path.join(settings.BASE_DIR, 'frontend/out/_next/static'),
        }),
        re_path(r'^_next/(?P<path>.*)$', serve, {
            'document_root': os.path.join(settings.BASE_DIR, 'frontend/out/_next'),
        }),
        re_path(r'^static/(?P<path>.*)$', serve, {
            'document_root': os.path.join(settings.BASE_DIR, 'frontend/out/static'),
        }),
        re_path(r'^(?P<path>.*)$', serve, {
            'document_root': os.path.join(settings.BASE_DIR, 'frontend/out'),
        }),
        path('', TemplateView.as_view(template_name='index.html')),
        re_path(r'^(?:.*)/?$', TemplateView.as_view(template_name='index.html')),
    ] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
