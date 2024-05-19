from backend.models import Follow
from django.db.models import Q

def is_friend(author_id, friend_id):
    return Follow.objects.filter(follower_id=author_id, following_id=friend_id).exists() and Follow.objects.filter(follower_id=friend_id, following_id=author_id).exists()


def get_user_friends(user):
    if user is None:
        return Follow.objects.none()

    # Users that the current user follows
    following = Follow.objects.filter(follower=user).values('following')
    
    # Users that follow the current user
    followers = Follow.objects.filter(following=user).values('follower')
    
    # Mutual followers (friends)
    friends = Follow.objects.filter(
        Q(follower__in=followers) &
        Q(following__in=following)
    ).values('following')
    
    return friends
