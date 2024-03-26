from django.urls import path, include
from backend.api import *
import backend.views as views

urlpatterns = [
    # API
    # authors api
    path('service/authors/', authors_list, name='authors_list'),
    path('service/authors/<str:author_id>/', author_detail, name='author_detail'),
    path('service/authors/<str:author_id>/followers/', author_followers, name='author_followers'),
    path('service/authors/<str:author_id>/followers/<str:foreign_author_id>/', author_follower,
         name='author_follower'),
    # posts api
    path('service/authors/<str:author_id>/posts/', author_posts, name='author_posts'),
    path('service/authors/<str:author_id>/posts/<str:post_id>/', post_detail, name='post_detail'),
    path('service/authors/<str:author_id>/posts/<str:post_id>/comments/', post_comments, name='post_comments'),
    path('service/authors/<str:author_id>/posts/<str:post_id>/likes/', post_likes, name='post_likes'),
    # comments api
    path('service/authors/<str:author_id>/posts/<str:post_id>/comments/<str:comment_id>/', comment_detail,
         name='comment_detail'),
    path('service/authors/<str:author_id>/posts/<str:post_id>/comments/<str:comment_id>/likes/', comment_likes,
         name='comment_likes'),
    # liked api
    path('service/authors/<str:author_id>/liked/', author_liked, name='author_liked'),
    # inbox api
    path('service/authors/<str:author_id>/inbox/', author_inbox, name='author_inbox'),
    # auth api
    path('auth/check-login/', check_user_login_status, name='check_user_login_status'),
    path('auth/github/callback/', github_callback, name='github_callback'),
    
    # allauth
    path('accounts/', include('allauth.urls')),

    # View
    # index view
    path('', views.index),
]
