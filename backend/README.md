# Meal Train Backend Setup

## Prerequisites

### Option 1: Docker Desktop (Recommended for beginners)

- **Windows / Mac**: [Download Docker Desktop](https://www.docker.com/products/docker-desktop/)
- **Linux**: [Docker Desktop for Linux](https://docs.docker.com/desktop/install/linux-install/)

### Option 2: Docker Engine + Docker Compose (Linux / Advanced users)

- **Linux only**: [Install Docker Engine](https://docs.docker.com/engine/install/)
- **Linux only**: [Install Docker Compose plugin](https://docs.docker.com/compose/install/)

---

## Quick Setup (3 Steps)

### 1. Install Docker

- **Windows / Mac**: Install Docker Desktop from the link above
- **Linux**: Follow Docker Engine instructions above

---

### 2. Set the environment variables in your .env
Edit the .env file:

    DJANGO_SECRET_KEY=your-secret-key
    DEBUG=1
    DJANGO_ALLOWED_HOSTS=localhost
    DATABASE_ENGINE=postgresql_psycopg2
    DATABASE_NAME=mealtrain_dev
    DATABASE_USERNAME=django_user
    DATABASE_PASSWORD=secure_password
    DATABASE_HOST=db
    DATABASE_PORT=5432

### 3. Start the Application

    cd backend
    docker-compose up --build

---

### Access:

- **Backend**: http://localhost:8000
- **Database**: localhost:5432
- **Admin**: http://localhost:8000/admin

---

## Docker Commands

    # Start services
    docker-compose up

    # Start in background
    docker-compose up -d

    # Stop services
    docker-compose down

    # View logs
    docker-compose logs -f

    # Rebuild
    docker-compose build --no-cache

---

## Django Commands

    # Run inside container
    docker-compose exec django-web python manage.py <command>

    # Examples:
    docker-compose exec django-web python manage.py migrate
    docker-compose exec django-web python manage.py createsuperuser

---

### To Reset Database

    docker-compose down -v
    docker-compose up -d
    docker-compose exec django-web python manage.py migrate

---