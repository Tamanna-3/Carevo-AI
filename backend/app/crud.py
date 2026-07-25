from sqlalchemy.orm import Session

from . import models
from .auth import hash_password



def create_user(
        db: Session,
        user
):

    hashed = hash_password(
        user.password
    )


    new_user = models.User(

        name=user.name,

        email=user.email,

        hashed_password=hashed

    )


    db.add(new_user)

    db.commit()

    db.refresh(new_user)


    return new_user



def get_user_by_email(
        db: Session,
        email: str
):

    return db.query(
        models.User
    ).filter(
        models.User.email == email
    ).first()

def login_user(
        db: Session,
        email: str
):

    return db.query(
        models.User
    ).filter(
        models.User.email == email
    ).first()

def create_job(
        db: Session,
        job
):

    new_job = models.Job(

        company=job.company,

        role=job.role,

        description=job.description,

        user_id=job.user_id

    )


    db.add(new_job)

    db.commit()

    db.refresh(new_job)


    return new_job

def get_jobs(
        db: Session
):

    return db.query(
        models.Job
    ).all()



def get_job(
        db: Session,
        job_id: int
):

    return db.query(
        models.Job
    ).filter(
        models.Job.id == job_id
    ).first()



def update_job_status(
        db: Session,
        job_id: int,
        status: str
):

    job = get_job(
        db,
        job_id
    )

    if job:

        job.status = status

        db.commit()

        db.refresh(job)


    return job



def delete_job(
        db: Session,
        job_id: int
):

    job = get_job(
        db,
        job_id
    )

    if job:

        db.delete(job)

        db.commit()


    return job