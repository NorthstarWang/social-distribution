from django.http import JsonResponse
from django.shortcuts import render
from django.conf import settings

from backend.decorators import frontend_debug_mode


@frontend_debug_mode
def index(request):
    return render(request, 'index.html')