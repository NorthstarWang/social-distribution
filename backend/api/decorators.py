from django.http import JsonResponse
from functools import wraps


def require_authenticated_non_get(func):
    @wraps(func)
    def wrapper(request, *args, **kwargs):
        if request.method != 'GET' and not request.user.is_authenticated:
            return JsonResponse({'error': 'Authentication required'}, status=403)
        return func(request, *args, **kwargs)

    return wrapper
