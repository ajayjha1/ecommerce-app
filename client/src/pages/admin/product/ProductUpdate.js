import React, {useEffect, useState} from 'react'
import { AdminNav } from '../../../components/nav/AdminNav'
import {ToastContainer, toast} from 'react-toastify'
import { useSelector } from 'react-redux'
import { getProduct, updateProduct } from '../../../functions/product'
import { Button } from 'react-bootstrap'
import {Link, useNavigate, useParams} from 'react-router-dom'
import { CategoryForm } from '../../../components/forms/CategoryForm'
import { LocalSearch } from '../../../components/forms/LocalSearch'
import { getCategories, getCategorySubs } from '../../../functions/category'
import { FileUpload } from '../../../components/forms/FileUpload'
import { FaSpinner } from 'react-icons/fa';
import { ProductUpdateForm } from '../../../components/forms/ProductUpdateForm'


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
    brands: ['Microsoft', "Apple", "Samsung", "Lenovo", "Asus"],
    color: "",
    brand: "",
}




export const ProductUpdate = (props) => {
    
    const {user} = useSelector((state)=>({...state}))
    const [values, setValues] = useState(initialState);
    const [categories, setCategories] = useState()
    const [selectedCategory, setSelectedCategory] = useState([])
    const [subOptions, setSubOptions] = useState([])
    const [showSub, setShowSub] = useState(false)
    const [arrayofSubs, setArrayOfSubs] = useState([])
    const [loading, setLoading] = useState(false)
    const params = useParams()
    const navigate = useNavigate()
    const {slug} = params

    

    useEffect(() =>{
        loadProduct()
        loadCategories()
    }, [])

    const loadProduct = () =>{
        getProduct(slug)
        .then((p) =>{
            console.log('single product', p)
            //1. load a single product
            setValues({...values, ...p.data})
            //2. load a single product category subs
            getCategorySubs(p.data.category._id)
            .then((res) =>{
                setSubOptions(res.data) // on first load show default suboptions
            })
            .catch((err) =>{
                console.log(err.message)
            })
            //3. prepare array of sub ids to show as default sub values
            let arr = []
            p.data.subs.map((s) =>{
                arr.push(s._id)
            })
            setArrayOfSubs((prev) => arr)
        })
        .catch((err) => {
            console.log(err.message)
        })
    }

    const loadCategories = () =>{
        getCategories()
        .then((c) =>{
            setValues({...values, categories: c.data})
            setCategories(c.data)
        })
        .catch((err) =>{
            console.log(err.message)
        })
    }

    const handleCategoryChange = (e) =>{
        e.preventDefault();
        
        console.log('')
        setValues({...values, subs: [], category: e.target.value})
        setSelectedCategory(e.target.value)
        getCategorySubs(e.target.value)
        .then((res) =>{
            setSubOptions(res.data)
            console.log(res.data)
        })
        .catch((err) =>{
            console.log(err.message)
        })
        setShowSub(true)

        setArrayOfSubs([]);
    }

    const handleChange = (e) =>{
        setValues({...values, [e.target.name] : e.target.value})
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        setLoading(true)

        values.subs = arrayofSubs
        values.category = values.category

        updateProduct(slug, values, user.token)
        .then((res) =>{
            setLoading(false)
            toast.success(`${res.data.title} is updated`)
            navigate('/admin/products')
        })
        .catch((err) =>{
            console.log(err.message)
        })
    }

   
  return (
    <div className='container-fluid' >
        <div className='row' >
            <div className='col-md-2' >
                <AdminNav/>
            </div>
            <div className='col-md-10' >
            {loading ? <FaSpinner className="spinner" /> : <h4>Product Create</h4>}
                {/* {JSON.stringify(slug)} */}
                <FileUpload
                    values={values}
                    setValues={setValues}
                    setLoading={setLoading}
                />

                <ProductUpdateForm 
                    handleSubmit={handleSubmit} 
                    handleChange={handleChange} 
                    values={values} setValues={setValues} 
                    handleCategoryChange={handleCategoryChange} 
                    categories={categories} 
                    subOptions={subOptions} 
                    showSub={showSub}
                    arrayofSubs={arrayofSubs}
                    setArrayOfSubs={setArrayOfSubs}
                />
        </div>
    </div>
    </div>
  )
}
