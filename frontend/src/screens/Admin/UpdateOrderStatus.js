import React, { Fragment, useEffect, useState } from 'react'
import './UpdateOrderStatus.css'
import { useSelector, useDispatch } from 'react-redux'
import { getOrderDetails, clearError, updateOrder } from '../../Redux/actions/orderActions'
import Loading from '../../components/loaders/Loading'
import { UPDATE_ORDER_DETAILS_RESET } from "../../Redux/constants/orderConstants";
import { notifyError, notifySuccess } from '../../utils/alerts/Alerts'
import { ToastContainer } from 'react-toastify'
import MetaData from '../../utils/title/MetaData'
import { useHistory } from 'react-router-dom'

const UpdateOrderStatus = ({ match }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [status, setStatus] = useState("");
    const { order, loading, error } = useSelector((state) => state.orderDetails)
    const { error: updateError, isUpdated } = useSelector((state) => state.order);

    const updateOrderSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(updateOrder(match.params.id, status));
    };

    useEffect(() => {
        dispatch(getOrderDetails(match.params.id))
        if (error) {
            dispatch(clearError());
        }
        if (updateError) {
            dispatch(clearError());
            notifyError(updateError);
        }
        if (isUpdated) {
            notifySuccess('Updated Order Status.');
            dispatch({ type: UPDATE_ORDER_DETAILS_RESET });
            history.push('/admin/products')
        }

    }, [dispatch,history, error, match.params.id, isUpdated, updateError])
    const maxlength = 50;

    return (
        <Fragment>
            {loading ?
                (<Loading />) :
                (<Fragment>
                    <MetaData title='Update Orders'/>
                    <div className='changeTheOrderStatus'>
                        <form
                            className="updateOrderForm"
                            onSubmit={updateOrderSubmitHandler}
                        >
                            <h2>Process Order</h2>

                            <div>
                                <select onChange={(e) => setStatus(e.target.value)}>
                                    <option value="">Choose Category</option>
                                    {order.orderStatus === "Processing" && (
                                        <option value="Shipped">Shipped</option>
                                    )}

                                    {order.orderStatus === "Shipped" && (
                                        <option value="Delivered">Delivered</option>
                                    )}
                                </select>
                            </div>

                            <button
                                className="btnPrimary"
                                type="submit"
                                disabled={
                                    loading ? true : false || status === "" ? true : false
                                }
                            >
                                Process
                            </button>
                        </form>
                        {

                            <Fragment >
                                <div className='OneUserOrdersdetails'>
                                    <div className='orderbasicInfo'>
                                        <div className='ordChilds'><span>Order Place :</span><span>{order.createdAt && order.createdAt.slice(0, 10)}</span></div>
                                        <div className='ordChilds'><span>Total Price :</span><span>{order && order.totalPrice}</span></div> <div className='ordChilds'><span>Status :</span><span className={
                                            order.orderStatus &&
                                                order.orderStatus === "Delivered"
                                                ? "greenColor"
                                                : "redColor"
                                        }>{order && order.orderStatus}</span></div>
                                        <div className='ordChilds'><span>Payment :</span><span className={
                                            order.paymentInfo &&
                                                order.paymentInfo.status === "succeeded"
                                                ? "greenColor"
                                                : "redColor"
                                        }>{order.paymentInfo && order.paymentInfo.status}</span></div>
                                        <div className='ordChilds'><span>Address :</span><span>{order.shippingInfo && order.shippingInfo.address}</span></div>
                                        <div className='ordChilds'><span>City :</span><span>{order.shippingInfo && order.shippingInfo.city}</span></div>
                                        <div className='ordChilds'><span>Pincode :</span><span>{order.shippingInfo && order.shippingInfo.pinCode}</span></div>
                                        <div className='ordChilds'><span>State :</span><span>{order.shippingInfo && order.shippingInfo.state}</span></div>
                                        <div className='ordChilds'><span>Country :</span><span>{order.shippingInfo && order.shippingInfo.country}</span></div>
                                        <div className='ordChilds'><span>Phone :</span><span>{order.shippingInfo && order.shippingInfo.phoneNo}</span></div>
                                    </div>
                                    <div className='orderOnMore'>
                                        {order.orderItems && order.orderItems.map((item) => (
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
                        }
                    </div>
                </Fragment>
                )
            }

            <ToastContainer />
        </Fragment>
    )
}

export default UpdateOrderStatus
