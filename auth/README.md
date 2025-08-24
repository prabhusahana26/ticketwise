# Auth Service

FastAPI auth service.

## Quick Start

**Option 1: Use the startup script (recommended)**
```
.\run_auth_service.ps1
```

**Option 2: Manual setup**
1. Activate virtual environment:
```
.\.venv\Scripts\Activate.ps1
```

2. Install dependencies:
```
pip install -r auth/requirements.txt
```

3. Start server:
```
uvicorn auth.app.main:app --reload
```

## Environment Setup

Create `auth/app/.env`:
```
DATABASE_URL=mysql+pymysql://root:Vinaychand%407@localhost:3306/ticketwise_auth
JWT_SECRET=Vinaychand@7
JWT_ALG=HS256
ACCESS_TOKEN_MINUTES=15
REFRESH_TOKEN_DAYS=7
```

**Important**: Special characters in passwords must be URL-encoded (@ becomes %40)

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
