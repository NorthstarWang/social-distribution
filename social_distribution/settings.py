import os
import dj_database_url
from pathlib import Path
import cloudinary
import cloudinary.uploader
import cloudinary.api

DEBUG = False
# SECURITY WARNING: don't run with debug turned on in production!
SERVE_FRONTEND = os.environ.get('SERVE_FRONTEND', 'False') == 'True'  # Set to 'True' for development
LOCAL = os.environ.get('DJANGO_LOCAL', 'False') == 'True'  # Set to 'True' for local development

BASE_DIR = Path(__file__).resolve().parent.parent

STATIC_URL = 'static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'frontend/out/_next/static'),
] if not SERVE_FRONTEND else []
# STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

SECRET_KEY = 'django-insecure-ksaalir^q7i4w0a0*@3g-ujs9tb!nx$=g5o8@fcpu&7y($v$2%'

ALLOWED_HOSTS = ["localhost", '127.0.0.1', "social-distribution-yang-240ab3a73d7f.herokuapp.com"]

CORS_ALLOWED_ORIGINS = [
    "http://127.0.0.1:8000",
    'http://localhost:3000',
    'http://localhost:8000',
    "https://social-distribution-yang-240ab3a73d7f.herokuapp.com",
]

CSRF_TRUSTED_ORIGINS=[
    "http://127.0.0.1:8000",
    'http://localhost:3000',
    "https://social-distribution-yang-240ab3a73d7f.herokuapp.com",
]

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.sites',
    'backend',
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'allauth.socialaccount.providers.github',
    'corsheaders',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'allauth.account.middleware.AccountMiddleware',
]

ROOT_URLCONF = 'social_distribution.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'frontend/out')] if not SERVE_FRONTEND else [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'social_distribution.wsgi.application'

if LOCAL:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': 'socialDB',
            'USER': 'postgres',
            'PASSWORD': 'root',
            'HOST': 'localhost',
            'PORT': '5432',
        }
    }
else:
    DATABASES = {
        'default': dj_database_url.config(default=os.environ.get('DATABASE_URL'))
    }

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True
CORS_ALLOW_ALL_ORIGINS = True
AUTH_USER_MODEL = 'backend.Author'
SOCIALACCOUNT_ADAPTER = 'backend.adapters.CustomSocialAccountAdapter'
CORS_ALLOW_CREDENTIALS = True
SITE_ID = 1
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
LOGIN_REDIRECT_URL = '/auth/github/callback/'
FRONTEND_HOME = 'http://localhost:3000/' if SERVE_FRONTEND else '/'
SOCIALACCOUNT_LOGIN_ON_GET = True
SOCIALACCOUNT_AUTO_SIGNUP = True
ACCOUNT_LOGOUT_ON_GET = True
ACCOUNT_LOGOUT_REDIRECT_URL = 'http://localhost:3000/' if SERVE_FRONTEND else '/'

if LOCAL:
    SOCIALACCOUNT_PROVIDERS = {
        'github': {
            'SCOPE': ['user', 'repo'],
            'APP': {
                'client_id': os.environ.get('GITHUB_LOCAL_CLIENT_ID'),
                'secret': os.environ.get('GITHUB_LOCAL_CLIENT_SECRET'),
                'key': ''
            }
        }
    }
else:
    SOCIALACCOUNT_PROVIDERS = {
        'github': {
            'APP': {
                'client_id': os.environ.get('GITHUB_CLIENT_ID'),
                'secret': os.environ.get('GITHUB_CLIENT_SECRET'),
                'key': ''
            }
        }
    }

CLOUDINARY_CLOUD_NAME = os.environ.get('CLOUDINARY_CLOUD_NAME')
CLOUDINARY_API_KEY = os.environ.get('CLOUDINARY_API_KEY')
CLOUDINARY_API_SECRET = os.environ.get('CLOUDINARY_API_SECRET')
cloudinary.config(
    cloud_name=CLOUDINARY_CLOUD_NAME,
    api_key=CLOUDINARY_API_KEY,
    api_secret=CLOUDINARY_API_SECRET
)
