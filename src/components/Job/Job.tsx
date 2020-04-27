import React from 'react';
import './Job.css';
import {IJob} from '../../interfaces/Employee/IJob'
import job from './images/job.png'

export const Job=(props:IJob)=> {
  return (
    <div className="job-container">
        <div className="job-pic-container">
          <img src={job} alt="Avatar"/>
        </div>
        <h2>{props.Title}</h2>
        <h2>{props.Location}</h2>
    </div>
  );
}
