from fastapi import APIRouter
from app.database.database import Base, engine, session
from app.schemes.CarScheme import CarScheme
from app.schemes.UpdatingCarScheme import UpdatingCarScheme
from app.models.CarModel import CarModel
from app.models.BodyTypeModel import BodyTypeModel
from app.models.StatusModel import StatusModel
from app.models.EngineTypeModel import EngineTypeModel
from fastapi.responses import JSONResponse
import json

cars_router = APIRouter(
    prefix="/cars",
    tags=["cars"],
)

Base.metadata.create_all(bind=engine)

@cars_router.post("/")
async def post_cars(car: CarScheme):
    try:
        body_type_record = session.query(BodyTypeModel).filter_by(id=car.body_type_id).first()
        engine_type_record = session.query(EngineTypeModel).filter_by(id=car.engine_type_id).first()
        car_record = CarModel(model=car.model, color=car.color, year=car.year, price=car.price, count=car.count, body_type=body_type_record, engine_type=engine_type_record)
        session.add(car_record)
        session.commit()

        return JSONResponse({"message": "Saved successfully", "body": car_record.to_dict()}, status_code=200)
    except Exception as e:
        print(e)
        session.rollback()
    finally:
        session.close()

@cars_router.get("/")
async def get_cars():
    try:
        car_records = session.query(CarModel).all()
        cars = []

        for car_record in car_records:
            cars.append(car_record.to_dict())

        return JSONResponse({"message": "Got successfully", "data": json.dumps(cars)}, status_code=200)
    except Exception as e:
        print(e)
        session.rollback()
    finally:
        session.close()

@cars_router.patch("/{car_id}")
async def patch_cars(car_id: int, car: UpdatingCarScheme):
    try:
        is_there_car = bool(session.query(CarModel).filter(CarModel.id == car_id).first())

        if not is_there_car:
            return JSONResponse({"message": "There is not such a car"}, status_code=409)
        
        filtered_car = filter(lambda x: x[1] is not None, list(car)) 
        filtered_car = dict(filtered_car)

        car_record = session.query(CarModel).filter_by(id=car_id).update(filtered_car)
        
        session.commit()
        
        return JSONResponse({"message": f"Changed car with id {car_id} successfully"}, status_code=200)
        
    except Exception as e:
        print(e)
        session.rollback()
    finally:
        session.close()

@cars_router.delete("/{car_id}")
async def delete_cars(car_id: int):
    try:
        car_record = session.query(CarModel).filter_by(id=car_id).first()
        
        if not car_record:
            return JSONResponse({"message": "There is not such a car"}, status_code=409)
        
        session.delete(car_record) 
        session.commit() 
        return JSONResponse({"message": "The account deleted successfully"}, status_code=200)
    except:
        session.rollback()
    finally:
        session.close()