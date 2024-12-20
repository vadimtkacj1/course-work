from fastapi import APIRouter
from app.database.database import Base, engine, session
from app.schemes.BodyTypeScheme import BodyTypeScheme
from app.models.CarModel import CarModel
from app.models.BodyTypeModel import BodyTypeModel
from fastapi.responses import JSONResponse
import json

body_types_router = APIRouter(
    prefix="/body_types",
    tags=["body_types"],
)

Base.metadata.create_all(bind=engine)

@body_types_router.post("/")
async def post_body_types(body_type: BodyTypeScheme):
    try:
        is_there_body_type = bool(session.query(BodyTypeModel).filter(BodyTypeModel.type_name == body_type.type_name).first())

        if is_there_body_type:
            return JSONResponse({"message": "There is a such body type yet"}, status_code=409)

        body_type_record = BodyTypeModel(type_name=body_type.type_name)
        session.add(body_type_record)
        session.commit()
        
        return JSONResponse({"message": "Saved successfully"}, status_code=200)
    except Exception as e:
        print(e)
        session.rollback()
    finally:
        session.close()

@body_types_router.get("/")
async def get_body_types():
    try:
        body_types_records = session.query(BodyTypeModel).all()
        body_types = []

        for body_types_record in body_types_records:
            body_types.append(body_types_record.to_dict())

        return JSONResponse({"message": "Got successfully", "data": json.dumps(body_types)}, status_code=200)
    except Exception as e:
        print(e)
        session.rollback()
    finally:
        session.close()

@body_types_router.patch("/")
async def patch_body_types():
    try:
        pass
    except:
        pass

@body_types_router.delete("/{body_type_id}")
async def delete_body_types(body_type_id: int):
    try:
        body_type_record = session.query(BodyTypeModel).filter_by(id=body_type_id).first()
        
        if not body_type_record:
            return JSONResponse({"message": "There is not such an body type"}, status_code=409)
        
        session.delete(body_type_record) 
        session.commit() 
        return JSONResponse({"message": "The account deleted successfully"}, status_code=200)
    except:
        session.rollback()
    finally:
        session.close()