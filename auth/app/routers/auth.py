from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ..database import get_db, Base, engine
from .. import models, schemas, security
from sqlalchemy import select
from typing import Optional
from datetime import datetime, timezone, timedelta

# Ensure tables exist (simple for initial incremental dev; later use migrations)
Base.metadata.create_all(bind=engine)

router = APIRouter(prefix="/auth", tags=["auth"])

# Register endpoint - idempotent on email (won't create duplicates)
@router.post("/register", response_model=schemas.RegisterResponse)
def register(user_in: schemas.UserCreate, session: Session = Depends(get_db)):
    existing = session.scalar(select(models.User).where(models.User.email == user_in.email))
    if existing:
        return schemas.RegisterResponse(user=existing, created=False)
    # create user
    user = models.User(email=user_in.email, password_hash=security.hash_password(user_in.password))
    session.add(user)
    session.commit()
    session.refresh(user)  # populate id
    return schemas.RegisterResponse(user=user, created=True)

@router.post("/login", response_model=schemas.LoginResponse)
def login(credentials: schemas.LoginRequest, session: Session = Depends(get_db)):
    user = session.scalar(select(models.User).where(models.User.email == credentials.email))
    if not user or not security.verify_password(credentials.password, user.password_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    access = security.create_access_token(str(user.id))
    raw_refresh = security.generate_refresh_token()
    refresh_hash = security.hash_refresh_token(raw_refresh)
    expires = datetime.now(timezone.utc) + timedelta(days=security.REFRESH_TOKEN_DAYS)
    rt = models.RefreshToken(user_id=user.id, token_hash=refresh_hash, expires_at=expires)
    session.add(rt)
    session.commit()
    return schemas.LoginResponse(user=user, access_token=access, refresh_token=raw_refresh)

@router.post("/refresh", response_model=schemas.RefreshResponse)
def refresh(body: schemas.RefreshRequest, session: Session = Depends(get_db)):
    hashed = security.hash_refresh_token(body.refresh_token)
    rt = session.scalar(select(models.RefreshToken).where(models.RefreshToken.token_hash == hashed))
    if not rt:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid refresh token")
    
    # Ensure both datetimes are timezone-aware for comparison
    now_utc = datetime.now(timezone.utc)
    expires_at = rt.expires_at
    if expires_at.tzinfo is None:
        expires_at = expires_at.replace(tzinfo=timezone.utc)
    
    if expires_at < now_utc:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Expired refresh token")
    
    access = security.create_access_token(str(rt.user_id))
    # minimal approach: do not rotate refresh token yet
    return schemas.RefreshResponse(access_token=access, refresh_token=body.refresh_token)

@router.post("/forgot-password")
def forgot_password(body: schemas.ForgotPasswordRequest):
    # Minimal placeholder: pretend to enqueue reset email. Always 202 style response.
    return {"status": "accepted"}
