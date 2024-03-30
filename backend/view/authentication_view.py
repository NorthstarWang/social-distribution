from django.shortcuts import render
from backend.decorators import frontend_debug_mode


@frontend_debug_mode
def auth_view(request):
    return render(request, 'authentication/index.html')
