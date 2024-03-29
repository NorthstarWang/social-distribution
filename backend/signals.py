from allauth.account.signals import user_signed_up, user_logged_in
from allauth.socialaccount.signals import social_account_updated
from django.db.models.signals import post_save
from django.dispatch import receiver
from allauth.socialaccount.models import SocialAccount
from .models import Author


@receiver(user_signed_up)
def populate_author_profile(sender, **kwargs):
    author = kwargs['user']
    create_or_update_author(author)


@receiver(user_logged_in)
def update_author_profile_on_login(sender, request, user, **kwargs):
    create_or_update_author(user)


@receiver(social_account_updated)
def update_author_profile(sender, **kwargs):
    request = kwargs.get('request')
    social_account = kwargs.get('socialaccount')

    if social_account and social_account.user:
        author = social_account.user
        save_author(author, social_account)


def create_or_update_author(author):
    social_account = SocialAccount.objects.filter(user_id=author.id, provider='github').first()

    if social_account:
        save_author(author, social_account)


def save_author(author, social_account):
    extra_data = social_account.extra_data
    author.github = extra_data.get('html_url', '')
    author.profileImage = extra_data.get('avatar_url', '')
    author.bio = extra_data.get('bio', '')
    author.displayName = extra_data.get('name', '')
    author.username = extra_data.get('login', '')
    author.email = extra_data.get('email', '')
    author.save()
