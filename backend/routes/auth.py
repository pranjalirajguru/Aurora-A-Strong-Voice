# backend/routes/auth.py

from fastapi import APIRouter, HTTPException, Depends, Body
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from datetime import timedelta
from backend import models, schemas, database
from backend.utils.oauth2 import (
    create_access_token,
    create_refresh_token,
    verify_refresh_token,
    get_current_user,
)

router = APIRouter(prefix="/api/auth", tags=["Authentication"])

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
ACCESS_TOKEN_EXPIRE_MINUTES = 60


# --------------------------
# REGISTER
# --------------------------
@router.post("/register")
def register(user: schemas.UserCreate, db: Session = Depends(database.get_db)):
    existing_user = db.query(models.User).filter(models.User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_pw = pwd_context.hash(user.password)
    new_user = models.User(username=user.username, email=user.email, password=hashed_pw)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "User registered successfully", "user": new_user.username}


# --------------------------
# LOGIN (fixed)
# --------------------------
@router.post("/login")
def login(request: schemas.UserLogin = Body(...), db: Session = Depends(database.get_db)):
    print("📩 Received login request:", request.email, request.password)  # Debug log

    user = db.query(models.User).filter(models.User.email == request.email).first()
    if not user:
        print("❌ No user found for email:", request.email)
        raise HTTPException(status_code=400, detail="Invalid credentials")

    print("🔐 Checking password for user:", user.username)
    print("🗝️ Stored hash:", user.password)

    if not pwd_context.verify(request.password.strip(), user.password.strip()):
        print("❌ Password mismatch for user:", user.email)
        raise HTTPException(status_code=400, detail="Invalid credentials")

    print("✅ Password verified successfully for:", user.username)

    access_token = create_access_token({"sub": user.email})
    refresh_token = create_refresh_token({"sub": user.email})

    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
        "username": user.username,
        "email": user.email,
    }


# --------------------------
# REFRESH TOKEN
# --------------------------
@router.post("/refresh")
def refresh_token(
    refresh_token: str = Body(...),
    db: Session = Depends(database.get_db)
):
    email = verify_refresh_token(refresh_token)

    user = db.query(models.User).filter(models.User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    new_access_token = create_access_token(
        {"sub": user.email},
        timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES),
    )
    return {"access_token": new_access_token, "token_type": "bearer"}


# --------------------------
# GET CURRENT USER
# --------------------------
@router.get("/me")
def get_me(current_user: models.User = Depends(get_current_user)):
    return {
        "id": current_user.id,
        "username": current_user.username,
        "email": current_user.email,
    }
