import uuid

from django.db import models
from django.contrib.auth.models import AbstractUser


class Author(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    host = models.URLField(default='')
    displayName = models.CharField(max_length=255)
    github = models.URLField()
    profileImage = models.URLField()
    groups = models.ManyToManyField('auth.Group', related_name='author_groups')
    user_permissions = models.ManyToManyField('auth.Permission', related_name='author_permissions')

    def as_json(self):
        return {
            "type": "author",
            "id": self.id,
            "host": self.host,
            "displayName": self.displayName,
            "github": self.github,
            "profileImage": self.profileImage
        }


class Post(models.Model):
    id = models.URLField(primary_key=True)
    author = models.ForeignKey(Author, related_name='posts', on_delete=models.CASCADE)
    source = models.URLField()
    origin = models.URLField()
    title = models.CharField(max_length=255)
    description = models.TextField()
    contentType = models.CharField(max_length=50, default='text/markdown')
    content = models.TextField()
    published = models.DateTimeField()
    visibility = models.CharField(max_length=10,
                                  choices=(('PUBLIC', 'Public'), ('FRIENDS', 'Friends'), ('UNLISTED', 'Unlisted')))
    count = models.IntegerField(default=0)  # Number of comments

    def as_json(self):
        # This method will not include all comments to avoid heavy data load
        return {
            "type": "post",
            "title": self.title,
            "id": self.id,
            "source": self.source,
            "origin": self.origin,
            "description": self.description,
            "contentType": self.contentType,
            "content": self.content,
            "author": self.author.as_json(),
            "published": self.published.isoformat(),
            "visibility": self.visibility,
            "count": self.count,
            "commentsSrc": f"http://{self.author.host}/authors/{self.author.id}/posts/{self.id}/comments"
        }


class Comment(models.Model):
    id = models.URLField(primary_key=True)
    post = models.ForeignKey(Post, related_name='comments', on_delete=models.CASCADE)
    author = models.ForeignKey(Author, related_name='comments', on_delete=models.CASCADE)
    comment = models.TextField()
    contentType = models.CharField(max_length=50, default='text/markdown')
    published = models.DateTimeField()

    def as_json(self):
        return {
            "type": "comment",
            "author": self.author.as_json(),
            "comment": self.comment,
            "contentType": self.contentType,
            "published": self.published.isoformat(),
            "id": self.id,
        }


class Like(models.Model):
    author = models.ForeignKey(Author, related_name='likes', on_delete=models.CASCADE)
    post = models.ForeignKey(Post, related_name='likes', on_delete=models.CASCADE, null=True, blank=True)
    comment = models.ForeignKey(Comment, related_name='likes', on_delete=models.CASCADE, null=True, blank=True)

    def as_json(self):
        object_liked = self.post if self.post else self.comment
        return {
            "type": "Like",
            "author": self.author.as_json(),
            "object": object_liked.id if object_liked else ""
        }


class Image(models.Model):
    image = models.ImageField(upload_to='images/')
    post = models.ForeignKey(Post, related_name='images', null=True, blank=True, on_delete=models.CASCADE)
    comment = models.ForeignKey(Comment, related_name='images', null=True, blank=True, on_delete=models.CASCADE)


class Follow(models.Model):
    follower = models.ForeignKey(Author, related_name='following', on_delete=models.CASCADE)
    following = models.ForeignKey(Author, related_name='followers', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def as_json(self):
        return {
            "type": "follow",
            "follower": self.follower.as_json(),
            "following": self.following.as_json(),
            "created_at": self.created_at.isoformat(),
        }
