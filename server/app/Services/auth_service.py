from datetime import datetime, timedelta
from jose import JWTError, jwt 
from app.Schemas import token as tokenSchema
from fastapi import Depends, HTTPException, status, Cookie, Header
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordBearer
from google.oauth2 import id_token
# from jwt.exceptions import InvalidTokenError
from google.auth.transport import requests
from typing import Optional

GOOGLE_CLIENT_ID = "520425927005-qorg9ek2lb9h80dcdnntqvdtjsn39kjm.apps.googleusercontent.com"

SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 5
REFRESH_TOKEN_EXPIRE_DAYS = 3

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

def create_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def create_access_token(data: dict):
    return create_token(data, expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))

def create_refresh_token(data: dict):
    return create_token(data, expires_delta=timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS))

def get_refresh_token_from_cookie(refresh_token: str = Cookie(default=None)):
    if not refresh_token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Refresh token not found")
    return refresh_token

def verify_refresh_token( refresh_token: str = Cookie(default=None)):
    if not refresh_token:
        raise HTTPException(status_code=401, detail="Refresh token missing")
    try:
        return jwt.decode(refresh_token, SECRET_KEY, algorithms=[ALGORITHM])
    except JWTError:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Token is invalid or expired")
    

def verify_access_token(authorization: str = Header()):

    if not authorization or not authorization.startswith("Bearer "):
        return JSONResponse(
            {"detail": "Unauthorized - Missing or invalid token"},
            status_code=status.HTTP_401_UNAUTHORIZED,
        )
    
    access_token = authorization.split(" ")[1]
    try:
        payload = jwt.decode(access_token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")

        if email is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not validate credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )
        return tokenSchema.TokenData(email=email)
    except JWTError:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Token is invalid or expired")
    
def verify_oauth_access_token(authorization: str = Header()):

    if not authorization or not authorization.startswith("Bearer "):
        return JSONResponse(
            {"detail": "Unauthorized - Missing or invalid token"},
            status_code=status.HTTP_401_UNAUTHORIZED,
        )
    
    access_token = authorization.split(" ")[1]
    print(type(access_token))
    try:
        idinfo = get_oauth_token_user_data(access_token)
        email = idinfo.email

        if email is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not validate credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )
        return tokenSchema.TokenData(email=email)
    except JWTError:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Token is invalid or expired")
    
def get_oauth_token_user_data(token: str ):
    idinfo = id_token.verify_oauth2_token(token, requests.Request(), GOOGLE_CLIENT_ID)

    token_user = tokenSchema.AuthTokenInfo(
        google_id = idinfo.get("sub"),
        email = idinfo.get("email"),
        firstname = idinfo.get("given_name"),
        lastname = idinfo.get("family_name"),
        # photo_url = idinfo.get('picture')
    )

    print(type(token_user))

    return token_user
