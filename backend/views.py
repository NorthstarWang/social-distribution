from django.shortcuts import render

from backend.decorators import frontend_debug_mode


@frontend_debug_mode
def index(request):
    return render(request, 'index.html')