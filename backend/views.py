from django.http import JsonResponse
from django.shortcuts import render
from django.conf import settings

from backend.decorators import frontend_debug_mode


@frontend_debug_mode
def index(request):
    if settings.SERVE_FRONTEND:
        return JsonResponse({'message': 'Debug mode is ON'})
    return render(request, 'index.html')


@frontend_debug_mode
def auth_index(request):
    if settings.SERVE_FRONTEND:
        return JsonResponse({'message': 'Debug mode is ON'})
    return render(request, 'authentication/index.html')