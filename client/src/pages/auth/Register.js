import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Header } from '../../components/nav/Header'
import { Button }  from 'react-bootstrap'
import { auth } from "../../firebaseFile";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";


export const Register = ({history}) => {

  const [email, setEmail] = React.useState("")

  const { user } = useSelector((state) =>({...state}))
  const navigate = useNavigate()

    useEffect(() =>{
        if(user && user.token){
            navigate('/')
        }
    }, [user, history]);


  const handleSubmit = async (e) => {
   e.preventDefault()
  //  console.log('env---', process.env.REACT_APP_REGISTER_REDIRECT_URL)
   const config = {
    url: process.env.REACT_APP_REGISTER_REDIRECT_URL,   //'http://localhost:3000/register/complete',
    handleCodeInApp: true,
   }

   await auth.sendSignInLinkToEmail(email, config)
   toast.success(
    `Email is sent to the ${email}. Please verify your email`
   );
  //  save user email in local storage
   window.localStorage.setItem('emailForRegistration', email)
   //clear state
   setEmail("");
  };


  const registerForm = () => <form onSubmit={handleSubmit}>
    <input type='email' className='form-control' onChange={(e) => setEmail(e.target.value)}/>
    <Button onClick={handleSubmit} className='mt-2'>Register</Button>
  </form>

  return (
    <>
    <div className='container p-5' >
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          <h4>Register</h4>
          {registerForm()}
          <ToastContainer/>
        </div>
      </div>
    </div>
    </>
  )
}
