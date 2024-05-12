import json
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt, requires_csrf_token

from backend.decorators import require_authenticated_non_get
from backend.models import Post


@require_http_methods(["GET"])
def author_posts(request, author_id):
    posts = Post.objects.filter(author__id=author_id)
    return JsonResponse({'posts': [post.as_json() for post in posts]}, safe=False)

@csrf_exempt
@requires_csrf_token
@require_authenticated_non_get
@require_http_methods(["GET", "POST", "PUT", "DELETE"])
def post(request, post_id=None):
    print(request.body)
    if request.method == 'GET':
        try:
            post = Post.objects.get(pk=post_id)
            return JsonResponse(post.as_json(), safe=False)
        except Post.DoesNotExist:
            return JsonResponse({'error': 'Post not found'}, status=404)

    elif request.method == 'POST':
        data = json.loads(request.body)
        post = Post(
            author=request.user,  # Assuming user is logged in and set as the author
            title=data['title'],
            content=data['content'],
            visibility=data.get('visibility', 'PUBLIC'),
        )
        post.save()
        return JsonResponse({'message': True}, status=201)


    elif request.method == 'PUT':
        return JsonResponse({'message': 'Update post'})

    elif request.method == 'DELETE':
        return JsonResponse({'message': 'Delete post'})

    return JsonResponse({'error': 'Invalid HTTP method'}, status=405)

@require_http_methods(["GET"])
def posts(request, start, count):
    start = int(start)
    count = int(count)
    posts = Post.objects.all()[start:start + count]
    return JsonResponse({'posts': [post.as_json() for post in posts], 'hasMore': len(posts) == count}, safe=False)


@require_http_methods(["GET", "POST"])
def post_comments(request, author_id, post_id):
    return JsonResponse(
        {'message': f'Listing comments or adding a new comment to post {post_id} of author {author_id}'})


@require_http_methods(["GET"])
def post_likes(request, author_id, post_id):
    return JsonResponse({'message': f'Listing likes on post {post_id} of author {author_id}'})
