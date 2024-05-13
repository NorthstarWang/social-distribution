from django.shortcuts import render
from backend.decorators import frontend_debug_mode


@frontend_debug_mode
def browse_post_view(request):
    return render(request, 'browse/post/index.html')
