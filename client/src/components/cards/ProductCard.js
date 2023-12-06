import React, { useState } from 'react'
import { Card, Button, Col, Tooltip} from 'react-bootstrap';
import laptop from '../../images/laptop.jpg';
import { FaEye, FaCartPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import _ from 'lodash'
import { useSelector, useDispatch } from 'react-redux';
import {toast} from 'react-toastify'

export const ProductCard = ({product}) => {
    const { title, images, description, quantity, price, slug } = product;
    const navigate = useNavigate()
    // const {tooltip, setTooltip} = useState('Click to add')

    //redux
    const {user, cart} = useSelector((state) => ({...state}))
    const dispatch = useDispatch();

  const navigateToViewProduct = (slug) =>{
    navigate(`/product/${slug}`)
  }

  const handleAddToCart = () =>{
   
   let cart = [];
   if(typeof window !== 'undefined') {
    //if cart is in the local storage
    if(localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart'))
      console.log(cart)
    }
    // push new product to cart
    cart.push({
      ...product,
      count: 1,
    });

    //remove duplicates
    let unique = _.uniqWith(cart, _.isEqual)

    // save to local storage
    localStorage.setItem('cart', JSON.stringify(unique));
     // show tooltip
    //  setTooltip('Added to cart')

     //Add to redux state
     dispatch({
      type: "ADD_TO_CART",
      payload: unique,
     })

     dispatch({
      type: "SET_VISIBLE",
      payload: true,
     })
     toast.success("Added to cart")
   }
  }
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img
          style={{ height: '170px', objectFit: 'cover' }}
          variant="top"
          src={images && images?.length ? images[0].url : laptop}
        />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description.substring(0,20)+ '...'}</Card.Text>
          <div className="d-flex justify-content-between align-items-center">
            <span className="price">₹{price}</span>
            {/* <span className="quantity">{quantity} in stock</span> */}
          </div>
          <div className="d-flex justify-content-center mt-3"/>
        <div className="product-actions">
          <Button onClick={() => navigateToViewProduct(slug)} variant="primary">
            <FaEye /> View 
          </Button>
          &nbsp;
          {/* <Tooltip title={tooltip} > */}
            <Button onClick={handleAddToCart} variant="success">
              <FaCartPlus /> Add to cart
            </Button>
          {/* </Tooltip> */}
        </div>
      </Card.Body>
    </Card>
  )
}
