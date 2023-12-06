import React, {useEffect, useState} from 'react'
import { AdminNav } from '../../../../components/nav/AdminNav'
import { ToastContainer, toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { getCategories } from '../../../../functions/category'
import { createSub, getSub, removeSub, updateSub } from '../../../../functions/sub'
import { Button } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { CategoryForm } from '../../../../components/forms/CategoryForm'
import { LocalSearch } from '../../../../components/forms/LocalSearch'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'


export const SubUpdate = () => {
    const { user } = useSelector((state) => ({...state}))
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState("")
    const [subs, setSubs] = useState([])
    const [subsCopy, setSubsCopy] = useState([])
    const [copyCategories, setCopyCategories] = useState([])
    const [parent, setParent] = useState('')

    const navigate = useNavigate()

    useEffect(()=>{
        loadCategories()
        loadSub()
    }, [])

    let {slug} = useParams()

    const loadSub = () =>{
        getSub(slug)
        .then((s) =>{
            console.log(s.data);
            setName(s.data.name)
            setParent(s.data.parent)
        })
        .catch((err) =>{
            console.log(err.message)
        })
    }

    const loadCategories = () =>{
        getCategories()
        .then((res) =>{
            console.log(res.data);
            setCategories(res.data)
            setCopyCategories(res.data)
        })
        .catch((err) =>{
            console.log(err.message)
        })
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        setLoading(true);
        updateSub(slug, {name , parent}, user.token)
        .then((res)=>{
            console.log(res)
            setLoading(false);
            setName('')
            toast.success(`"${res.data.name}" is created`)
            navigate('/admin/sub')
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
                {loading?<h4 className='text-danger' >Loading...</h4>:<h4>Update Sub Category</h4>}
                <div className='form-group' >
                    <label>Parent Category</label>
                    <select name='category' className="form-control" onChange={(e) => setParent(e.target.value)} >
                    <option>Please Select</option>
                        {
                            
                            categories.length>0 && categories.map((c) =>(<option key={c._id} value={c._id} selected={c._id===parent} >{c.name}</option>))
                        }
                    </select>
                </div>
                {
                    JSON.stringify(category)
                }
                <CategoryForm name={name} setName={setName} handleSubmit={handleSubmit}/>
                
                
            </div>
        </div>
    </div>
    <ToastContainer/>
    </>
  )
}
