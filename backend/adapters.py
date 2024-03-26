from allauth.socialaccount.adapter import DefaultSocialAccountAdapter
from allauth.socialaccount.models import SocialAccount
from .models import Author


class CustomSocialAccountAdapter(DefaultSocialAccountAdapter):
    def pre_social_login(self, request, sociallogin):
        # Check if the social login already exists
        if sociallogin.is_existing:
            # Existing social login, update the Author instance
            user = sociallogin.user
            social_account = SocialAccount.objects.filter(user_id=user.id, provider='github').first()
            if social_account:
                extra_data = social_account.extra_data
                author, created = Author.objects.update_or_create(
                    user=user,
                    defaults={
                        'github': extra_data.get('html_url', ''),
                        'profileImage': extra_data.get('avatar_url', ''),
                        'bio': extra_data.get('bio', ''),
                        'displayName': extra_data.get('name', ''),
                    }
                )
        else:
            # New social login
            if 'login' not in sociallogin.account.extra_data:
                return

            github_username = sociallogin.account.extra_data['login']
            try:
                # Find if an Author with the same GitHub username already exists
                author = Author.objects.get(github__iexact=github_username)
                # Connect the new social login to the existing author
                sociallogin.connect(request, author.user)
            except Author.DoesNotExist:
                # New GitHub username, let allauth handle the new social account
                return
