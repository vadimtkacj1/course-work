from pydantic import BaseModel

class CarScheme(BaseModel):
    model: str
    color: str
    year: int
    price: float
    count: int
    body_type_id: int
    engine_type_id: int
    