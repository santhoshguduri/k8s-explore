from sqlalchemy import Column, Integer, String, func, DateTime, ForeignKey, Boolean
from sqlalchemy.dialects.postgresql import UUID
# from sqlalchemy.sql import func
from sqlalchemy.orm import relationship, mapped_column
from app.DataStore.database import Base
import uuid

class User(Base):
    __tablename__ = 'users'

    id = Column(UUID(as_uuid=True), primary_key=True, default=lambda: str(uuid.uuid4()), unique=True, index=True)
    uuid = Column(String, unique=True, index= True)
    firstname = Column(String)
    lastname = Column(String)
    email = Column(String, unique=True, index=True)
    # password = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    is_card_verified = Column(Boolean, default=False)
    tokens = relationship("UserToken", back_populates="user")

    # def get_context_string(self, context: str):
    #     return f"{context}{self.password[-6:]}{self.updated_at.strftime('%m%d%Y%H%M%S')}".strip()
    
    

class UserToken(Base):
    __tablename__ = "user_tokens"
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = mapped_column(ForeignKey('users.id'))
    access_key = Column(String(250), nullable=True, index=True, default=None)
    refresh_key = Column(String(250), nullable=True, index=True, default=None)
    created_at = Column(DateTime, nullable=False, server_default=func.now())
    expires_at = Column(DateTime, nullable=False)
    
    user = relationship("User", back_populates="tokens")


class CreditCard(Base):
    __tablename__ = 'credit_cards'

    id = Column(UUID(as_uuid=True), primary_key=True, default=lambda: str(uuid.uuid4()), unique=True, index=True)
    user_id = mapped_column( ForeignKey('users.id'))
    brand = Column(String(50), nullable=False)  
    last4 = Column(String(4), nullable=False)  
    exp_month = Column(Integer, nullable=False)
    exp_year = Column(Integer, nullable=False)
    customer_id = Column(String(255), nullable=False) 
    created_at = Column(DateTime(timezone=True), server_default=func.now()) 