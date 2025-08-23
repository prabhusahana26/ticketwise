# Auth Service

Minimal incremental FastAPI auth service.

## Run (dev)

Install deps:
```
pip install -r requirements.txt
```

Environment variables (create a `.env` file):
```
DATABASE_URL=postgresql+psycopg2://user:password@localhost:5432/ticketwise_auth
JWT_SECRET=devsecretchange
JWT_ALG=HS256
```

Start server:
```
uvicorn app.main:app --reload
```

## Incremental Endpoints
1. POST /auth/register (implemented)
2. POST /auth/login
3. POST /auth/refresh
4. POST /auth/forgot-password
