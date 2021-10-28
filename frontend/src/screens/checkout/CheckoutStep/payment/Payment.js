import React, { Fragment, useRef, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import './Payment.css'
import {
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js"
import axios from 'axios'
import CreditCardIcon from '@mui/icons-material/CreditCard';
import EventIcon from '@mui/icons-material/Event';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { useSelector, useDispatch } from "react-redux";
import { Typography } from "@mui/material";
import CheckoutSteps from '../CheckoutStep'
import { createOrder } from '../../../../Redux/actions/orderActions'
import MetaData from '../../../../utils/title/MetaData'
import { notifyError } from '../../../../utils/alerts/Alerts'

const Payment = () => {
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

    const history = useHistory();
    const dispatch = useDispatch();
    const stripe = useStripe();
    const elements = useElements();
    const payBtn = useRef(null);

    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
    const { error } = useSelector((state) => state.newOrder);

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100),
    };

    const order = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice: orderInfo.subtotal,
        taxPrice: orderInfo.tax,
        shippingPrice: orderInfo.shippingCharges,
        totalPrice: orderInfo.totalPrice,
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        payBtn.current.disabled = true;

        try {
            const url = 'http://localhost:5000/api/payment/process'
                   const { data } = await axios.post(url,
                paymentData, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true
            }
            );

            const client_secret = data.client_secret;
            if (!stripe || !elements) return;

            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email,
                        address: {
                            line1: shippingInfo.address,
                            city: shippingInfo.city,
                            state: shippingInfo.state,
                            postal_code: shippingInfo.pinCode,
                            country: shippingInfo.country,
                        },
                    },
                },
            });

            if (result.error) {
                payBtn.current.disabled = false;

            } else {
                if (result.paymentIntent.status === "succeeded") {
                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status,
                    };

                    dispatch(createOrder(order));

                    history.push("/order/success");
                } else {
                    alert.error("There's some issue while processing payment ");
                }
            }
        } catch (error) {
            payBtn.current.disabled = false;
        }
    };

    useEffect(() => {
        if (error) {
            notifyError(error);
        }
    }, [error])
    return (
        <Fragment>
            <MetaData title='payment'/>
            <CheckoutSteps activeStep={2} />
            <div className="paymentContainer">
                <form className="paymentForm"
                    onSubmit={(e) => submitHandler(e)} >
                    <Typography>Card Info</Typography>
                    <div>
                        <CreditCardIcon />
                        <CardNumberElement className="paymentInput" />
                    </div>
                    <div>
                        <EventIcon />
                        <CardExpiryElement className="paymentInput" />
                    </div>
                    <div>
                        <VpnKeyIcon />
                        <CardCvcElement className="paymentInput" />
                    </div>

                    <input
                        type="submit"
                        value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
                        ref={payBtn}
                        className="paymentFormBtn"
                    />
                </form>
            </div >
        </Fragment>
    )
}

export default Payment
