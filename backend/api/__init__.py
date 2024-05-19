# Importing author-related API endpoints
from .authors_api import authors_list, author_detail, author_followers, author_follower
from .comments_api import comment_detail, comment_likes
from .posts_api import author_posts, post, post_comments, post_likes, posts, get_latest_post
from .authentication_api import check_user_login_status, github_callback
from .follow_api import is_friend, get_user_friends
