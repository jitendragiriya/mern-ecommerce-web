import React, { Fragment } from 'react'
import './Checkout.css'
import CartItems from './components/CartItems';
import { useSelector } from 'react-redux'
import Subtotal from './subtotal/Subtotal';
import { Link } from 'react-router-dom';
import MetaData from '../../utils/title/MetaData';

export default function Checkout() {
    const { cartItems } = useSelector(state => state.cart)
    return (
        <Fragment>
            <MetaData title='cart'/>
            {cartItems.length === 0 ?
                (<Fragment>
                    <div className='empty__cart'>
                        <h1>Noting in cart</h1>
                        <h2>continue to buy...</h2>
                        <Link to='/'>👉 Go to products</Link>
                    </div>
                </Fragment>) : (
                    <Fragment>
                        <div className="cart">
                            <div className='cart__left'>
                                <div className='cart__header'>
                                    <h3 className='cart__title'>Shopping cart</h3>
                                        <span className='cart__prices'>price</span>
                                </div>
                                {
                                    cartItems.map(item => (<CartItems key={item.product} product={item}/>))

                                }
                            </div>
                            <div className='cart__right'>
                                <Subtotal />
                            </div>
                        </div>
                    </Fragment>
                )
            }
        </Fragment>
    )
}
