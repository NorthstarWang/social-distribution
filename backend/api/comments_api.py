from django.http import JsonResponse
from django.views.decorators.http import require_http_methods


@require_http_methods(["GET", "PUT", "DELETE"])
def comment_detail(request, author_id, post_id, comment_id):
    return JsonResponse(
        {'message': f'Getting, updating, or deleting comment {comment_id} of post {post_id} of author {author_id}'})


@require_http_methods(["GET"])
def comment_likes(request, author_id, post_id, comment_id):
    return JsonResponse({'message': f'Listing likes on comment {comment_id} of post {post_id} of author {author_id}'})
