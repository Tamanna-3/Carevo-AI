from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..database import get_db
from .. import schemas, crud
from ..services.ai_agent import analyze_job_description


router = APIRouter(
    prefix="/jobs",
    tags=["Jobs"]
)


# Create Job

@router.post("/")
def create_job(
    job: schemas.JobCreate,
    db: Session = Depends(get_db)
):

    return crud.create_job(
        db,
        job
    )



# Get All Jobs

@router.get("/")
def get_all_jobs(
    db: Session = Depends(get_db)
):

    return crud.get_jobs(db)



# Get Single Job

@router.get("/{job_id}")
def get_single_job(
    job_id:int,
    db:Session = Depends(get_db)
):

    job = crud.get_job(
        db,
        job_id
    )


    if not job:

        raise HTTPException(
            status_code=404,
            detail="Job not found"
        )


    return job



# Update Status

@router.put("/{job_id}")
def update_status(
    job_id:int,
    status:str,
    db:Session = Depends(get_db)
):

    return crud.update_job_status(
        db,
        job_id,
        status
    )



# Delete Job

@router.delete("/{job_id}")
def remove_job(
    job_id:int,
    db:Session = Depends(get_db)
):

    return crud.delete_job(
        db,
        job_id
    )

# Analyze Job Description

@router.post("/analyze")
def analyze_job(
    data: dict
):

    result = analyze_job_description(
        data["description"]
    )

    return result

@router.post("/analyze")
def analyze_job(
    data: dict
):

    result = analyze_job_description(
        data["description"]
    )

    return {
        "analysis": result
    }