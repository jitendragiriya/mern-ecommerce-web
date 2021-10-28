import React, { Fragment } from 'react'
import CheckoutSteps from '../CheckoutStep';
import { useSelector } from 'react-redux'
import './ConfirmOrder.css'
import { Typography } from '@mui/material'
import Carts from './Carts';
import MetaData from '../../../../utils/title/MetaData';

const ConfirmOrder = ({ history }) => {
    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);

    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
    );

    const shippingCharges = subtotal > 1000 ? 0 : 200;

    const tax = subtotal * 0.18;

    const totalPrice = subtotal + tax + shippingCharges;

    const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

    const proceedToPayment = () => {
        const data = {
            subtotal,
            shippingCharges,
            tax,
            totalPrice,
        };

        sessionStorage.setItem("orderInfo", JSON.stringify(data));

        history.push("/process/payment");
    };

    return (
        <Fragment>
            <MetaData title='confirm order'/>
            <CheckoutSteps activeStep={1} />
            <div className="confirmOrderPage">
                <div className='shippingAndOrderSummary'>
                    <div className="confirmshippingArea">
                        <Typography>Shipping Info</Typography>
                        <div className="confirmshippingAreaBox">
                            <div>
                                <p>Name:</p>
                                <span>{user.name}</span>
                            </div>
                            <div>
                                <p>Phone:</p>
                                <span>{shippingInfo.phoneNo}</span>
                            </div>
                            <div>
                                <p>Address:</p>
                                <span>{address}</span>
                            </div>
                        </div>
                    </div>
                    <div className="orderSummary">
                        <Typography>Order Summery</Typography>
                        <div>
                            <div>
                                <p>Subtotal:</p>
                                <span>₹{subtotal}</span>
                            </div>
                            <div>
                                <p>Shipping Charges:</p>
                                <span>₹{shippingCharges}</span>
                            </div>
                            <div>
                                <p>GST:</p>
                                <span>₹{tax}</span>
                            </div>
                        </div>

                        <div className="orderSummaryTotal">
                            <p>
                                <b>Total:</b>
                            </p>
                            <span>₹{totalPrice}</span>
                        </div>

                        <button onClick={proceedToPayment}>Proceed To Payment</button>
                    </div>
                </div>
                <div className="confirmCartItems">
                    <Typography>Your Cart Items:</Typography>
                    <div className="confirmCartItemsContainer">
                        {cartItems &&
                            cartItems.map((item) => (
                                <Carts key={item.product} product={item}/>
                            ))}
                    </div>

                </div>
            </div>
        </Fragment>
    );
};

export default ConfirmOrder;
