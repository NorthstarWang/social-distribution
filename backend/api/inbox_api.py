from django.http import JsonResponse
from django.views.decorators.http import require_http_methods


@require_http_methods(["GET", "POST", "DELETE"])
def author_inbox(request, author_id):
    return JsonResponse({'message': f'Accessing inbox for author {author_id}'})