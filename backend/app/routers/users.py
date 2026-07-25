from ..auth import verify_password
from ..security import create_access_token
from fastapi import APIRouter, Depends, HTTPException

from sqlalchemy.orm import Session

from ..database import get_db

from .. import schemas, crud



router = APIRouter(
    prefix="/users",
    tags=["Users"]
)



@router.post(
    "/register",
    response_model=schemas.UserResponse
)
def register(

    user: schemas.UserCreate,

    db: Session = Depends(get_db)

):

    existing = crud.get_user_by_email(
        db,
        user.email
    )


    if existing:

        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )


    return crud.create_user(
        db,
        user
    )

@router.post(
    "/login",
    response_model=schemas.Token
)
def login(

    user: schemas.UserLogin,

    db: Session = Depends(get_db)

):

    db_user = crud.login_user(
        db,
        user.email
    )

    if not db_user:

        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    if not verify_password(
        user.password,
        db_user.hashed_password
    ):

        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    token = create_access_token(
        {
            "sub": db_user.email,
            "user_id": db_user.id
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }