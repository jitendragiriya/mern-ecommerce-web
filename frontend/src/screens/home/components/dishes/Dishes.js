import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import './Dishes.css'
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useDispatch } from 'react-redux'
import { addItemsToCart } from '../../../../Redux/actions/cartActions'
import { Rating } from "@mui/material";
import { notifySuccess } from '../../../../utils/alerts/Alerts';

const Dishes = ({ product }) => {
    const dispatch = useDispatch();
    const options = {
        value: product.ratings,
        readOnly: true,
        precision: 0.5
    };
    const addToBasket = () => {
        dispatch(addItemsToCart(product._id, 1))
        notifySuccess(`${1} item added to cart. `)
    }
    const maxlimit = 30;
    const maxDescription = 40;
    return (
        <Fragment>
            <div className="product__item">
                <Link to={`product/${product._id}`}><VisibilityIcon className='svg1' /></Link>
                <Link to={`product/${product._id}`}><FavoriteIcon className='svg2' /></Link>
                <Link to={`product/${product._id}`}>
                    <img src={product.images && product.images[0].url} alt={product.name} />

                    <h3 className='productTitle'>{
                        (product.name && (product.name).length > maxlimit) ?
                            (((product.name).substring(0, maxlimit - 3)) + '...') :
                            product.name}</h3>
                    <p className='pddescription'>{(product.description && (product.description).length > maxDescription) ?
                        (((product.description).substring(0, maxDescription - 3)) + '...') : product.description}</p>
                    <div className="stars">
                        <Rating {...options} />
                    </div>
                </Link>
                <span className='product__price'>₹{product.sellPrice}</span>
                <span className='product__sellPrice'>₹{product.price}</span>
                <button disabled={1 > product.Stock ? true : false} className='add__to__cart' onClick={addToBasket}>Add To Cart</button>
            </div>
        </Fragment>
    )
}

export default Dishes