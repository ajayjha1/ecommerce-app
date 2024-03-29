import React from 'react'
import {CheckCircleOutlined, CloseCircleOutlined} from '@ant-design/icons'
import { ShowPaymentInfo } from '../cards/ShowPaymentInfo'

export const Orders = ({orders, handleStatusChange}) => {
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
  return (
    orders.map((order) =>{
        return(
        <div key={order._id} className='row pb-5' >
            <ShowPaymentInfo order={order} />
            <div className='col-md-4' >
                Delivery Status
            </div>
            <div className='col-md-8' >
                <select name='status' defaultValue={order.orderStatus} onChange={(e) =>handleStatusChange(order._id, e.target.value)} >
                    <option value={'Not Processed'} >Not Processed</option>
                    <option value={'Processing'} >Processing</option>
                    <option value={'dispatched'} >Dispatched</option>
                    <option value={'cancelled'} >Cancelled</option>
                    <option value={'Completed'} >Completed</option>
                </select>
            </div>
            {showOrderInTable(order)}
        </div>
        )
    })
  )
}
