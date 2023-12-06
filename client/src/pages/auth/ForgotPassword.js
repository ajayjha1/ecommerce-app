import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Header } from '../../components/nav/Header'
import { Button }  from 'react-bootstrap'
import { auth, GoogleAuthProvider } from "../../firebaseFile";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export const ForgotPassword = ({history}) =>{
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { user } = useSelector((state) =>({...state}))

    useEffect(() =>{
        if(user && user.token){
            navigate('/')
        }
    }, [user]);

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setLoading(true);

        const config= {
            url : process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
            handleCodeInApp: true,
        };

        await auth.sendPasswordResetEmail(email, config)
        .then(() =>{
            setEmail('')
            setLoading(false)
            toast.success('Password is changed')
        })
        .catch((err) =>{
            setLoading(false)
            toast.error(err.message)
            console.log(err.message);
        })
      }
      return(
        <>
            <div className="container col-md-6 offset-md-3 p-5" >
                <h4>Forgot Password</h4>
                <form onSubmit={handleSubmit}>
                    <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Type your email" />
                    <Button className="mt-2" disabled={!email}>Submit</Button>
                </form>
            </div>
            
    </>
      )

}

