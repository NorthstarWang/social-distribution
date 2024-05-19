import json
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt, requires_csrf_token

from backend.api.follow_api import get_user_friends
from backend.decorators import require_authenticated_non_get
from django.db.models import Q
from backend.models import Post
from django.utils.dateparse import parse_datetime


@require_http_methods(["GET"])
def author_posts(request, author_id):
    posts = Post.objects.filter(author__id=author_id)
    return JsonResponse({'posts': [post.as_json() for post in posts]}, safe=False)

@csrf_exempt
@requires_csrf_token
@require_authenticated_non_get
@require_http_methods(["GET", "POST", "PUT", "DELETE"])
def post(request, post_id=None):
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
def posts(request, post_id, count):
    count = int(count)

    posts_list = []
    user = request.user if request.user.is_authenticated else None
    
    if str(post_id) != '0':
        try:
            # Get the post corresponding to the post_id to find its timestamp
            starting_post = Post.objects.get(pk=post_id)
            start_timestamp = starting_post.created
        except Post.DoesNotExist:
            return JsonResponse({'error': 'Invalid post id'}, status=400)
    else:
        start_timestamp = None
    
    if user is None:
        if start_timestamp:
            posts_list = Post.objects.filter(visibility='public', created__lt=start_timestamp).order_by('-created')[:count]
        else:
            posts_list = Post.objects.filter(visibility='public').order_by('-created')[:count]
    else:
        friends = get_user_friends(user)
        if start_timestamp:
            # Fetch public posts or unlisted posts by friends created after the start timestamp
            posts_list = Post.objects.filter(
                Q(visibility='public') | 
                (Q(visibility='unlisted') & Q(author__in=friends) | Q(author=user))
            ).filter(created__gt=start_timestamp).order_by('-created')[:count]
        else:
            # Fetch the latest public posts or unlisted posts by friends
            posts_list = Post.objects.filter(
                Q(visibility='public') | 
                (Q(visibility='unlisted') & Q(author__in=friends) | Q(author=user))
            ).order_by('-created')[:count]

    reach_end = len(posts_list) < count
    
    return JsonResponse({
        'posts': [post.as_json() for post in posts_list],
        'reach_end': reach_end
    }, safe=False)


@require_http_methods(["GET"])
def get_latest_posts(request, timestamp):
    try:
        timestamp = parse_datetime(timestamp)
        if timestamp is None:
            return JsonResponse({'error': 'Invalid timestamp format'}, status=400)
    except ValueError:
        return JsonResponse({'error': 'Invalid timestamp'}, status=400)

    user = request.user if request.user.is_authenticated else None
    
    if user is None:
        posts_list = Post.objects.filter(visibility='public', created__gt=timestamp).order_by('-created')
    else:
        friends = get_user_friends(user)
        posts_list = Post.objects.filter(
            Q(visibility='public') | 
            (Q(visibility='unlisted') & Q(author__in=friends) | Q(author=user))
        ).filter(created__gt=timestamp).order_by('-created')
    
    return JsonResponse({'posts': [post.as_json() for post in posts_list]}, safe=False)


@require_http_methods(["GET"])
def get_latest_post(request, attribute=None):
    user = request.user if request.user.is_authenticated else None

    if user is None:
        latest_post = Post.objects.filter(visibility='public').order_by('-created').first()
    else:
        friends = get_user_friends(user)
        latest_post = Post.objects.filter(
            Q(visibility='public') | 
            (Q(visibility='unlisted') & Q(author__in=friends))
        ).order_by('-created').first()

    if latest_post:
        if attribute:
            try:
                attribute_value = getattr(latest_post, attribute)
                return JsonResponse({'post_attribute': attribute_value}, safe=False)
            except AttributeError:
                return JsonResponse({'error': f'Invalid attribute: {attribute}'}, status=400)
        return JsonResponse({'post': latest_post}, safe=False)
    else:
        return JsonResponse({'message': 'No posts available'}, status=200)
    

@require_http_methods(["GET", "POST"])
def post_comments(request, author_id, post_id):
    return JsonResponse(
        {'message': f'Listing comments or adding a new comment to post {post_id} of author {author_id}'})


@require_http_methods(["GET"])
def post_likes(request, author_id, post_id):
    return JsonResponse({'message': f'Listing likes on post {post_id} of author {author_id}'})
