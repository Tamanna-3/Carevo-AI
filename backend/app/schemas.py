from pydantic import BaseModel


class UserCreate(BaseModel):
    name: str
    email: str
    password: str



class UserLogin(BaseModel):
    email: str
    password: str



class UserResponse(BaseModel):

    id: int
    name: str
    email: str


    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str


class JobCreate(BaseModel):

    company: str

    role: str

    description: str

    user_id: int


class JobResponse(BaseModel):

    id: int
    company: str
    role: str
    description: str
    status: str
    user_id: int


    class Config:
        from_attributes = True