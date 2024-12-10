
from fastapi import HTTPException,status, Depends
from app.Models.OTPModel import OTPModel
from app.Schemas.otp import OTPRequest
from app.AuthUtilities.hashing import Hash
from app.Repository.base_repository import BaseRepository

class OTPRepository(BaseRepository):
    def create(self, otp_data: OTPModel):

        self.db.add(otp_data)
        self.db.commit()
        self.db.refresh(otp_data)
        return otp_data

    def merge(self, otp_data: OTPModel):

        self.db.commit()
        self.db.refresh(otp_data)
        return otp_data

    def delete(self, otp_data: OTPModel):

        self.db.delete(otp_data)
        self.db.commit()

    def delete_by_email(self, email):
        self.db.query(OTPModel).filter(OTPModel.email == email).delete(synchronize_session=False)
        self.db.commit()

    def get_otp_data_by_email(self, email: str):
        otp_data = self.db.query(OTPModel).filter_by(email=email)
        return otp_data.first()
