from pydantic import BaseModel

class BodyTypeScheme(BaseModel):
    type_name: str
    