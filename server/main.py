from fastapi import FastAPI
# from Models import metadata
from app.DataStore.database import engine, Base
from app.Routers import user, authentication, OTPRouter, card
from fastapi.middleware.cors import CORSMiddleware
# from app.Config.email import send_email
from app.celery_worker import send_email
from app.AuthUtilities.auth_middleware import auth_middleware

origins = [
    "http://localhost:3000",
]

app = FastAPI()

app.middleware('http')(auth_middleware)
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(engine)

    
app.include_router(user.router)
app.include_router(authentication.router)
app.include_router(OTPRouter.router)
app.include_router(card.router)
