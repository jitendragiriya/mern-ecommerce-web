import React from "react";
import "./Subtotal.css";
import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux'

function Subtotal() {
    const history = useHistory();
    const { cartItems } = useSelector(state => state.cart)
    return (
        <div className="subtotal">
            <div>
                <p className='total__items'>
                    Subtotal ({cartItems.length} items): <strong>{`${cartItems.reduce((ecc, item) =>
                        ecc + item.quantity * item.price, 0
                    )}`}</strong>
                </p>
                <small className="subtotal__gift">
                    <input type="checkbox" /> This order contains a gift
                </small>
            </div>

            <button onClick={e => history.push('/shipping')}>Proceed to Checkout</button>
        </div>
    );
}

export default Subtotal;
