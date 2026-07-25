from fastapi import FastAPI

from .database import engine

from .models import Base

from .routers import users
from .routers import jobs
from fastapi.middleware.cors import CORSMiddleware



app = FastAPI(
    title="Carevo AI"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "http://localhost:5173",
    "http://127.0.0.1:5173"
],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


Base.metadata.create_all(
    bind=engine
)



app.include_router(
    users.router
)

app.include_router(jobs.router)

@app.get("/")
def home():

    return {
        "message":
        "Carevo AI Backend Running"
    }