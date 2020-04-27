import React, {useEffect,useState} from 'react';
import './App.css';
import "./components/Employee"
import { Employee } from './components/Employee';
// import {IEmployee} from "./interfaces/Employee/IEmployee";
import { AddEmployee } from './components/AddEmployee/AddEmployee';

import employeeStore from './store/employee'



 const App =() => {
   
  //const [data,setData] = useState<IEmployee[]>([{Name:'',Age:0,Job:{Title:'',Location:''},Profile:{URL:''}}]);

  const [employeeState,setEmployeeState] = useState(
    {
     data: [
      {
      Name:'AppDefault',Age:0,
      Job:{Title:'',Location:''},
      Profile:{URL:''}
      }
    ]
  }
  );

  useEffect(() => {
    employeeStore.init()  
  },[]);


  useEffect(() => {
    
    employeeStore.subscribe(setEmployeeState);
    console.log(employeeState.data)

  },[employeeState.data]);


 

  return (
    <div className="App">
      <h1>Employee Registry</h1>
      {
      employeeState.data.map((employee,i)=>(
          <Employee key={i} Name={employee.Name} Age={employee.Age} Job={employee.Job} Profile={employee.Profile}></Employee> 
        ))     
      }
      <div className="form-container">
        <AddEmployee></AddEmployee>
    

      </div>
    </div>
  );
}

export default App;