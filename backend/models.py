import uuid

import cloudinary.models
from django.db import models
from django.contrib.auth.models import AbstractUser


class Author(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    host = models.URLField(default='')
    displayName = models.CharField(max_length=255)
    github = models.URLField()
    profileImage = models.URLField()
    bio = models.TextField(default='', blank=True, null=True)
    username = models.CharField(max_length=255, unique=True)
    email = models.EmailField(default='', blank=True, null=True)
    groups = models.ManyToManyField('auth.Group', related_name='author_groups')
    user_permissions = models.ManyToManyField('auth.Permission', related_name='author_permissions')

    def as_json(self):
        return {
            "id": self.id,
            "host": self.host,
            "displayName": self.displayName,
            "github": self.github,
            "profileImage": self.profileImage,
            "username": self.username,
            "email": self.email,
            "bio": self.bio
        }


class Post(models.Model):
    id = models.URLField(primary_key=True, default=uuid.uuid4, editable=False)
    author = models.ForeignKey(Author, related_name='posts', on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    content = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)
    visibility = models.CharField(max_length=10, choices=(('PUBLIC', 'Public'), ('UNLISTED', 'Unlisted')))
    is_external = models.BooleanField(default=False)
    origin = models.URLField(blank=True, null=True)
    source_id = models.CharField(max_length=255, blank=True, null=True)

    def as_json(self):
        # This method will not include all comments to avoid heavy data load
        return {
            "title": self.title,
            "id": self.id,
            "content": self.content,
            "author": self.author.as_json(),
            "created": self.created.isoformat(),
            "modified": self.modified.isoformat(),
            "visibility": self.visibility,
            "is_external": self.is_external,
            "origin": self.origin,
            "source_id": self.source_id,
        }


class Comment(models.Model):
    id = models.URLField(primary_key=True)
    post = models.ForeignKey(Post, related_name='comments', on_delete=models.CASCADE)
    author = models.ForeignKey(Author, related_name='comments', on_delete=models.CASCADE)
    comment = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    def as_json(self):
        return {
            "author": self.author.as_json(),
            "comment": self.comment,
            "id": self.id,
            "post": self.post.id,
            "created": self.created.isoformat(),
            "modified": self.modified.isoformat(),
        }


class PostLike(models.Model):
    author = models.ForeignKey(Author, related_name='post_likes', on_delete=models.CASCADE)
    post = models.ForeignKey(Post, related_name='likes', on_delete=models.CASCADE)

    class Meta:
        unique_together = ('author', 'post')

    def as_json(self):
        return {
            "author": self.author.as_json(),
            "post": self.post.id,
        }


class CommentLike(models.Model):
    author = models.ForeignKey(Author, related_name='comment_likes', on_delete=models.CASCADE)
    comment = models.ForeignKey(Comment, related_name='likes', on_delete=models.CASCADE)

    class Meta:
        unique_together = ('author', 'comment')

    def as_json(self):
        return {
            "author": self.author.as_json(),
            "comment": self.comment.id,
        }


class Follow(models.Model):
    follower = models.ForeignKey(Author, related_name='following', on_delete=models.CASCADE)
    following = models.ForeignKey(Author, related_name='followers', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def as_json(self):
        return {
            "follower": self.follower.as_json(),
            "following": self.following.as_json(),
            "created_at": self.created_at.isoformat(),
        }
