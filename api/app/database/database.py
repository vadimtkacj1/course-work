from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from fastapi import Depends
from typing import Annotated
from sqlalchemy.orm import Session

URL_DATABASE = "mysql+pymysql://root:12345678@localhost:3306/course_work"

engine = create_engine(URL_DATABASE)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

session = SessionLocal()
Base = declarative_base()

class Database():
    @staticmethod
    def get():
        session = SessionLocal()

        try:
            yield session
        finally:
            session.close()



