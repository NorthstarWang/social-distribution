from django.http import JsonResponse
from django.views.decorators.http import require_http_methods


@require_http_methods(["GET"])
def author_liked(request, author_id):
    return JsonResponse({'message': f'Listing things liked by author {author_id}'})