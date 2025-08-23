from fastapi import FastAPI
from .routers import auth

app = FastAPI(title="Ticketwise Auth Service")

app.include_router(auth.router)

@app.get("/healthz")
def healthz():
    return {"status": "ok"}
