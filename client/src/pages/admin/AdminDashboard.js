import React, { useEffect, useState } from 'react'
import { AdminNav } from '../../components/nav/AdminNav'
import { getProductsByCount } from '../../functions/product'
import { AdminProductCard } from '../../components/cards/AdminProductCard'
import { getOrders, changeStatus } from '../../functions/admin'
import { useSelector, useDispatch } from 'react-redux'
import {toast} from 'react-toastify'
import { Orders } from '../../components/orders/Orders'


export const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const {user} = useSelector((state) => ({...state}));

  useEffect(() =>{
    loadOrders()
  }, [])

  const loadOrders = () =>{
    getOrders(user.token)
    .then((res) =>{

      console.log(JSON.stringify(res.data))
      setOrders(res.data)
    })
    .catch((err) =>{
      console.log(err.message)
    })
  }

  const handleStatusChange = (orderId, orderStatus) =>{
    changeStatus(orderId, orderStatus, user.token)
    .then((res) =>{
      toast.success('Status Updated');
      loadOrders();
    })
    .catch((err) =>{
      console.log(err.message)
    })
  }

  return (
    <div className='container-fluid' >
      <div className='row' >
        <div className='col-md-2' >
          <AdminNav />
        </div>
        <div className='col' >
          <h4>Admin Dashboard</h4>
          <Orders orders={orders} handleStatusChange={handleStatusChange} />
          {/* {JSON.stringify(orders)} */}
        </div>
      </div>
      
    </div>
  )
}








