import React, {useEffect, useState} from 'react'
import { Header } from '../components/nav/Header'
import { getProducts } from '../functions/product'
import { ProductCard } from '../components/cards/ProductCard'
import { Jumbotron } from '../components/cards/Jumbotron'
import { LoadingCard } from '../components/cards/LoadingCard'
import { NewArrivals } from '../components/home/NewArrivals'
import { BestSellers } from '../components/home/BestSellers'


export const Home = () => {
  return (
    <>
    <div className='jumbotron text-danger h1 font-weight-bold text-center' >
      <Jumbotron text={['Latest Products', "Laptops, Smartphones", "Latest gadgets"]} />
      {/* {loading ? <h4>loading...</h4> : <h4>All Products</h4>} */}
    </div>
    {/* {JSON.stringify(products)} */}
    <h4 className='text-center p-3 mt-5 mb-5 display-5 jumbotron' >
      New Arrivals
    </h4>
    <NewArrivals />

    <h4 className='text-center p-3 mt-5 mb-5 display-5 jumbotron' >
      Best Sellers
    </h4>
    <BestSellers />
    </>
  )
}
