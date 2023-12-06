import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProduct } from '../functions/product'
import {SingleProduct} from '../components/cards/SingleProduct'

export const Product = () => {
    const [product, setProduct] = useState({})
    const params = useParams()
    const {slug} = params

    useEffect (() =>{
        loadSingleProduct()
    },[])

    const loadSingleProduct = () => {
        getProduct(slug)
        .then((res) => {
            setProduct(res.data)
        })
        .catch((err) =>{
            console.log(err.message)
        })
    }

  return (
    <div className='container-fluid'>
        <div className='row pt-4' >
            <SingleProduct product={product} />
        </div>
        {/* <hr style={{ borderTop: "10px solid black" }} />
        <div className='row' >
            <div className='col text-center pt-5 pb-5' >
                <h4>Related Products</h4>
            </div>
        </div>
        <hr style={{ borderTop: "10px solid black" }} /> */}
    </div>
  )
}
