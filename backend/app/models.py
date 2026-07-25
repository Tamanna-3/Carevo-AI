from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime

from .database import Base


class User(Base):

    __tablename__ = "users"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    name = Column(
        String,
        nullable=True
    )

    email = Column(
        String,
        unique=True,
        nullable=True
    )

    hashed_password = Column(
        Text,
        nullable=False
    )


    jobs = relationship(
        "Job",
        back_populates="owner"
    )



class Job(Base):

    __tablename__ = "jobs"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    company = Column(
        String
    )


    role = Column(
        String
    )


    description = Column(
        Text
    )


    status = Column(
        String,
        default="Saved"
    )


    deadline = Column(
        String
    )


    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )


    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )


    owner = relationship(
        "User",
        back_populates="jobs"
    )



class JobAnalysis(Base):

    __tablename__ = "job_analysis"


    id = Column(
        Integer,
        primary_key=True
    )


    job_id = Column(
        Integer,
        ForeignKey("jobs.id")
    )


    skills = Column(
        Text
    )


    tasks = Column(
        Text
    )


    match_score = Column(
        String
    )


    recommendations = Column(
        Text
    )