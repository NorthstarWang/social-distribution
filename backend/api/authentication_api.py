from urllib.parse import urlencode

from django.http import JsonResponse
from django.contrib.auth import get_user_model
from django.shortcuts import redirect
from django.views.decorators.http import require_http_methods

from social_distribution import settings

User = get_user_model()


@require_http_methods(['GET'])
def check_user_login_status(request):
    if request.user.is_authenticated:
        user_data = request.user.as_json()
        return JsonResponse({
            'logged_in': True,
            'user': user_data
        })
    else:
        return JsonResponse({'logged_in': False})


@require_http_methods(['GET'])
def github_callback(request):
    return redirect(settings.FRONTEND_HOME)


def initiate_github_login(request):
    github_params = {
        'client_id': 'YOUR_GITHUB_CLIENT_ID',
        'redirect_uri': 'YOUR_BACKEND_CALLBACK_URL',
        'scope': 'user',  # adjust the scope based on your requirements
        'state': 'SOME_RANDOM_GENERATED_STATE',  # ensure this is a secure random value
    }
    github_auth_url = f"https://github.com/login/oauth/authorize?{urlencode(github_params)}"

    return JsonResponse({'auth_url': github_auth_url})
