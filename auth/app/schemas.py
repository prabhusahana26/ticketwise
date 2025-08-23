from pydantic import BaseModel, EmailStr
import uuid

class UserCreate(BaseModel):
    email: EmailStr
    password: str

class UserOut(BaseModel):
    id: uuid.UUID
    email: EmailStr
    class Config:
        from_attributes = True

class RegisterResponse(BaseModel):
    user: UserOut
    created: bool  # True if new user was created, False if already existed (idempotent)

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class TokenPair(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"

class LoginResponse(TokenPair):
    user: UserOut

class RefreshRequest(BaseModel):
    refresh_token: str

class RefreshResponse(TokenPair):
    pass

class ForgotPasswordRequest(BaseModel):
    email: EmailStr
