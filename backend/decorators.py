from django.http import JsonResponse
from functools import wraps

from social_distribution import settings


def frontend_debug_mode(view_func):
    def _wrapped_view_func(request, *args, **kwargs):
        if settings.SERVE_FRONTEND:
            return JsonResponse({'message': 'Debug mode is ON'})
        return view_func(request, *args, **kwargs)
    return _wrapped_view_func


def require_authenticated_non_get(func):
    @wraps(func)
    def wrapper(request, *args, **kwargs):
        if request.method != 'GET' and not request.user.is_authenticated:
            return JsonResponse({'error': 'Authentication required'}, status=403)
        return func(request, *args, **kwargs)

    return wrapper
