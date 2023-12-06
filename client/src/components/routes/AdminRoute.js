import React, { useEffect, useState } from 'react'
import {Route, Routes, Navigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
// import { History } from '../../pages/user/History';
import { LoadingToRedirect } from './LoadingToRedirect';
import { currentAdmin } from '../../functions/auth';

export const AdminRoute = ({ children}) => {
  const {user} = useSelector((state) => ({...state}))
  const [ok, setOk] = useState(false)
  useEffect(()=>{
    if(user && user.token){
        currentAdmin(user.token)
        .then((res) =>{
            console.log('Current admin res', res)
            setOk(true)
        })
        .catch((err) =>{
            console.log("Admin route error", err.message)
            setOk(false)
        })
    }
  },[user])

  // return user && user.token ? (<Navigate to={'/user/history'}/>) : (<LoadingToRedirect/>);
  if(ok){
    // return <Navigate to="/user/history" replace/>
    return children
  } else{
    return (<LoadingToRedirect/>);
  }
  
}

