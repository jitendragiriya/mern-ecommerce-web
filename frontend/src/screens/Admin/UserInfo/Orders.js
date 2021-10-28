import React, { Fragment } from 'react';
import { Link} from 'react-router-dom'
import './Orders.css'

const Orders = ({ orders }) => {
    const maxlength = 50;
    return (
        <Fragment>
            {
                orders &&
                orders.map((ord) => (
                    <Fragment key={ord._id} >
                        <div className='OneUserOrdersdetails'>
                            <div className='orderbasicInfo'>
                                <div className='ordChilds'><span>Order Place :</span><span>{ord.createdAt && ord.createdAt.slice(0, 10)}</span></div>
                                <div className='ordChilds'><span>Total Price :</span><span>{ord.totalPrice && ord.totalPrice}</span></div>
                                <div className='ordChilds'><span>Status :</span><span className={
                                    ord.orderStatus &&
                                        ord.orderStatus === "Delivered"
                                        ? "greenColor"
                                        : "redColor"
                                }>{ord && ord.orderStatus}</span></div>
                                <div className='ordChilds'><span>Payment :</span><span className={
                                    ord.paymentInfo &&
                                        ord.paymentInfo.status === "succeeded"
                                        ? "greenColor"
                                        : "redColor"
                                }>{ord.paymentInfo && ord.paymentInfo.status}</span></div>
                                <div className='ordChilds'><span>Address :</span><span>{ord.shippingInfo && ord.shippingInfo.address}</span></div>
                                <div className='ordChilds'><span>City :</span><span>{ord.shippingInfo && ord.shippingInfo.city}</span></div>
                                <div className='ordChilds'><span>Pincode :</span><span>{ord.shippingInfo && ord.shippingInfo.pinCode}</span></div>
                                <div className='ordChilds'><span>State :</span><span>{ord.shippingInfo && ord.shippingInfo.state}</span></div>
                                <div className='ordChilds'><span>Country :</span><span>{ord.shippingInfo && ord.shippingInfo.country}</span></div>
                                <div className='ordChilds'><span>Phone :</span><span>{ord.shippingInfo && ord.shippingInfo.phoneNo}</span></div>
                                <Link to={`/admin/u/order/${ord._id}`}><div className='ordChilds'><span>ID :</span><span>{ord._id && ord._id}</span></div></Link>
                            </div>
                            <div className='orderOnMore'>
                                {ord.orderItems.map((item) => (
                                    <div className='checkoutProducts' key={item._id}>
                                        <div className='ckeckoutProductImage'>
                                            <img className='image' src={item.image} alt=''></img>
                                        </div>
                                        <div className='checkOutProductDetail'>
                                            <p>{((item.name).length > maxlength) ? (((item.name).substr(0, maxlength - 3)) + '...') : item.name} the total in the market is the best over the main in the level up and the morning and the le</p>
                                            <p>{item.quantity}Qun</p>
                                            <p>₹{item.price}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Fragment>
                ))
            }

        </Fragment>
    )
}

export default Orders
