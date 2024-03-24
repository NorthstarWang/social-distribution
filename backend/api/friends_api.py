from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods


@login_required
@require_http_methods(["GET", "POST", "PUT", "DELETE"])
def friend_request(request, author_id):
    return JsonResponse({'message': f'Send a friend request to author {author_id}'})


@login_required
@require_http_methods(["GET"])
def friend_requests(request, author_id):
    return JsonResponse({'message': f'List friend requests for author {author_id}'})


@login_required
@require_http_methods(["GET", "DELETE"])
def friends(request, author_id):
    return JsonResponse({'message': f'List friends for author {author_id}'})


@login_required
@require_http_methods(["GET", "POST", "PUT", "DELETE"])
def friend(request, author_id, friend_id):
    return JsonResponse({'message': f'Remove friend {friend_id} from author {author_id}'})
