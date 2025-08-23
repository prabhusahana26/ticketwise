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
