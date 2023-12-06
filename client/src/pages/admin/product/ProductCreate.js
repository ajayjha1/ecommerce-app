import React, {useEffect, useState} from 'react'
import { AdminNav } from '../../../components/nav/AdminNav'
import {ToastContainer, toast} from 'react-toastify'
import { useSelector } from 'react-redux'
import { createProduct } from '../../../functions/product'
import { Button } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { CategoryForm } from '../../../components/forms/CategoryForm'
import { LocalSearch } from '../../../components/forms/LocalSearch'
import { ProductCreateForm } from '../../../components/forms/ProductCreateForm'
import { getCategories, getCategorySubs } from '../../../functions/category'
import { FileUpload } from '../../../components/forms/FileUpload'
import { FaSpinner } from 'react-icons/fa';


const initialState = {
    title: '',
    description: '',
    price: '',
    categories: [],
    category: '',
    subs: [],
    shipping: '',
    quantity: '',
    images: [],
    colors: ['Black', 'Brown', 'Silver', 'White', 'Blue'],
    brands: ['Microsoft', "Apple", "Samsung", "Lenovo", "Asus", "Acer", "Other"],
    color: "",
    brand: "",
}




export const ProductCreate = () => {
    const [values, setValues] = useState(initialState);
    const [subOptions, setSubOptions] = useState('');
    const [showSub, setShowSub] = useState(false);
    const [loading, setLoading] = useState(false);

    const {user} = useSelector((state)=>({...state}))

    useEffect(() =>{
        loadCategories()
    }, [])

    const loadCategories = () =>{
        getCategories()
        .then((c) =>{
            setValues({...values, categories: c.data})
        })
    }
    
    const handleSubmit = (e) =>{
        e.preventDefault()
        createProduct(values, user.token)
        .then((res) =>{
            console.log("Successfully created product", res)
            window.alert(`"${res.data.title}" Product Created`)
            toast.success(`"${res.data.title}" Product Created`)
            window.location.reload()
        })
        .catch((err)=>{
            console.log(err.message)
            toast.error(err.response.data.err)

        })
    }
    
    const handleChange = (e) =>{
        setValues({...values, [e.target.name] : e.target.value})
        
    }

    const handleCategoryChange = (e) =>{
        e.preventDefault();
        
        console.log('')
        setValues({...values, subs: [], category: e.target.value})
        getCategorySubs(e.target.value)
        .then((res) =>{
            setSubOptions(res.data)
            console.log(res.data)
        })
        .catch((err) =>{
            console.log(err.message)
        })
        setShowSub(true)
    }
  return (
    <div className='container-fluid' >
        <div className='row' >
            <div className='col-md-2' >
                <AdminNav/>
            </div>
            <div className='col-md-10' >
                {loading ? <FaSpinner className="spinner" /> : <h4>Product Create</h4>}
                <div className='p-3' >
                    <FileUpload 
                        values={values} 
                        setValues={setValues}
                        setLoading={setLoading}
                    />
                </div>
                <ProductCreateForm 
                    handleSubmit={handleSubmit} 
                    handleChange={handleChange}
                    values={values}
                    handleCategoryChange={handleCategoryChange}
                    subOptions={subOptions}
                    showSub={showSub}
                />
            </div>
        </div>
    </div>
  )
}
