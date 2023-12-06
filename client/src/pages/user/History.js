import React, { useEffect, useState } from 'react'
import {Link} from "react-router-dom"
import { UserNav } from '../../components/nav/UserNav'
import { getUserOrders } from '../../functions/user'
import { useSelector, useDispatch } from 'react-redux'
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import {toast} from 'react-toastify'
import { ShowPaymentInfo } from '../../components/cards/ShowPaymentInfo'

export const History = () => {

  const [orders, setOrders] = useState([]);
  const {user} = useSelector((state) =>({...state}))
  
  useEffect(() =>{
    loadUserOrders()
  }, [])

  const loadUserOrders = () =>{
    getUserOrders(user.token)
    .then((res) =>{
      setOrders(res.data)
    })
    .catch((err) =>{
      console.log(err.message)
    })
  }

  const showOrderInTable = (order) =>{
    return(
    <table className='table table-borderd' >
      <thead className='thead-light' >
        <tr>
          <th scope='col' >Title</th>
          <th scope='col' >Price</th>
          <th scope='col' >Brand</th>
          <th scope='col' >Color</th>
          <th scope='col' >Count</th>
          <th scope='col' >Shipping</th>
        </tr>
      </thead>

      <tbody>
        {order.products.map((p, i)=>{
          return(
            <tr key={i} >
              <td><b>{p.product.title}</b></td>
              <td>{p.product.price}</td>
              <td>{p.product.brand}</td>
              <td>{p.color}</td>
              <td>{p.count}</td>
              <td>{p.product.shipping==="Yes" ? <CheckCircleOutlined/>: <CloseCircleOutlined />}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
    )
  }

  const showEachOrders = () =>{
    return(
        orders.map((order, i) =>{
          return(
            <div key={i} className='m-5 p-3 card' >
              <ShowPaymentInfo order={order} />
              {
                showOrderInTable(order)
              }
            </div>
          )
        })
    )
  }

  return (
    <>
    <div className='container-fluid' >
        <div className='row' >
            <div className='col-md-2' ><UserNav/></div>
            <div className='col text-center' >
              <h4>{orders.length > 0? showEachOrders() : "No purchase orders"}</h4>
            </div>

            {/* <div className='col'>user history page</div> */}
        </div>
    </div>
    </>
  )
}
