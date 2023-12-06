import React, {useEffect, useState} from 'react'
import { Header } from '../../components/nav/Header'
import { getProducts, getProductsCount } from '../../functions/product'
import { ProductCard } from '../../components/cards/ProductCard'
import { Jumbotron } from '../../components/cards/Jumbotron'
import { LoadingCard } from '../../components/cards/LoadingCard'
import { Pagination } from 'react-bootstrap'

export const BestSellers = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  const [productsCount, setProductsCount] = useState()
  const [page, setPage] = useState(1);
  const [pagesArr, setPagesArr] = useState([])

  useEffect(() =>{
    loadAllProducts()
  }, [])

  const loadAllProducts = () =>{
    setLoading(true)
    getProducts("sold", 'desc', page)
    .then((res)=>{
      setProducts(res.data)
      setLoading(false)
    })
    .catch((err) =>{
      console.log(err.message)
    })
  }

  useEffect(() =>{
    getProductsCount()
    .then((res) =>{
      setProductsCount(res.data)
      let tempArr = []
      for(let i = 1; i <= res.data/3 + 1; i++){
        tempArr.push(i)
      }
      setPagesArr(tempArr)
      console.log(res)
    })
    .catch((err) =>{
      console.log(err.message)
    })
  },[])

  return (
    <>
    
    
    <div className='container'>
    {loading ? <LoadingCard/> : <div className='row'>
      {products.map((product) =>{
          return(
        <div key={product._id} className='col-md-4' >
          <ProductCard product={product} />
        </div>
        )
      })}
    </div>}
    </div>
    </>
  )
}
