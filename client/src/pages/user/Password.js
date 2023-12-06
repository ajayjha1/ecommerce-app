import React, { useState } from 'react'
import { UserNav } from '../../components/nav/UserNav'
import { auth } from '../../firebaseFile'
import { ToastContainer,toast } from 'react-toastify'

export const Password = () => {
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) =>{
        e.preventDefault()
        setLoading(true)
        await auth.currentUser.updatePassword(password)
        .then(()=>{
            setLoading(false)
            setPassword("")
            toast.success('Password Updated')
        })
        .catch((err)=>{
            setLoading(false)
            console.log(err)
            toast.error(err.message)
        })
    }

    const passwordUpdateForm = () =>{
        return(
       <div className='form-group '>
        <label>Your Password</label>
        <input 
            type='password' 
            onChange={(e) =>setPassword(e.target.value)} 
            className='form-control'
            placeholder='Enter new password'
            disabled={loading}
            defaultValue={password}
        />
        <button onClick={handleSubmit} className='btn btn-primary mt-2' disabled={!password || password.length < 6 || loading} >Submit</button>
       </div>
       )
    }
  return (
<div className='container-fluid' >
    <div className='col-md-2' ><UserNav/></div>
    <div className='p-5 col-md-6 offset-md-3' >
        <div className='row' >
           {loading?<h4 className='text-danger'>Loading</h4> : <h4 className='col'>Password Update</h4>}
            {passwordUpdateForm()}
        </div>
        <ToastContainer/>
    </div>
    </div>
  )
}
