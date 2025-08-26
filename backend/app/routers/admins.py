# routers/admins.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from models import Admin
from schemas import AdminCreate, AdminLogin, AdminResponse
from passlib.context import CryptContext

router = APIRouter(prefix="/admins", tags=["Admins"])
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Utility
def hash_password(password: str):
    return pwd_context.hash(password)

def verify_password(plain, hashed):
    return pwd_context.verify(plain, hashed)


# ---------------- CREATE ADMIN ----------------
@router.post("/", response_model=AdminResponse, status_code=status.HTTP_201_CREATED)
def create_admin(admin: AdminCreate, db: Session = Depends(get_db)):
    existing = db.query(Admin).filter(Admin.email == admin.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already exists")

    hashed_pw = hash_password(admin.password)
    db_admin = Admin(
        name=admin.name,
        email=admin.email,
        phone=admin.phone,
        password=hashed_pw,
    )
    db.add(db_admin)
    db.commit()
    db.refresh(db_admin)
    return db_admin


# ---------------- LOGIN ----------------
@router.post("/login", response_model=AdminResponse)
def login_admin(credentials: AdminLogin, db: Session = Depends(get_db)):
    admin = db.query(Admin).filter(Admin.email == credentials.email).first()
    if not admin or not verify_password(credentials.password, admin.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    return admin

# ---------------- GET ADMIN BY ID ----------------
@router.get("/{admin_id}", response_model=AdminResponse)
def get_admin(admin_id: int, db: Session = Depends(get_db)):
    admin = db.query(Admin).filter(Admin.id == admin_id).first()
    if not admin:
        raise HTTPException(status_code=404, detail="Admin not found")
    return admin

from fastapi import Body
from schemas import AdminUpdate

@router.put("/{admin_id}", response_model=AdminResponse)
def update_admin(
    admin_id: int,
    updated: AdminUpdate,
    db: Session = Depends(get_db),
):
    db_admin = db.query(Admin).filter(Admin.id == admin_id).first()
    if not db_admin:
        raise HTTPException(status_code=404, detail="Admin not found")

    # check if email is taken by another admin
    if updated.email != db_admin.email:
        existing = db.query(Admin).filter(Admin.email == updated.email).first()
        if existing:
            raise HTTPException(status_code=409, detail="Email already exists")

    db_admin.name = updated.name
    db_admin.email = updated.email
    db_admin.phone = updated.phone

    db.commit()
    db.refresh(db_admin)
    return db_admin