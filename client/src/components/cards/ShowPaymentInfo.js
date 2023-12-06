import React from 'react'

export const ShowPaymentInfo = ({order}) => {
  return (
    <div className='' >
        <p>
            {/* <span>Order ID: {order.id}</span>{" "} */}
            <span>Amount: {(order.paymentIntent.amount /=100).toLocaleString("en-us", {
                style: "currency",
                currency: "INR"
            })}</span>{" "}
            {/* <span>Method: {order.paymentIntent.payment.payment_method_types[0]}</span>{" "} */}
            {/* <span>Ordered On: {new Date(order.paymentIntent.created)} </span> */}
        </p>
    </div>
  )
}
