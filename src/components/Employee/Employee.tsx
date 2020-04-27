import React from 'react';
import './Employee.css';
import {Job} from "../Job"
import {ProfilePicture} from "../ProfilePicture"
import {IEmployee} from "../../interfaces/Employee/IEmployee"

export const Employee =(props:IEmployee)=> {
  return (
    <div className="employee-container">
        <h2>Mr. {props.Name}</h2>
        <h2>{props.Age} years old</h2>
        <ProfilePicture URL={props.Profile.URL}/>
        <Job Title={props.Job.Title} Location={props.Job.Location}></Job>
    </div>
  );
}


