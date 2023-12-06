import React, {useEffect, useState} from 'react'
import { AdminNav } from '../../../components/nav/AdminNav'
import {ToastContainer, toast} from 'react-toastify'
import { useSelector } from 'react-redux'
import { createCategory, getCategories, removeCategory } from '../../../functions/category'
import { Button } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { CategoryForm } from '../../../components/forms/CategoryForm'
import { LocalSearch } from '../../../components/forms/LocalSearch'

export const CategoryCreate = () => {
    const { user } = useSelector((state) => ({...state}))
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState([])
    const [copyCategories, setCopyCategories] = useState([])
    const [keyword, setKeyword] = useState("")

    useEffect(()=>{
        loadCategories()
    }, [])

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
        createCategory({name}, user.token)
        .then((res)=>{
            console.log(res)
            setLoading(false);
            setName('')
            toast.success(`"${res.data.name}" is created`)
            loadCategories()
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
            removeCategory(slug, user.token)
            .then((res) =>{
                setLoading(false)
                console.log("Deleted Successfully")
                toast.success(`${res.data.name} Deleted successfully`)
                loadCategories()
            })
            .catch((err) =>{
                setLoading(false)
                console.log(err.message)
                toast.error(err.message)
            })
        }
    }

    const handleSearchChange = (e) => {
        const keyword = e.target.value.toLowerCase();
        setKeyword(keyword);
        
        if (keyword.length > 0) {
          setCopyCategories(
            categories.filter(category =>
              Object.values(category).some(value =>
                String(value).toLowerCase().includes(keyword)
              )
            )
          );
        } else {
          setCopyCategories(categories);
        }
    };

  return (
    <>
    <div className='container-fluid' >
        <div className='row' >
            <div className='col-md-2' ><AdminNav/></div>
            <div className='col'>
                {loading?<h4 className='text-danger' >Loading...</h4>:<h4>Create Category</h4>}
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
                    copyCategories.map((c)=>(
                        <div className='alert alert-secondary' key={c._id} >
                            {c.name} &nbsp;
                            <span 
                                onClick={() => handleRemove(c.slug)} 
                                className='float-right btn btn-sm text-danger'>
                                    Delete
                            </span> 
                            <Link 
                                className='float-right btn btn-sm ' 
                                to={`/admin/category/${c.slug}`} >
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
