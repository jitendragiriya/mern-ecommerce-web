import React from 'react'
import Success from '../../components/Success'

const OrdersSuccess = () => {
    return (
        <Success
            message='Your order placed successfully!'
            url="/orders"
            btn='view orders'
            title='success'
        />
    )
}

export default OrdersSuccess
