from fastapi import APIRouter, Depends, Response, status, HTTPException, Header
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.responses import JSONResponse
from app.Models import User as models
from app.Services import auth_service
from app.AuthUtilities.hashing import Hash
from sqlalchemy.orm import Session
from app.Repository import user
from app.Schemas import token as tokenSchema, user as UserRequest, otp as otp_schema
from app.Services.user_service import UserService
from app.Services.otp_service import OTPService

router = APIRouter(
    tags=['Authentication'],
    # prefix= '/auth'
    )

GOOGLE_CLIENT_ID = "520425927005-qorg9ek2lb9h80dcdnntqvdtjsn39kjm.apps.googleusercontent.com"

@router.post('/login')
def login(request: otp_schema.OTPVerify, response: Response = None, otp_service: OTPService = Depends()):
    otp_service.verify_otp(request)

    access_token = auth_service.create_access_token(data={"sub": request.email})
    refresh_token = auth_service.create_refresh_token(data={"sub": request.email})

    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        # secure=True,
        samesite="Strict",  # Prevent CSRF
    )

    return {"access_token": access_token, "token_type": "bearer"}

@router.post('/api/auth/logout')
def logout(response: Response = None):

    response.delete_cookie(key="refresh_token")

    return {"message": "User logged-out successfully!"}

@router.get("/api/auth/verify-token")
async def verify_token(token_data: tokenSchema.TokenData = Depends(auth_service.verify_access_token)):
    if token_data:
        return {"isAuthenticated": True}
    else:
        return {"isAuthenticated": False}

@router.get("/api/auth/token-refresh")
def token_refresh( token_data: str = Depends(auth_service.verify_refresh_token)):
    if not token_data:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid refresh token")
    
    new_access_token = auth_service.create_access_token(data={"sub": token_data["sub"]})

    return {"access_token": new_access_token, "token_type": "bearer"}


@router.post("/api/auth/google")
def google_auth( token_data: str = Depends(auth_service.verify_oauth_access_token), response: Response = None, user_service: UserService = Depends()):

    try:
        curUser = user_service.get_user_by_email(email= token_data.email)

        if not curUser:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
            
        access_token = auth_service.create_access_token(data={"sub": curUser.email})
        refresh_token = auth_service.create_refresh_token(data={"sub": curUser.email})

        response.set_cookie(
            key="refresh_token",
            value=refresh_token,
            httponly=True,
            # secure=True,
            samesite="Strict",  # Prevent CSRF
        )

        return {"access_token": access_token, "token_type": "bearer"}
    
    except ValueError as e:
        raise HTTPException( status_code=401, detail="Invalid token") from e

@router.post("/api/auth/create")
def google_auth_create(authorization: str = Header(), user_service: UserService = Depends()):

    if not authorization or not authorization.startswith("Bearer "):
        return JSONResponse(
            {"detail": "Unauthorized - Missing or invalid token"},
            status_code=status.HTTP_401_UNAUTHORIZED,
        )
    
    access_token = authorization.split(" ")[1]

    token_data = auth_service.get_oauth_token_user_data(access_token)
    db_user = user_service.get_user_by_email(email=token_data.email)

    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    return user_service.create(token_data)