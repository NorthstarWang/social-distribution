# Project Setup Guide

## Prerequisites

Ensure you have the following installed:

- Python 3.11
- npm 9.8.1
- Node.js 18.17.0
- PostgreSQL

## Backend Setup

1. Activate the virtual environment:

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

2. Install the required Python packages:

   ```bash
   pip install -r requirements.txt
   ```

3. Create a `.env.local` file at the root of the backend project with the following content:

   ```bash
   DJANGO_DEBUG=True
   ```

4. Configure your PostgreSQL database in `social_distribution/settings.py`. Replace the debug database settings with your local PostgreSQL credentials.

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

Now, you should have both the backend and frontend running locally for development. The backend will be available at `http://localhost:8000`, and the frontend will be accessible at `http://localhost:3000`.
