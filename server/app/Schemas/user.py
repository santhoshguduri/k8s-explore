from pydantic import BaseModel, EmailStr, computed_field, UUID4
from datetime import datetime

class Signup(BaseModel):
    firstName: str
    lastName: str
    email: EmailStr
    # password: str

class OAuthSignup(BaseModel):
    firstName: str
    lastName: str
    email: EmailStr
    
class Login(BaseModel):
    username: EmailStr
    password: str

class DisplayUser(BaseModel):
    firstname: str
    lastname: str
    email:EmailStr
    id: UUID4
    is_card_verified: bool

    # @computed_field
    # @property
    # def fullName(self) -> str:
    #     return f"{self.firstname} {self.lastname}"
    
    class Config():
        orm_mode = True

class CardRequest(BaseModel):
    paymentMethodId: str
    email: EmailStr