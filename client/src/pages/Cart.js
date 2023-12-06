import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { ProductCardInCheckout } from '../components/cards/ProductCardInCheckout'
import {userCart} from '../functions/user'


export const Cart = () => {
    const {cart, user, COD} = useSelector((state) => ({ ...state }))
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getTotal = () =>{
        return cart.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price
        }, 0)
    }

    const showCartItems = () =>{
        return(
        <table className='table table-bordered' >
            <thead className='thead-light' >
                <tr>
                    <th scope='col' >Image</th>
                    <th scope='col' >Title</th>
                    <th scope='col' >Price</th>
                    <th scope='col' >Brand</th>
                    <th scope='col' >Color</th>
                    <th scope='col' >Count</th>
                    <th scope='col' >Shipping</th>
                    <th scope='col' >Delete</th>
                </tr>
            </thead>
            {cart.map((p) =>{
                return(
                <ProductCardInCheckout key={p._id} p={p} />
                )
            })}
        </table>
        )
    }
    const navigateToLogin = () =>{
        navigate('/login')
    }

    const saveOrderToDB = () =>{
        //
        dispatch({
            type: 'COD',
            payload: true,
        });
        userCart(cart, user.token)
        .then((res) =>{
            console.log('CART POST RES', res)
            if(res.data.ok){
                navigate('/checkout');
            }
        })
        .catch((err) =>{
            console.log(err.message)
        })
        
    }
    

  return (
    <div className='container-fluid pt-2' >
        <div className='row' >
            <h4>Cart</h4>
            {/* {JSON.stringify(cart)} */}
        </div>
        <div className='row' >
            <div className='col-md-8' >
                {
                    !cart.length ? 
                        <p>No products in cart. <Link to='/shop'>Continue Shopping</Link></p> 
                            : 
                        showCartItems()
                }
            </div>
            <div className='col-md-4' >
                <h4>Order Summary</h4>
                <hr/>
                <p>Products</p>
                {cart.map((c, i) =>{
                    return(
                        <div key={i} >
                            <p>{c.title} x {c.count} = ₹{c.price * c.count}</p>
                        </div>
                    )
                })}
                <hr/>
                Total: <b>₹{getTotal()}</b>
                <hr/>
                {
                    user ? (<button className='btn btn-sm btn-primary mt-2' onClick={saveOrderToDB} disabled={!cart.length} > PROCEED TO CHECKOUT</button>) 
                    : (<button onClick={navigateToLogin} className='btn btn-sm btn-primary mt-2' > 
                    {/* <Link 
                        to={{
                                pathname: '/login',
                                state: {from: "cart"},
                                
                            }}
                    > */}
                        LOGIN TO CHECKOUT
                    {/* </Link> */}
                    </button>)
                }
            </div>
        </div>
    </div>
  )
}
