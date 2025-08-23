from fastapi import APIRouter, Depends, Header, HTTPException
from sqlalchemy.orm import Session
from ..database import get_session, Base, engine
from .. import models, schemas, security
from sqlalchemy import select
from typing import Optional

# Ensure tables exist (simple for initial incremental dev; later use migrations)
Base.metadata.create_all(bind=engine)

router = APIRouter(prefix="/auth", tags=["auth"])

# Idempotency via custom header: X-Idempotency-Key (not stored yet, just allow same email) - we interpret register as idempotent on email
@router.post("/register", response_model=schemas.RegisterResponse)
def register(user_in: schemas.UserCreate, idempotency_key: Optional[str] = Header(default=None, alias="X-Idempotency-Key"), session: Session = Depends(get_session)):
    existing = session.scalar(select(models.User).where(models.User.email == user_in.email))
    if existing:
        return schemas.RegisterResponse(user=existing, created=False)
    # create user
    user = models.User(email=user_in.email, password_hash=security.hash_password(user_in.password))
    session.add(user)
    session.flush()  # populate id
    return schemas.RegisterResponse(user=user, created=True)
