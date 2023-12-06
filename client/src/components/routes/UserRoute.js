import React from 'react'
import {Route, Routes, Navigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
// import { History } from '../../pages/user/History';
import { LoadingToRedirect } from './LoadingToRedirect';

export const UserRoute = ({ children}) => {
  const {user} = useSelector(state => ({...state}))

  // return user && user.token ? (<Navigate to={'/user/history'}/>) : (<LoadingToRedirect/>);
  if(user && user.token){
    // return <Navigate to="/user/history" replace/>
    return children
  } else{
    return <LoadingToRedirect/>
  }
  
}

