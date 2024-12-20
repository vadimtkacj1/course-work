from fastapi import APIRouter
from app.database.database import Base, engine, session
from app.schemes.StatusScheme import StatusScheme
from app.models.StatusModel import StatusModel
from fastapi.responses import JSONResponse
import json

status_router = APIRouter(
    prefix="/status",
    tags=["status"],
)

Base.metadata.create_all(bind=engine)

@status_router.post("/")
async def post_status(status: StatusScheme):
    try:
        does_exist_status = bool(session.query(StatusModel).filter(StatusModel.name == status.name).first())

        if does_exist_status:
            return JSONResponse({"message": "There is a such body type yet"}, status_code=409)

        status_record = StatusModel(type_name=status.name)
        session.add(status_record)
        session.commit()

        return JSONResponse({"message": "Saved successfully"}, status_code=200)
    except:
        pass

@status_router.get("/")
async def get_status():
    try:
        status_records = session.query(StatusModel).all()
        status = []

        for status_record in status_records:
            status.append(status_record.to_dict())

        return JSONResponse({"message": "Got successfully", "data": json.dumps(status)}, status_code=200)
    except Exception as e:
        session.rollback()
    finally:
        session.close()

@status_router.patch("/")
async def patch_status():
    try:
        pass
    except:
        pass

@status_router.delete("/{status_id}")
async def delete_status(status_id: int):
    try:
        status_record = session.query(StatusModel).filter_by(id=status_id).first()
        
        if not status_record:
            return JSONResponse({"message": "There is not such an status"}, status_code=409)
        
        session.delete(status_record) 
        session.commit() 
        return JSONResponse({"message": "The account deleted successfully"}, status_code=200)
    except:
        session.rollback()
    finally:
        session.close()