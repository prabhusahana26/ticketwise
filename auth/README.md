# Auth Service

FastAPI auth service.

## Run (dev)

Install deps:
```
pip install -r requirements.txt
```

Environment variables (create a `.env` file):
```
DATABASE_URL=mysql+pymysql://root:password@localhost:3306/ticketwise_auth
JWT_SECRET=devsecretchange
JWT_ALG=HS256
```

Start server:
```
uvicorn app.main:app --reload
```

## Endpoints
1. POST /auth/register (implemented)
2. POST /auth/login
3. POST /auth/refresh
4. POST /auth/forgot-password

## MySQL Notes
Default driver switched to PyMySQL. Ensure database exists:
```
mysql -u root -p -e "CREATE DATABASE ticketwise_auth CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
```
