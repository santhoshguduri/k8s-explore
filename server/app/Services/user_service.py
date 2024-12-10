from fastapi import APIRouter,Depends,Response,HTTPException, Cookie, Request
import stripe
import os
from app.Schemas import user as userSchema, token as TokenSchema
from app.Services import auth_service as AuthUtility
from app.Repository.user import UserRepository
from app.Services import auth_service
from app.Models import User as UserModal
import uuid

class UserService:
    def __init__(self, user_repo: UserRepository = Depends()):
        self.user_repo = user_repo

    def get_user_by_email(self, email):
        return self.user_repo.get_user_by_email(email)
    
    def get_current_user_id(self, user_id):
        if not user_id:
            raise HTTPException(status_code=401, detail="Unauthorized")
        return self.user_repo.get_user_by_id(user_id)

    def create(self, user_data):

        if 'google_id' in user_data.dict():
            new_user = UserModal.User(
                id=uuid.uuid4(),
                email=user_data.email,
                # google_id=user_data["google_id"],
                firstname=user_data.firstname,
                lastname= user_data.lastname
            )
        else:
            new_user = UserModal.User(
                id=uuid.uuid4(),
                firstname=user_data.firstName,
                lastname=user_data.lastName,
                email=user_data.email, 
                # password=Hash.bcrypt(user_data.password),
            )
        return self.user_repo.create(new_user)

    def update(self, user_data):
        self.user_repo.update(user_data)