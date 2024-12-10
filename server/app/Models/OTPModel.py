from sqlalchemy import Column, String, Integer, DateTime
from app.DataStore.database import Base
from datetime import datetime, timedelta


class OTPModel(Base):
    __tablename__ = "otp_verifications"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, nullable=False, unique=True)
    otp = Column(String, nullable=False)
    expires_at = Column(DateTime, nullable=False, default=lambda: datetime.now() + timedelta(minutes=10))
