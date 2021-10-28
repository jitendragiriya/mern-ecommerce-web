import React, { Fragment } from 'react'
import './CartItems.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { addItemsToCart, removeCartItem } from '../../../Redux/actions/cartActions'
const CheckoutProduct = ({ product }) => {
    const dispatch = useDispatch();
    const increaseQuantity = (id, quantity, stock) => {
        const newQty = + 1;
        if (stock <= quantity) {
            return;
        }
        dispatch(addItemsToCart(id, newQty));
    };

    const decreaseQuantity = (id, quantity) => {
        const newQty = - 1;
        if (1 >= quantity) {
            return;
        }
        dispatch(addItemsToCart(id, newQty));
    };
    const removeItem = () => {
        dispatch(removeCartItem(product.product));
    }
    const maxlength = 100;
    return (
        <Fragment>
            <div className='checkout__productPage'>
                <Link to={`/product/${product.product}`}>
                    <div className='checkoutProduct__image'>
                        <img className='image' src={product.image} alt=''></img>
                    </div>
                </Link>
                <div className='checkoutProductInfo'>
                    <div className='checkOutProductDetails'>
                        <p className='ProductName'>{((product.name).length > maxlength) ? ((product.name.substr(0, maxlength - 3)) + '...') : product.name}</p>
                        <div className='prdQuantity'>
                            <button className="btnPrimary removeFCart" onClick={removeItem}>Remove</button>
                            <div className='product__quantity'>
                                <button className='porduct__quan_btn' onClick={() =>
                                    decreaseQuantity(
                                        product.product,
                                        product.quantity
                                    )} >-</button>
                                <span>Qut : {product.quantity}</span>
                                <input type="number" value={product.quantity} readOnly max={product.stock} hidden />
                                <button className='porduct__quan_btn' onClick={() =>
                                    increaseQuantity(
                                        product.product,
                                        product.quantity,
                                        product.stock
                                    )} >+</button>
                            </div>
                        </div>
                    </div>
                    <span className='copPPrice'>${product.price} X {product.quantity} : {product.price * product.quantity}
                    </span>
                </div>
            </div>

            {/* tab view */}
            <div className='checkout__productPage tabView'>
                <div className='TabViewCheckout'>
                    <Link to={`/product/${product.product}`}>
                        <div className='checkoutProduct__image'>
                            <img className='image' src={product.image} alt=''></img>
                        </div>
                    </Link>
                    <div className='checkoutProductInfo'>
                        <div className='checkOutProductDetails'>
                            <p className='ProductName'>{((product.name).length > maxlength) ? ((product.name.substr(0, maxlength - 3)) + '...') : product.name}</p>

                        </div>
                    </div>
                </div>
                <span className='copPPrice'>${product.price} X {product.quantity} : {product.price * product.quantity}
                </span>
                <div className='prdQuantity'>
                    <button className="btnPrimary removeFCart" onClick={removeItem}>Remove</button>
                    <div className='product__quantity'>
                        <button className='porduct__quan_btn' onClick={() =>
                            decreaseQuantity(
                                product.product,
                                product.quantity
                            )} >-</button>
                        <span>Qut : {product.quantity}</span>
                        <input type="number" value={product.quantity} readOnly max={product.stock} hidden />
                        <button className='porduct__quan_btn' onClick={() =>
                            increaseQuantity(
                                product.product,
                                product.quantity,
                                product.stock
                            )} >+</button>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default CheckoutProduct;
