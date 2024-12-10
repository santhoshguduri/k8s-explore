from fastapi import APIRouter, Depends, status, HTTPException
from app.Schemas.otp import OTPRequest, OTPVerify
from app.Services import email_service
from app.Services.otp_service import OTPService
from app.Services.user_service import UserService

router = APIRouter(
    tags=['otp'],
    prefix="/otp"
    )

@router.post("/new-user/send")
async def send_otp_new_user(request: OTPRequest, otp_service: OTPService = Depends(), user_service: UserService = Depends()):
    otp_record = otp_service.get_otp_data_by_email(request.email)

    curUser = user_service.get_user_by_email(email= request.email)

    if curUser and curUser.is_card_verified:
        raise HTTPException(status_code=400, detail="Email already registered")
    elif otp_record:
        otp_service.delete_records_by_email(request.email)

    otp_record = otp_service.generate_otp(request.email)

    email_service.send_otp_email(otp_record)

    return {"message": "OTP sent successfully!"}

@router.post("/existing-user/send")
async def send_otp_new_user(request: OTPRequest, otp_service: OTPService = Depends(), user_service: UserService = Depends()):
    otp_record = otp_service.get_otp_data_by_email(request.email)

    curUser = user_service.get_user_by_email(email= request.email)

    if otp_record:
        otp_service.delete_records_by_email(request.email)

    if curUser and curUser.is_card_verified:
        otp_record = otp_service.generate_otp(request.email)
    else:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"User not found!")
    email_service.send_otp_email(otp_record)

    return {"message": "OTP sent successfully!"}

@router.post("/verify")
def verify_otp(request: OTPVerify, otp_service: OTPService = Depends()):
    otp_service.verify_otp(request)

    return {"message": "OTP verified successfully!"}

@router.post("/resend")
def verify_otp(request: OTPRequest, otp_service: OTPService = Depends()):
    otp_record = otp_service.get_otp_data_by_email(request.email)

    if not otp_record:
        otp_record = otp_service.generate_otp(request.email)

    email_service.send_otp_email(otp_record)
        
    return {"message": "OTP sent successfully!"}