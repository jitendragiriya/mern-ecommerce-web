import React from 'react'
import { Link } from 'react-router-dom'
import './RecentOrders.css'

const RecentOrders = ({orders}) => {
    return (
        <div>
            <div className='recentOrders'>
                <div className='cardHeader'>
                    <h2>Recent Orders</h2>
                    <Link to='/admin/orders' className='btnPrimary'>View All</Link>
                </div>
                <table className='recentOrderstb'>
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Price</td>
                            <td>Status</td>
                        </tr>
                    </thead>
                    {orders &&
                        orders.slice(0, 10).map((ord) => (
                            <tbody key={ord._id}>
                                <tr>
                                    <td>{ord._id}</td>
                                    <td>{ord.totalPrice}</td>
                                    <td><span className={ord.orderStatus === 'Delivered' ? "greenColor"
                                        : "redColor"}>{ord.orderStatus}</span></td>
                                </tr>
                            </tbody>

                        ))}
                </table>
            </div>
        </div>
    )
}

export default RecentOrders
