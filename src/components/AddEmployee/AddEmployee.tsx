import './AddEmployee.css'
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from "yup";
import employeeStore from '../../store/employee';

const validationSchema = Yup.object().shape({
    Name: Yup.string()
      .required('Employee name is required'),
    Age: Yup.number()
      .label("Employee age")
      .min(18)
      .max(100)
      .required('Employee age cannot be empty'),
      Job: Yup.object().shape({
        Title: Yup.string()
        .label("Job title")
        .min(5, 'Must be longer than 5 characters')
        .max(25, 'Must be less than 25 characters')
        .required('Emplployee title is required'),

        Location: Yup.string()
        .label("Working location")
        .min(3, 'Must be longer than 3 characters')
        .max(15, 'Must be less than 15 characters')
        .required('Employee location is required')
      }),
      Profile: Yup.object().shape({
          URL:Yup.string()
          .label("Profile picture URL")
          .url("Enter a valid URL")
          .required("Profile picture URL is required")

      })

   
  });

export const AddEmployee = () => {
  const {values,errors,handleSubmit,handleChange} = useFormik({
    initialValues: {
      Name: '',
      Age:18,
      Job:{
        Title:'',
        Location:''
        },
      Profile:{
          URL:''
        }
    },
    validationSchema
    ,
    onSubmit: values => {

      fetch("http://localhost:8000/employee",{method:'POST',headers: { 'Content-Type': 'application/json' },body:JSON.stringify(values)})
      .then((response : any)=>{
        console.log(response.body)
        employeeStore.addEmployee(values)
      })
    },
  });
  return (
  <div className="add-employee-container">
    <h3>Add New Employee</h3>
    <form onSubmit={handleSubmit}>
     
     <label>{errors.Name ? errors.Name : 'Name'}</label>
      <input
        name="Name"
        onChange={handleChange}
        value={values.Name}
      />

    <label>{errors.Age ? errors.Age : 'Age: '}</label>
    <input
        name="Age"
        onChange={handleChange}
        value={values.Age}
      />   
       
       <label>{errors.Job?.Title? errors.Job.Title : 'Title: '}</label>
        <input
        name="Job.Title"
        onChange={handleChange}
        value={values.Job.Title} 
        />   

        <label>{errors.Job?.Location? errors.Job.Location : 'Location: '}</label>
        <input
        name="Job.Location"
        onChange={handleChange}
        value={values.Job.Location} 
         />  

        <label>{errors.Profile?.URL? errors.Profile.URL : 'Profile picture URL: '}</label>
        <input
        name="Profile.URL"
        onChange={handleChange}
        value={values.Profile.URL} 
         />  

      <button type="submit">Submit</button>
    </form>
    </div>
  );
};