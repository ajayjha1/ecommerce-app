import React, { useState, useEffect } from 'react'
import {fetchProductsByFilter, getProductsByCount} from '../functions/product'
import { useSelector, useDispatch } from 'react-redux'
import {ProductCard} from '../components/cards/ProductCard'
import {Menu, Slider, Checkbox} from 'antd'
import { FaRupeeSign } from 'react-icons/fa'
import { getCategories } from '../functions/category'
import {DownSquareOutlined} from "@ant-design/icons"

const { SubMenu, ItemGroup } = Menu;

export const Shop = () => {
    const dispatch = useDispatch()
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [price, setPrice] = useState([0, 0]);
    const [ok, setOk] = useState(false);
    const [categories, setCategories] = useState([])
    const [categoryIds, setCategoryIds] = useState([])

    let {search} = useSelector((state) => ({...state}))
    const {text} = search;

    

    useEffect(() =>{
        loadAllProducts()
        loadCategories()
        //fetch categories
    },[])

    useEffect(() =>{
        fetchProducts({price : price})
    }, [ok]);

    const loadCategories = async () =>{
        getCategories()
        .then((res) => {
            setCategories(res.data)

            console.log("categories---->", res.data)
        })
        .catch((err) =>{
            console.log(err.message)
        })
    }

    const handleSlider = (value) =>{
        dispatch({
            type: "SEARCH_QUERY",
            payload: {text: ""}
        });
        setCategoryIds([])
        setPrice(value)
        setTimeout(() =>{
            setOk(!ok)
        },300)
    }

    //Load products by default on page load
    const loadAllProducts = () =>{
        getProductsByCount(12)
        .then((p)=>{
            setProducts(p.data)
            setLoading(false)
        })
    }


    const fetchProducts = (arg) =>{
        fetchProductsByFilter(arg)
        .then((res) =>{
            setProducts(res.data)
        })
        .catch((err) =>{
            console.log(err.message)
        })
    }

    useEffect(() =>{
        // console.log('load all products on user search input')
        const delayed = setTimeout(()=>{
            fetchProducts({query : text})
            if(!text){
                loadAllProducts();
            }
        },300) 
        return () => clearTimeout(delayed)
    }, [text])

    const showCategories = () =>(
        categories.map((c) =>{
            return(
                <div key={c._id} >
                    <Checkbox 
                        onChange={handleCheck}
                        className='pb-2 pl-4 pr-4' 
                        value={c._id} 
                        name='category'
                        checked={categoryIds.includes(c._id)}
                    >
                        {c.name}
                    </Checkbox>
                </div>
            )
        })
    )

    //handle check for categories
    const handleCheck = (e) =>{
        console.log(e.target.value)
        let inTheState = [...categoryIds];
        let justChecked = e.target.value; 
        let foundInTheState = inTheState.indexOf(justChecked)

        //indexOf method ?? if not found return -1 else return index
        if(foundInTheState === -1){
            inTheState.push(justChecked)
        } else {
            // if found pull out one item from index
            inTheState.splice( justChecked, 1)
        }

        setCategoryIds(inTheState);
        console.log(inTheState);
        fetchProducts({ category: inTheState })
    }
  return (
    <div className='container-fluid'>
        <div className='row' >
            <div className='col-md-3'>
               <h4>search/filter</h4>
               &nbsp;<br/>
               <Menu defaultOpenKeys={['1','2']} mode='inline' >
                    <SubMenu
                        key={'1'}
                        title={
                            <span className='h6'>
                                <FaRupeeSign /> Price
                            </span>
                        }
                    >
                        <div>
                            <Slider 
                                className='ml-4 mr-4' 
                                tipFormatter={(v) => `₹${v}`} 
                                range
                                value={price}  
                                onChange={handleSlider}
                                max="500000"
                                min={10000}
                            />
                        </div>
                    </SubMenu>
                    <SubMenu
                        key={"2"}
                        title={
                            <span>
                                <DownSquareOutlined /> Categories
                            </span>
                        }
                    >
                        <div style={{marginTop: '10px'}} >{showCategories()}</div>
                    </SubMenu>
               </Menu>
            </div>
            <div className='col-md-9' >
                {loading ? <h4 className='text-danger'>Loading...</h4> : <h4>All Products</h4>}
                {products.length < 1 && <p>No products found</p>}
                <div className='row'>
                    {
                        products.map((p) =>(<div key={p._id} className='col-md-4' >
                                                    <ProductCard product={p} />
                                                </div>))
                    }
                </div>
            </div>
        </div>
    </div>
  )
}
