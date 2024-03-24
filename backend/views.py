from django.http import JsonResponse, HttpResponse
from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.contrib.auth import logout
from django.contrib.auth.decorators import login_required
from django.conf import settings


def index(request):
    if settings.DEBUG:
        return JsonResponse({'message': 'Debug mode is ON'})
    return render(request, 'index.html')


def login_view(request):
    return JsonResponse({'message': 'Login view'})


def register_view(request):
    return JsonResponse({'message': 'Register view'})


def create_post_view(request):
    return JsonResponse({'message': 'Create post view'})


def profile_view(request, author_id):
    return JsonResponse({'message': f'Profile view for author {author_id}'})


def settings_view(request):
    return JsonResponse({'message': 'Settings view'})


def manage_posts_view(request):
    return JsonResponse({'message': 'Manage posts view'})
