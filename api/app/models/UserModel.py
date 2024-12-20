from sqlalchemy import Column, Integer, String
from app.database.database import Base

class UserModel(Base):
    __table_args__ = {'extend_existing': True}
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(50), unique=True, nullable=False)
    hashed_password = Column(String(255))