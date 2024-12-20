from pydantic import BaseModel

class EngineTypeScheme(BaseModel):
    type_name: str
    