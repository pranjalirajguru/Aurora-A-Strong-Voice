from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend import models, schemas, database

router = APIRouter(prefix="/api/complaints", tags=["Complaints"])

@router.post("/create")
def create_complaint(
    complaint: schemas.ComplaintCreate,
    db: Session = Depends(database.get_db)
):
    new_complaint = models.Complaint(
        victim_name=complaint.victim_name,
        complaint_title=complaint.complaint_title,
        culprit_name=complaint.culprit_name,
        incident_description=complaint.incident_description
    )
    db.add(new_complaint)
    db.commit()
    db.refresh(new_complaint)
    return {"message": "Complaint submitted successfully", "id": new_complaint.id}
