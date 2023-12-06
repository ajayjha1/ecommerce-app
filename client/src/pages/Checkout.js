import React, { useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { createCashOrderForUser, emptyUserCart, getUserCart, saveUserAddress } from '../functions/user';
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom';

export const Checkout = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user, COD} = useSelector((state) => ({...state}));
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0)
    const [address, setAddress] = useState('');
    const [addressSaved, setAddressSaved] = useState(false)

    useEffect(() =>{
        getUserCart(user.token)
        .then((res) =>{
            console.log('user cart res', JSON.stringify(res.data, null, 4));
            setProducts(res.data.products);
            setTotal(res.data.cartTotal)
        })
        .catch((err) =>{
            console.log(err.message)
        })
    }, [])

    const EmptyCart = () =>{
        if(typeof window !== 'undefined'){
            localStorage.removeItem('cart')
        }

        //remove from redux
        dispatch({
            type: 'ADD_TO_CART',
            payload: [],
        })
        //remove from backend
        emptyUserCart(user.token)
        .then((res) =>{
            setProducts([])
            setTotal(0)
            toast.success('Cart is empty. Continue Shopping')
        })

    }

    const saveAddressToDB = () =>{
        //
        saveUserAddress(user.token, address)
        .then((res) =>{
            if(res.data.ok){
                setAddressSaved(true)
                toast.success('Address saved')
            }
        })
    }

    const createCashOrder = () =>{
        
        createCashOrderForUser(user.token, COD )
        .then((res) =>{
            if(res.data.ok){
                // remove from local storage
                if(typeof window !== undefined) localStorage.removeItem('cart')
                dispatch({
                    type: 'ADD_TO_CART',
                    payload: []
                });
                // empty redux coupon
                // empty redux COD
                dispatch({
                    type: 'COD',
                    payload: false
                });
                // empty cart from backend
                emptyUserCart(user.token)
                //redierect
                setTimeout(() =>{
                    navigate('/user/history')
                }, 1000)
            }
        })
        .catch((err) =>{
            console.log(err.message)
        })
    }
  return (
    <div className='row' >
        <div className='col-md-6' >
            <h4>Delivery Address</h4>
            <br/>
            <br/>
            
            <input className='form-control ml-1' rows={'3'} value={address} onChange={(e) =>setAddress(e.target.value)}/>
            
            <button className='btn btn-primary mt-2' onClick={saveAddressToDB}>Save</button>
            <hr/>
            {/* <h4>Got Coupon?</h4>
            <br/>
            Coupon input and apply button */}
        </div>
        <div className='col-md-6' >
            <h4>Order Summary</h4>
            {/* {JSON.stringify(total)}<br/>
            {JSON.stringify(products)} */}
            <hr/>
            <p>Products {products.length}</p>
            <hr/>
            {products.map((p, i) =>{
                return(
                <div key={i} >
                    <p>{p.product.title} ({p.color}) x {p.count} = ₹{p.product.price * p.count}</p>
                </div>
                )
            })}
            <p>Cart Total: ₹{total}</p>
            <div className='row'>
                <div className='col-md-6' >
                    <button className='btn btn-primary' disabled={!addressSaved} onClick={createCashOrder} >Place Order</button>
                </div>
                <div className='col-md-6' >
                    <button disabled={!products.length} onClick={EmptyCart} className='btn btn-primary' >Empty Cart</button>
                </div>
            </div>
        </div>
    </div>
  )
}
