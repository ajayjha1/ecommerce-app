import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Header } from '../../components/nav/Header'
import { Button }  from 'react-bootstrap'
import { auth } from "../../firebaseFile";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const createOrUpdateUser = async (authtoken) =>{
  console.log(process.env.REACT_APP_API)
  return await axios.post(
    `${process.env.REACT_APP_API}/create-or-update-user`, 
    {}, 
    {
      headers: {
        authtoken: authtoken,
    }
  })
}

export const RegisterComplete = () => {

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState('')
  const navigate = useNavigate();
  const dispatch = useDispatch()

  useEffect(()=>{
    setEmail(window.localStorage.getItem("emailForRegistration"))
    // navigate('/register/complete')
  },[])
  const { user } = useSelector((state) => ({...state}))


  const handleSubmit = async (e) => {
    e.preventDefault();
    // validation
    if(!email || ! password){
        toast.error('email and password is required')
        return;
    }
    if(password.length < 6){
        toast.error('Password must be atleast 6 characters long');
        return;
    }
    console.log(email)
    console.log(window.location.href)
    try{
        const result = await auth.signInWithEmailLink(email, window.location.href);
        console.log(result.user.emailVerified)
        if(result.user.emailVerified){
            // remove user email from local storage
            window.localStorage.removeItem('emailForRegistration')
            // get user id token
            let user = auth.currentUser
            await user.updatePassword(password)
            const idTokenResult = await user.getIdTokenResult()
            // redux store
            console.log("user", user, "idTokenRsult", idTokenResult);
            // redirect
            // history.push("/")
            createOrUpdateUser(idTokenResult.token)
            .then((res) =>{
              dispatch({
                type: "LOGGED_IN_USER",
                payload:{
                  name: res.data?.name,
                  email: res.data.email,
                  token: idTokenResult.token,
                  role: res.data.role,
                  _id: res.data._id
                }
              });
              navigate('/')
              toast.success('Registration Completed')
            })
            .catch((err) =>{
              console.log(err.message);
              toast.error(err.message);
            })
        }
    } catch (error) {
        console.log(error)
        toast.error(error.message)
    }
  }


//   const handleSubmit = async (e) => {
//    e.preventDefault()
//    console.log('env---', process.env.REACT_APP_REGISTER_REDIRECT_URL)
//    const config = {
//     url: process.env.REACT_APP_REGISTER_REDIRECT_URL,   //'http://localhost:3000/register/complete',
//     handleCodeInApp: true,
//    }

//    await auth.sendSignInLinkToEmail(email, config)
//    toast.success(
//     `Email is sent to the ${email}. Please verify your email`
//    );
//    //save user email in local storage
//    setEmail(window.localStorage.setItem('emailForRegistration', email))
//    console.log(window.localStorage.setItem('emailForRegistration', email))
//    //clear state
//    setEmail("");
//   };


  const completeRegistrationForm = () => <form onSubmit={handleSubmit}>
    <input type='email' className='form-control' value={email} disabled/>
    <input type={'password'} className='form-control' value={password} onChange={(e) =>setPassword(e.target.value)} placeholder='password' autoFocus/>
    <Button onClick={handleSubmit} className='mt-2'>Complete Registration</Button>
  </form>

  return (
    <>
    <div className='container p-5' >
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          <h4>Complete Registration</h4>
          {completeRegistrationForm()}
          <ToastContainer/>
        </div>
      </div>
    </div>
    </>
  )
}
