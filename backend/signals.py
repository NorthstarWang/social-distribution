from allauth.account.signals import user_signed_up, user_logged_in
from allauth.socialaccount.signals import social_account_updated
from django.db.models.signals import post_save
from django.dispatch import receiver
from allauth.socialaccount.models import SocialAccount
from .models import Author


@receiver(user_signed_up)
def populate_author_profile(sender, **kwargs):
    author = kwargs['user']
    social_account = SocialAccount.objects.filter(user_id=author.id, provider='github').first()

    if social_account:
        extra_data = social_account.extra_data
        author.github = extra_data.get('html_url', '')
        author.profileImage = extra_data.get('avatar_url', '')
        author.bio = extra_data.get('bio', '')
        author.displayName = extra_data.get('name', '')
        author.save()


@receiver(user_logged_in)
def update_author_profile_on_login(sender, request, user, **kwargs):
    social_account = SocialAccount.objects.filter(user_id=user.id, provider='github').first()

    if social_account:
        extra_data = social_account.extra_data
        user.github = extra_data.get('html_url', '')
        user.profileImage = extra_data.get('avatar_url', '')
        user.bio = extra_data.get('bio', '')
        user.displayName = extra_data.get('name', '')
        user.save()


@receiver(social_account_updated)
def update_author_profile(sender, **kwargs):
    request = kwargs.get('request')
    social_account = kwargs.get('socialaccount')

    if social_account and social_account.user:
        author = social_account.user
        extra_data = social_account.extra_data
        author.github = extra_data.get('html_url', '')
        author.profileImage = extra_data.get('avatar_url', '')
        author.bio = extra_data.get('bio', '')
        author.displayName = extra_data.get('name', '')
        author.save()
