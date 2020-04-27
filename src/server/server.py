from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from  bson.json_util import dumps,loads
from typing import Optional
import bson
import json

app = FastAPI()


origins = [
   "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


db_client = MongoClient("mongodb+srv://cyapa:spain1234@cluster0-dil1m.mongodb.net/test?retryWrites=true&w=majority")
db = db_client.get_database("cpm")
employees = db.employee



@app.get("/")
def read_root():
    return {"This is the API home"}


@app.get("/employeeCount")
def read_employee_count():
    return employees.count_documents({})


@app.get("/employees")
def read_employees():
    query_result = employees.find({},{'_id': False})
    bjson_res = dumps(query_result)
    json_res = json.loads(bjson_res)
    return json_res


class EmployeeJob(BaseModel):
    Title:str
    Location:str


class EmployeeProfile(BaseModel):
    URL:str

class Employee(BaseModel):
    Name:str
    Age:int
    Job:Optional[EmployeeJob]
    Profile: Optional[EmployeeProfile]


@app.post("/employee/")
async def create_employee(employee:Employee):
    employee_json = employee.json()
    employee_bson = loads(employee_json)
    employees.insert_one(employee_bson)
    return employee_json
    


