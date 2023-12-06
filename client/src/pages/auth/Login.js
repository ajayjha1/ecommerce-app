import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Header } from '../../components/nav/Header'
import { Button }  from 'react-bootstrap'
import { auth, GoogleAuthProvider } from "../../firebaseFile";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ForgotPassword } from "./ForgotPassword";
import axios from "axios";
import {useLocation} from 'react-router-dom'

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

export const Login = () => {

  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const location = useLocation();
  // const history = useHistory()
  const { user } = useSelector((state) => ({...state}))

  const roleBasedRedirect = (res) =>{
    let intended = location.state;
    if(intended){
      navigate(-1)
    } else{
      if(res.data.role ==="admin"){
        navigate("/admin/dashboard");
      } else{
        navigate("/user/history");
      }
    }
  
  }

  
  useEffect(() =>{
    let intended = location.state?.from;
    console.log(location.state)
    if(intended){
      return;
    } else{
      if(user && user.token) navigate('/')
    }
  }, [location.state , user])
  // useEffect(() =>{
  //   if(user && user.token){
  //       navigate('/')
  //   }
  // }, [user]);
  
 
  const handleSubmit = async (e) => {
  //  e.preventDefault()
   setLoading(true)
   try{
    const result = await auth.signInWithEmailAndPassword(email, password)
    console.log(result);
    const {user} = result
    const idTokenResult = await user.getIdTokenResult()

    createOrUpdateUser(idTokenResult.token)
    .then((res) =>{
      dispatch({
        type: "LOGGED_IN_USER",
        payload:{
          name: res.data.name,
          email: res.data.email,
          token: idTokenResult.token,
          role: res.data.role,
          _id: res.data._id
        }
      });
      roleBasedRedirect(res)
    })
    .catch((err) =>{
      console.log(err.message);
      toast.error(err.message);
    })
    navigate('/');
   } catch (error){
    console.log(error)
    toast.error(error.message)
    setLoading(false)
   }
  };

  const googleLogin = async () =>{
    auth.signInWithPopup(GoogleAuthProvider)
    .then( async (res)=>{
      const {user} = res;
      const idTokenResult = await user.getIdTokenResult();
      createOrUpdateUser(idTokenResult.token)
      .then((res) =>{
        dispatch({
          type: "LOGGED_IN_USER",
          payload:{
            name: res.data.name,
            email: res.data.email,
            token: idTokenResult.token,
            role: res.data.role,
            _id: res.data._id
          }
        });
        roleBasedRedirect(res)
      })
      .catch((err) =>{
        console.log(err.message)
      })
      navigate('/')
    })
    .catch((err) =>{
      console.log(err.message);
      toast.error(err.message);
    })
  }


  const loginForm = () => 
  <form onSubmit={handleSubmit}>
    <input type='email' placeholder="Your Email" className='form-control' onChange={(e) => setEmail(e.target.value)}/>
    <input type='password' placeholder="Your Password" className='form-control mt-1' onChange={(e) => setPassword(e.target.value)}/>
    <Button variant="primary" disabled={!email || password.length<6} size="lg"  onClick={()=>handleSubmit()} className='mt-3 pl-5 pr-5'>Login with Email and Password</Button>
  </form>

  return (
    <>
    <div className='container p-5' >
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
         {loading? (<h4 style={{color: 'red' }} >Loading...</h4>): (<h4>Login</h4>) } 
          {loginForm()}
          <Button variant="danger" size="lg"  onClick={()=>googleLogin()} className='mt-2 pl-7 pr-7'>Login with Google</Button>
          <Link to="/forgot/password" className="float-right text-danger">Forgot Password</Link>
          <ToastContainer/>
        </div>
      </div>
    </div>
    </>
  )
}
