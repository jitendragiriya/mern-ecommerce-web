import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import './Carts.css';
const Carts = ({ product }) => {

    return (
        <Fragment>
            <div className='yourCartItems'>
                <div className='cartandItemprice'>
                    <Link to={`/product/${product.product}`}>
                        <div className='yourCartItemsImage'>
                            <img className='image' src={product.image} alt={product.name}></img>
                        </div>
                    </Link>
                    <div className='CartItemTotalPrice1'>
                        <small>{product.quantity}</small>
                        <small>x</small>
                        <small>{product.price}</small>
                        <small>=</small>
                        <small id='priceInD'>$</small>
                        <small>{product.quantity * product.price}</small>
                    </div>
                </div>
                <div className='yourCartItemsDetails'>
                    <p className='title'>{product.name}</p>
                </div>
                <div className='CartItemTotalPrice'>
                    <small>{product.quantity}</small>
                    <small>x</small>
                    <small>{product.price}</small>
                    <small>=</small>
                    <small id='priceInD'>$</small>
                    <small>{product.quantity * product.price}</small>
                </div>
            </div>
        </Fragment>
    )
}

export default Carts;
