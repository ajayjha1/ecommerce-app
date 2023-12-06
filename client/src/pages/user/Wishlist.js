import React, { useEffect, useState } from 'react'
import {Link} from "react-router-dom"
import { UserNav } from '../../components/nav/UserNav'
import { useSelector } from 'react-redux'
import { getWishlist, removeWishlist } from '../../functions/user'
import { FaTrashAlt } from 'react-icons/fa';

export const Wishlist = () => {
  const [wishlist, setWishlist] = useState([])
  const {user} = useSelector((state) =>({...state}));

  useEffect(() =>{
    loadWishlist()
  }, []);

  const loadWishlist = () =>{
    console.log(user.token)
    getWishlist(user.token)
    .then((res) =>{
      setWishlist(res.data.wishlist)
    })
    .catch((err) =>{
      console.log(err.message)
    })
  }
  const handleRemove = (productId) =>{
    removeWishlist(productId, user.token)
    .then((res) =>{
      loadWishlist()
    })
    .catch((err) =>{
      console.log(err.message)
    })
  }
  return (
    <>
    <div className='container-fluid' >
        <div className='row' >
            <div className='col-md-2' >
              <UserNav/>
            </div>
            <div className='col'>
              <h4>Wishlist</h4>
              {
                wishlist.map((p) =>{
                  return(
                    <div key={p._id} className='alert alert-secondary' >
                      <Link to={`/product/${p.slug}`} >{p.title}</Link>
                      <span onClick={()=>handleRemove(p._id)} className='btn btn-sm float-right' ><FaTrashAlt/></span>
                    </div>
                  )
                })
              }
            </div>
        </div>
    </div>
    </>
  )
}
