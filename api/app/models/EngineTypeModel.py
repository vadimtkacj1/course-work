from app.database.database import Base
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

class EngineTypeModel(Base):
    __table_args__ = {'extend_existing': True}
    __tablename__ = 'engine_types'
    id = Column(Integer, primary_key=True, autoincrement=True)
    type_name = Column(String(50), nullable=True, unique=True)
    car = relationship("CarModel", back_populates="engine_type")

    def get_type_name(self):
        return self.type_name

    def to_dict(self):
        return {
            "id": self.id,
            "type_name": self.type_name
        }