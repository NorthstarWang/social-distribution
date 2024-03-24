from django.http import JsonResponse
from django.views.decorators.http import require_http_methods


@require_http_methods(["GET", "POST"])
def author_posts(request, author_id):
    return JsonResponse({'message': f'Listing posts or creating a new post for author {author_id}'})


@require_http_methods(["GET", "PUT", "DELETE"])
def post_detail(request, author_id, post_id):
    return JsonResponse({'message': f'Getting, updating, or deleting post {post_id} for author {author_id}'})


@require_http_methods(["GET", "POST"])
def post_comments(request, author_id, post_id):
    return JsonResponse(
        {'message': f'Listing comments or adding a new comment to post {post_id} of author {author_id}'})


@require_http_methods(["GET"])
def post_likes(request, author_id, post_id):
    return JsonResponse({'message': f'Listing likes on post {post_id} of author {author_id}'})
