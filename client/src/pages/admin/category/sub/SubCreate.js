import React, {useEffect, useState} from 'react'
import { AdminNav } from '../../../../components/nav/AdminNav'
import { ToastContainer, toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { getCategories } from '../../../../functions/category'
import { createSub, getSubs, removeSub } from '../../../../functions/sub'
import { Button } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { CategoryForm } from '../../../../components/forms/CategoryForm'
import { LocalSearch } from '../../../../components/forms/LocalSearch'

export const SubCreate = () => {
    const { user } = useSelector((state) => ({...state}))
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState("")
    const [subs, setSubs] = useState([])
    const [subsCopy, setSubsCopy] = useState([])
    const [copyCategories, setCopyCategories] = useState([])
    const [keyword, setKeyword] = useState("")

    useEffect(()=>{
        loadCategories()
        loadSubs()
    }, [])

    const loadSubs = () =>{
        getSubs()
        .then((res) =>{
            console.log(res.data);
            setSubs(res.data)
            setSubsCopy(res.data)
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
        createSub({name , parent: category}, user.token, )
        .then((res)=>{
            console.log(res)
            setLoading(false);
            setName('')
            toast.success(`"${res.data.name}" is created`)
            loadSubs()
        })
        .catch((err) =>{
            setLoading(false);
            console.log(err)
            toast.error(err.message)
        })
    }

    const handleRemove = async (slug) =>{
        // let answer = window.confirm("Delete?")
        // console.log(answer, slug)
        if(window.confirm("Delete?")){
            setLoading(true)
            removeSub(slug, user.token)
            .then((res) =>{
                setLoading(false)
                console.log("Deleted Successfully")
                toast.success(`${res.data.name} Deleted successfully`)
                loadSubs()
            })
            .catch((err) =>{
                setLoading(false)
                console.log(err.message)
                toast.error(err.message)
            })
        }
    }

    

  return (
    <>
    <div className='container-fluid' >
        <div className='row' >
            <div className='col-md-2' ><AdminNav/></div>
            <div className='col'>
                {loading?<h4 className='text-danger' >Loading...</h4>:<h4>Create Sub Category</h4>}
                <div className='form-group' >
                    <label>Parent Category</label>
                    <select name='category' className="form-control" onChange={(e) => setCategory(e.target.value)} >
                    <option>Please Select</option>
                        {
                            
                            categories.length>0 && categories.map((c) =>(<option key={c._id} value={c._id} >{c.name}</option>))
                        }
                    </select>
                </div>
                {
                    JSON.stringify(category)
                }
                <CategoryForm name={name} setName={setName} handleSubmit={handleSubmit}/>
                <LocalSearch 
                    keyword={keyword} 
                    setKeyword={setKeyword} 
                    categories={categories} 
                    setCategories={setCategories}
                    copyCategories={copyCategories}
                    setCopyCategories={setCopyCategories}
                />
                {
                    subsCopy.map((s)=>(
                        <div className='alert alert-secondary' key={s._id} >
                            {s.name} &nbsp;
                            <span 
                                onClick={() => handleRemove(s.slug)} 
                                className='float-right btn btn-sm text-danger'>
                                    Delete
                            </span> 
                            <Link 
                                className='float-right btn btn-sm ' 
                                to={`/admin/sub/${s.slug}`} >
                                    Edit
                            </Link>
                        </div>
                    )
                    )
                }
            </div>
        </div>
    </div>
    <ToastContainer/>
    </>
  )
}
