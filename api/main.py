from fastapi import FastAPI, APIRouter
from starlette.middleware.cors import CORSMiddleware
from app.routers.cars import cars_router
from app.routers.body_types import body_types_router
from app.routers.engine_types import engine_types_router
from app.routers.auth import auth_router
from app.routers.status import status_router
from app.database.database import Base, engine, session
from app.models.BodyTypeModel import BodyTypeModel
from app.models.EngineTypeModel import EngineTypeModel 

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# body_type_record1 = BodyTypeModel(type_name="Sedan")
# body_type_record2 = BodyTypeModel(type_name="Hatchback")
# body_type_record3 = BodyTypeModel(type_name="Coupe")

# engine_type_record1 = EngineTypeModel(type_name="Gas engine")
# engine_type_record2 = EngineTypeModel(type_name="Fuel engine")
# engine_type_record3 = EngineTypeModel(type_name="Hybrid engine")

# session.add(body_type_record1)
# session.add(body_type_record2)
# session.add(body_type_record3)

# session.add(engine_type_record1)
# session.add(engine_type_record2)
# session.add(engine_type_record3)

# session.commit()

api_app = APIRouter()
api_app.include_router(cars_router)
api_app.include_router(auth_router)
api_app.include_router(body_types_router)
api_app.include_router(engine_types_router)
app.mount("/api", api_app)
