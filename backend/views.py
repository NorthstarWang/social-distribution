from django.http import JsonResponse, HttpResponse
from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.contrib.auth import logout
from django.contrib.auth.decorators import login_required
from django.conf import settings


def index(request):
    if settings.SERVE_FRONTEND:
        return JsonResponse({'message': 'Debug mode is ON'})
    return render(request, 'index.html')
