from app.database.database import Base
from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship

class CarModel(Base):
    __table_args__ = {'extend_existing': True}
    __tablename__ = 'cars'
    id = Column(Integer, primary_key=True, autoincrement=True)
    model = Column(String(50), nullable=True)
    color = Column(String(50), nullable=True)
    year = Column(Integer, nullable=True)
    price = Column(Float, nullable=True)
    # name = Column(String(80), nullable=True, unique=True)
    count = Column(Integer, nullable=True)
    body_type_id = Column(Integer, ForeignKey('body_types.id'), nullable=False)
    engine_type_id = Column(Integer, ForeignKey('engine_types.id'), nullable=False)
    #status_id = Column(Integer, ForeignKey('status_types.id'), nullable=False)
    body_type = relationship("BodyTypeModel", back_populates="car")
    engine_type = relationship("EngineTypeModel", back_populates="car")

    def to_dict(self):
        return {
            "id": self.id,
            "model": self.model,
            "color": self.color,
            "count": self.count,
            "price": self.price,
            "year": self.year,
            "body_type": self.body_type.get_type_name(),
            "engine_type": self.engine_type.get_type_name()
        } 