from fastapi import APIRouter, Depends
from backend.utils.oauth2 import get_current_user
from backend import schemas, models
from sqlalchemy.orm import Session
from backend.database import get_db

router = APIRouter(
    prefix="/api/users",
    tags=["Users"]
)

@router.get("/me", response_model=schemas.UserResponse)
def get_me(current_user: models.User = Depends(get_current_user)):
    return current_user
