from allauth.socialaccount.adapter import DefaultSocialAccountAdapter
from allauth.socialaccount.models import SocialAccount
from .models import Author


class CustomSocialAccountAdapter(DefaultSocialAccountAdapter):
    def pre_social_login(self, request, sociallogin):
        # Get GitHub username from the social account
        github_username = sociallogin.account.extra_data.get('login')
        if github_username:
            # Check if an existing author with the same GitHub username exists
            author, created = Author.objects.get_or_create(username__iexact=github_username)
            # Update the author instance with the latest data from GitHub
            if not created:
                self.update_author_from_github(author, sociallogin.account.extra_data)
            sociallogin.connect(request, author)

    @staticmethod
    def update_author_from_github(author, extra_data):
        # Update author fields with data from GitHub account
        author.github = extra_data.get('html_url', author.github)
        author.profileImage = extra_data.get('avatar_url', author.profileImage)
        author.bio = extra_data.get('bio', '')
        author.displayName = extra_data.get('name', author.displayName)
        author.email = extra_data.get('email', '')
        # Save the updated author instance
        author.save()
