import React, { useEffect, useState } from 'react'
import { AdminNav } from '../../../components/nav/AdminNav'
import { getProductsByCount } from '../../../functions/product'
import { AdminProductCard } from '../../../components/cards/AdminProductCard'
import { removeProduct } from '../../../functions/product'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'

export const AllProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  const {user} = useSelector((state) => ({...state}))

  useEffect(()=>{
    loadAllProducts()
  },[])

  const loadAllProducts = () =>{
    setLoading(true)
    getProductsByCount(100)
    .then((res)=>{
      console.log(res)
      setLoading(false)
      setProducts(res.data)
    })
    .catch((err) =>{
      console.log(err.message)
    })
  }

  const handleRemove = (slug) =>{
    if(window.confirm('?Delete')){
      removeProduct(slug, user.token)
      .then((res) => {
        loadAllProducts();
        toast.success(`${res.data.title} is deleted sucessfully`)
      })
      .catch((err) => {
        if(err.response.status === 400) toast.error(err.response.data)
      })
    }
  }


  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNav />
        </div>
        <div className='col-md-10'>
          {loading ? <p>Loading...</p> : <h4>All Products</h4>}
          <hr
            style={{
             background: 'black',
             color: 'black',
            borderColor: 'black',
            height: '3px',
            }}
          />
          <div className='row'>
            {products.map((product) => (
              <AdminProductCard product={product} key={product._id} handleRemove={handleRemove} />
              // <div key={product._id} className='col-md-4'>
              //   <div className='card'>
              //     <div className='card-body'>
              //       <h5 className='card-title'>{product.title}</h5>
              //       <p className='card-text'>{product.description}</p>
              //       <p className='card-text'>{product.price}</p>
              //     </div>
              //   </div>
              // </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}







