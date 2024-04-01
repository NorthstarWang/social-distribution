# Project Setup Guide

## Prerequisites

Ensure you have the following installed:

- Python 3.11
- npm 9.8.1
- Node.js 18.17.0
- PostgreSQL

## Backend Local Setup

1. Activate the virtual environment:

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

2. Install the required Python packages:

   ```bash
   pip install -r requirements.txt
   ```

3. Create a `.env` file at the root of the backend project with the following content:

   ```bash
   SERVE_FRONTEND=False
   DJANGO_LOCAL=True
   GITHUB_LOCAL_CLIENT_ID=<YOUR_GITHUB_LOCAL_CLIENT_ID>
   GITHUB_LOCAL_CLIENT_SECRET=<YOUR_GITHUB_LOCAL_CLIENT_SECRET>
   GITHUB_CLIENT_ID=<YOUR_GITHUB_CLIENT_ID>
   GITHUB_CLIENT_SECRET=<YOUR_GITHUB_CLIENT_SECRET>
   CLOUDINARY_CLOUD_NAME=<your_cloud_name>
   CLOUDINARY_API_KEY=<your_api_key>
   CLOUDINARY_API_SECRET=<your_api_secret>
   ```

4. Configure your PostgreSQL database in `social_distribution/settings.py`. Replace the debug database settings with
   your local PostgreSQL credentials.

5. Migrate the database to create the necessary tables:

   ```bash
   python manage.py migrate
   ```

6. Create a superuser for Django admin:

   ```bash
   python manage.py createsuperuser
   ```

7. Start the Django development server:

   ```bash
   python manage.py runserver
   ```

**Note:** To access the Django admin interface, ensure you append a trailing slash to the URL (
e.g., http://localhost:8000/admin/), http://localhost:8000/admin will not work due to front end app routing.

## Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install the necessary npm packages:

   ```bash
   npm install
   ```

3. Create a `.env.local` file in the frontend directory with the following content:

   ```bash
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

4. Start the Next.js development server:

   ```bash
   npm run dev
   ```

**Updating Static Files**

Whenever you make changes to your static files, it's important to ensure that these changes are reflected in your production environment. To do this, you need to run Django's `collectstatic` command, which collects all static files from your apps and other locations specified in the `STATICFILES_DIRS` setting into the `STATIC_ROOT` directory.

Run the following command to update the static files:

```bash
python manage.py collectstatic
```

This command will collect all static files into the `STATIC_ROOT` directory. Make sure to commit any changes to your version control system and redeploy your application for the changes to take effect in your production environment.

Now, you should have both the backend and frontend running locally for development. The backend will be available
at `http://localhost:8000`, and the frontend will be accessible at `http://localhost:3000`.
