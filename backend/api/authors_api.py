from django.http import JsonResponse
from django.views.decorators.http import require_http_methods

from backend.decorators import require_authenticated_non_get
from backend.models import Author


# Use to list all authors or create a new author
@require_http_methods(["GET", "POST"])
def authors_list(request):
    return JsonResponse({'message': 'Listing authors or creating a new author'})


# Use to get or update an author
@require_authenticated_non_get
@require_http_methods(["GET", "PUT"])
def author_detail(request, author_id):
    # search author by author_id in the database
    try:
        user = Author.objects.get(id=author_id)
        return JsonResponse(user.as_json())
    except Author.DoesNotExist:
        return JsonResponse({'message': 'Author not found'}, status=404)


# Use to list all followers of an author
@require_authenticated_non_get
@require_http_methods(["GET"])
def author_followers(request, author_id):
    return JsonResponse({'message': f'Listing followers of author {author_id}'})


# Use to add or delete a follower
@require_http_methods(["PUT", "DELETE"])
def author_follower(request, author_id, foreign_author_id):
    return JsonResponse({'message': f'Operations on a specific follower {foreign_author_id} of author {author_id}'})
