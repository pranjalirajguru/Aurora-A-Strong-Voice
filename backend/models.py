from sqlalchemy import Column, Integer, String, Sequence, DateTime, func
from backend.database import Base
from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy import Sequence


user_id_seq = Sequence('user_id_seq', start=1, increment=1)

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, user_id_seq, primary_key=True, server_default=user_id_seq.next_value())
    username = Column(String(255), unique=True, nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    password = Column(String(255), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Complaint(Base):
    __tablename__ = "complaints"

    id = Column(Integer, Sequence('complaint_id_seq'), primary_key=True, index=True)
    victim_name = Column(String(255), nullable=False)
    complaint_title = Column(String(255), nullable=False)
    culprit_name = Column(String(255))
    incident_description = Column(Text, nullable=False)
    status = Column(String(50), default="Pending")
    user_id = Column(Integer, ForeignKey("users.id"))