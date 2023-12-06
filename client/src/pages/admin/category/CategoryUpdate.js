import React, {useEffect, useState} from 'react'
import { AdminNav } from '../../../components/nav/AdminNav'
import {ToastContainer, toast} from 'react-toastify'
import { useSelector } from 'react-redux'
import { getCategory, updateCategory } from '../../../functions/category'
import { Button } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { CategoryForm } from '../../../components/forms/CategoryForm'

export const CategoryUpdate = () => {
    const { user } = useSelector((state) => ({...state}))
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false)
    // const [categories, setCategories] = useState([])
    const navigate = useNavigate();

    let {slug} = useParams()

    useEffect(()=>{
        loadCategory()
    }, [])

    const loadCategory = () =>{
        getCategory(slug)
        .then((res) =>{
            console.log(res.data);
            // setCategories(res.data)
            setName(res.data.name)
        })
        .catch((err) =>{
            console.log(err.message)
        })
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        setLoading(true);
        updateCategory(slug, {name}, user.token)
        .then((res)=>{
            console.log(res)
            setLoading(false);
            setName('')
            toast.success(`"${res.data.name}" is created`)
            navigate('/admin/category')
        })
        .catch((err) =>{
            setLoading(false);
            console.log(err)
            toast.error(err.message)
        })
    }
    

    
  return (
    <>
    <div className='container-fluid' >
        <div className='row' >
            <div className='col-md-2' ><AdminNav/></div>
            <div className='col'>
                {loading?<h4 className='text-danger' >Loading...</h4>:<h4>Update Category</h4>}
                <CategoryForm name={name} setName={setName} handleSubmit={handleSubmit} />
                {/* {
                    categories.map((c)=>(
                        <div className='alert alert-secondary' key={c._id} >
                            {c.name} &nbsp;
                            <span onClick={() => handleRemove(c.slug)} className='float-right btn btn-sm text-danger'>Delete</span> 
                            <Link className='float-right btn btn-sm ' to={`/admin/category/${c.slug}`} >Edit</Link>&nbsp;
                        </div>
                    )
                    )
                } */}
            </div>
        </div>
    </div>
    <ToastContainer/>
    </>
  )
}
