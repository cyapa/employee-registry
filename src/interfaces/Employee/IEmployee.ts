import {IJob} from './IJob'
import { IProfile } from './IProfile';

export interface IEmployee{
    Name:string,
    Age:number,
    Job:IJob,
    Profile:IProfile
  }