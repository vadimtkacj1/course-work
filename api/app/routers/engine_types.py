from fastapi import APIRouter
from app.database.database import Base, engine, session
from app.schemes.EngineTypeScheme import EngineTypeScheme
from app.models.EngineTypeModel import EngineTypeModel
from fastapi.responses import JSONResponse
import json

engine_types_router = APIRouter(
    prefix="/engine_types",
    tags=["engine_types"],
)

Base.metadata.create_all(bind=engine)

@engine_types_router.post("/")
async def post_engine_types(engine_type: EngineTypeScheme):
    try:
        is_there_engine_type = bool(session.query(EngineTypeModel).filter(EngineTypeModel.type_name == engine_type.type_name).first())

        if is_there_engine_type:
            return JSONResponse({"message": "There is a such body type yet"}, status_code=409)

        status_record = EngineTypeModel(type_name=engine_type.type_name)
        session.add(status_record)
        session.commit()

        return JSONResponse({"message": "Saved successfully"}, status_code=200)
    except:
        pass

@engine_types_router.get("/")
async def get_engine_types():
    try:
        engine_types_records = session.query(EngineTypeModel).all()
        engine_types = []

        for engine_types_record in engine_types_records:
            engine_types.append(engine_types_record.to_dict())

        return JSONResponse({"message": "Got successfully", "data": json.dumps(engine_types)}, status_code=200)
    except Exception as e:
        print(e)
        session.rollback()
    finally:
        session.close()

@engine_types_router.patch("/")
async def patch_engine_types():
    try:
        pass
    except:
        pass

@engine_types_router.delete("/{engine_type_id}")
async def delete_engine_types(engine_type_id: int):
    try:
        status_record = session.query(EngineTypeModel).filter_by(id=engine_type_id).first()
        
        if not status_record:
            return JSONResponse({"message": "There is not such an status"}, status_code=409)
        
        session.delete(status_record) 
        session.commit() 
        return JSONResponse({"message": "The account deleted successfully"}, status_code=200)
    except:
        session.rollback()
    finally:
        session.close()