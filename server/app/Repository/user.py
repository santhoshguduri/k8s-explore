
from fastapi import HTTPException,status, Depends
from app.Models import User as UserModal
from app.Schemas import user as userSchema
from app.AuthUtilities.hashing import Hash
from app.Repository.base_repository import BaseRepository

class UserRepository(BaseRepository):
    def create(self, new_user):

        self.db.add(new_user)
        self.db.commit()
        self.db.refresh(new_user)
        return new_user

    def update(self, user_data):

        self.db.commit()
        self.db.refresh(user_data)
        return user_data

    def get_user_by_email(self, email: str):
        curUser = self.db.query(UserModal.User).filter(UserModal.User.email == email)
        return curUser.first()
    
    def get_user_by_id(self, user_id: str):
        curUser = self.db.query(UserModal.User).filter(UserModal.User.id == user_id)
        return curUser.first()
