from pydantic import BaseModel
from typing import List, Optional

class Token(BaseModel):
    access_token: str
    token_type: str

class AuthToken(BaseModel):
    token: str

class TokenData(BaseModel):
    email: Optional[str] = None

class AuthTokenInfo(BaseModel):
    email: str
    google_id: str
    firstname: str
    lastname: str