# backend/schemas.py
from pydantic import BaseModel, EmailStr
from pydantic import BaseModel
from typing import Optional

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    username: str
    email: str

    class Config:
        from_attributes: bool = True

class ComplaintCreate(BaseModel):
    victim_name: str
    complaint_title: str
    culprit_name: Optional[str]
    incident_description: str
