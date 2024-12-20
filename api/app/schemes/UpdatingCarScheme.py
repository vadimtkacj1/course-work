from pydantic import BaseModel
from typing import Optional

class UpdatingCarScheme(BaseModel):
    model: Optional[str] = None
    color: Optional[str] = None
    year: Optional[int] = None
    price: Optional[float] = None
    count: Optional[int] = None
    body_type_id: Optional[int] = None
    engine_type_id: Optional[int] = None
    

    