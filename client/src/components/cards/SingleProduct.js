import React, { useState } from "react";
import { Card, Button, Carousel } from "react-bootstrap";
import { FaHeart, FaCartPlus } from "react-icons/fa";
import Laptop from "../../images/laptop.jpg";
import { Link } from "react-router-dom";
import _ from 'lodash'
import { useSelector, useDispatch } from 'react-redux';
import { addToWishlist } from "../../functions/user";
import { toast } from "react-toastify";

export const SingleProduct = ({ product }) => {
  const { title, description, images, slug, category, subs } = product;
  const [index, setIndex] = useState(0);
  const {tooltip, setTooltip} = useState('Click to add')

    //redux
    const {user, cart} = useSelector((state) => ({...state}))
    const dispatch = useDispatch();

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
        setTooltip('Added to cart')
        //Add to redux state
        dispatch({
         type: "ADD_TO_CART",
         payload: unique,
        })
      }
     }

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const handleAddToWishlist = (e) =>{
    e.preventDefault()
    addToWishlist(product._id, user.token)
    .then((res) =>{
      toast.success("Added to wishlist")
    })
    .catch((err) =>{
      console.log(err.message)
    })
  }

  return (
    <>
      <div className="col-md-7">
        <Carousel activeIndex={index} onSelect={handleSelect}>
          {images && images.length > 0 ? (
            images.map((image, i) => {
              return (
                // style={{width: "500px", height: "500px"}}
                <Carousel.Item key={i} > 
                  <img  className="d-block w-100" src={image.url} alt={image.name} />
                </Carousel.Item>
              );
            })
          ) : (
            <Carousel.Item>
              <img className="d-block w-100" src={Laptop} alt="Default Laptop" />
            </Carousel.Item>
          )}
        </Carousel>
        <div className="row mt-4">
          {images &&
            images.length > 0 &&
            images.map((image, i) => {
              const isSelected = index === i;
              return (
                <div className={`col-2 ${isSelected ? "border border-gray rounded" : ""}`} key={i}>
                  <img src={image.url} alt={image.name} className="img-fluid" onClick={() => setIndex(i)} />
                </div>
              );
            })}
        </div>
      </div>
      <Card className="col-md-5">
        <h1 className="bg-info p-3 text-center" >{product.title}</h1>
        <Card.Text>{product.description}</Card.Text>
        <div className="pb-3">
            <ul className="list-group">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    Price{" "}
                    <span className="label label-default label-pill ml-auto">₹{product.price}</span>
                </li>
                {category && <li className="list-group-item d-flex justify-content-between align-items-center">
                    Category{" "}
                    <Link to={`/category/${category.slug}`} className="label label-default label-pill ml-auto">{category?.name}</Link>
                </li>}
                {subs && <li className="list-group-item d-flex justify-content-between align-items-center">
                    Sub Category{" "}
                    { 
                        subs.map((s) =>{
                            return(
                            <Link key={s._id} to={`/sub/${s.slug}`} className="label label-default label-pill ml-auto">{s.name}</Link>
                            )
                        })
                    }
                    
                </li>}
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    Color{" "}
                    <span className="label label-default label-pill ml-auto">₹{product.price}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    Brand{" "}
                    <span className="label label-default label-pill ml-auto">₹{product.price}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    Available{" "}
                    <span className="label label-default label-pill ml-auto">{product.quantity}</span>
                </li>
            </ul>
        </div>
        <Button onClick={handleAddToWishlist} variant="primary">
          <FaHeart /> Wishlist
        </Button>
        &nbsp;
        <Button onClick={handleAddToCart} variant="success">
          <FaCartPlus /> Add to cart
        </Button>
      </Card>
    </>
  );
};
