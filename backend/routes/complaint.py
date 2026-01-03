from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import Complaint
from schemas import ComplaintCreate

router = APIRouter(prefix="/api/complaints", tags=["Complaints"])

@router.post("/create")
def create_complaint(
    complaint: ComplaintCreate,
    db: Session = Depends(get_db)
):
    new_complaint = Complaint(
        victim_name=complaint.victim_name,
        complaint_title=complaint.complaint_title,
        culprit_name=complaint.culprit_name,
        incident_description=complaint.incident_description
    )

    db.add(new_complaint)
    db.commit()
    db.refresh(new_complaint)

    return {
        "message": "Complaint submitted successfully",
        "complaint_id": new_complaint.id
    }
