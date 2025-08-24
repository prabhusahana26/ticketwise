# Auth Service

FastAPI auth service.

## Quick Start

**Option 1: Use the startup script (recommended)**
```
cd auth
.\run_auth_service.ps1
```

**Option 2: Manual setup**
1. From auth directory:
```
cd auth
```

2. Activate virtual environment:
```
..\.venv\Scripts\Activate.ps1
```

3. Install dependencies:
```
pip install -r requirements.txt
```

4. Start server:
```
uvicorn app.main:app --reload
```

## Environment Setup

Create `auth/app/.env` from template:
```
cp .env.example app/.env
```

Edit `app/.env`:
```
DATABASE_URL=mysql+pymysql://root:Vinaychand%407@localhost:3306/ticketwise_auth
JWT_SECRET=Vinaychand@7
JWT_ALG=HS256
ACCESS_TOKEN_MINUTES=15
REFRESH_TOKEN_DAYS=7
```

**Important**: Special characters in passwords must be URL-encoded (@ becomes %40)

## Test Database Connection

Before starting the service:
```
cd auth
python test_db_connection.py
```

## Endpoints
✅ POST /auth/register (implemented)
✅ POST /auth/login (implemented)  
✅ POST /auth/refresh (implemented)
✅ POST /auth/forgot-password (placeholder)

## API Documentation
- Health check: http://127.0.0.1:8000/healthz
- Interactive docs: http://127.0.0.1:8000/docs
- OpenAPI spec: http://127.0.0.1:8000/openapi.json

## MySQL Notes
Ensure database exists:
```
CREATE DATABASE ticketwise_auth CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

## Testing Endpoints

Register a user:
```bash
curl -X POST http://127.0.0.1:8000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Passw0rd!"}'
```

Login:
```bash
curl -X POST http://127.0.0.1:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Passw0rd!"}'
```

Refresh token (use refresh_token from login response):
```bash
curl -X POST http://127.0.0.1:8000/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{"refresh_token":"your_refresh_token_here"}'
```
