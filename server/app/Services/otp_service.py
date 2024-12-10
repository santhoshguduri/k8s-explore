from fastapi import HTTPException, Depends
from random import randint
from datetime import datetime, timedelta
from app.Models.OTPModel import OTPModel
from app.Schemas.otp import OTPRequest, OTPVerify
from app.Repository.otp_repository import OTPRepository


class OTPService:
    def __init__(self, otp_repo: OTPRepository = Depends()):
        self.otp_repo = otp_repo

    def generate_otp(self, email):
        otp = str(randint(1000, 9999))
        expires_at = datetime.now() + timedelta(minutes=5)
        otp_record = OTPModel(email=email, otp=otp, expires_at=expires_at)
        print('after')
        self.otp_repo.create(otp_record)

        return otp_record


    def verify_otp(self, request: OTPVerify ):
        otp_record = self.get_otp_data_by_email(request.email)

        print(otp_record, request)
        if not otp_record:
            raise HTTPException(status_code=404, detail="OTP not found")
        if otp_record.otp != request.otp:
            raise HTTPException(status_code=404, detail="Invalid OTP")
        if otp_record.expires_at < datetime.now():
            raise HTTPException(status_code=404, detail="OTP expired")

        self.delete_records_by_email(request.email)
        
        return True

    def get_otp_data_by_email(self, email):
        return self.otp_repo.get_otp_data_by_email(email)

    def delete_record(self, otp_record):
        self.otp_repo.delete(otp_record)

    def delete_records_by_email(self, email):
        self.otp_repo.delete_by_email(email)