import React from 'react';
import './ProfilePicture.css';
import { IProfile } from '../../interfaces/Employee/IProfile';

export const ProfilePicture=(props:IProfile)=> {
  return (
    <div className="profile-pic-container">
    <img src={props.URL} alt="Avatar"/>
  </div>
  );
}
