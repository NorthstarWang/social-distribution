import json
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods

from backend.models import Post


@require_http_methods(["GET"])
def author_posts(request, author_id):
    posts = Post.objects.filter(author__id=author_id)
    return JsonResponse({'posts': [post.as_json() for post in posts]}, safe=False)

@require_http_methods(["GET", "POST", "PUT", "DELETE"])
def post(request, author_id, post_id=None):
    if request.method == 'GET':
        return JsonResponse({'message': f'Retrieving post {post_id} of author {author_id}'})

    elif request.method == 'POST':
        if not request.user.is_authenticated:
            return JsonResponse({'error': 'Authentication required'}, status=403)

        data = json.loads(request.body)
        post = Post(
            author=request.user,  # Assuming user is logged in and set as the author
            title=data['title'],
            content=data['content'],
            visibility=data.get('visibility', 'PUBLIC'),
        )
        post.save()
        return JsonResponse(status=201)


    elif request.method == 'PUT':
        return JsonResponse({'message': 'Update post'})

    elif request.method == 'DELETE':
        return JsonResponse({'message': 'Delete post'})

    return JsonResponse({'error': 'Invalid HTTP method'}, status=405)

@require_http_methods(["GET", "POST"])
def post_comments(request, author_id, post_id):
    return JsonResponse(
        {'message': f'Listing comments or adding a new comment to post {post_id} of author {author_id}'})


@require_http_methods(["GET"])
def post_likes(request, author_id, post_id):
    return JsonResponse({'message': f'Listing likes on post {post_id} of author {author_id}'})
