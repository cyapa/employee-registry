import {Subject} from 'rxjs'
import { IEmployee } from '../interfaces/Employee/IEmployee';



async function fetchEmployees(request:RequestInfo) :Promise<any>
{
 const response = await fetch(request); 
 return await response.json();

} 

const employeePromise = fetchEmployees("http://localhost:8000/employees");

let initialState = {
    data:[{Name:'StoreDefault',Age:0,Job:{Title:'',Location:''},Profile:{URL:''}}]
};



let state = initialState;


const subject = new Subject();

const employeeStore = {
    init: async ()=> {
       await employeePromise.then((res)=>{
            initialState.data= res;  
        })
         state = {...initialState}
        subject.next(state)
        console.log("calling init")
    },
    subscribe: (setState:any)=> subject.subscribe(setState),

    addEmployee: (message:IEmployee)=>{
        state ={
            ...state,
            data:[...state.data,message]
        };
        subject.next(state);
    },
    initialState
};

export default employeeStore;