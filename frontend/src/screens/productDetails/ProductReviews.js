import React from 'react'
import './ProductReviews.css'
import { Rating } from "@mui/material";

const ProductReviews = ({ review }) => {
    const options = {
        size: "large",
        value: review.rating,
        readOnly: true,
        precision: 0.5
    };
    return (
        <div className='reviewCart'>
            <div className='reviewerImage'>
                <img src='https://scontent.fbho4-1.fna.fbcdn.net/v/t1.18169-9/16196015_10154888128487744_6901111466535510271_n.png?_nc_cat=103&ccb=1-5&_nc_sid=85a577&_nc_ohc=wFdOghiNA7MAX-JE1X7&_nc_ht=scontent.fbho4-1.fna&oh=e7e12c99fb9cdc44d0cb68bfc530b461&oe=61898033' alt='product'></img>
            </div>
            <div className='name'>{review.name}</div>
            <div className='rating'>{review&& <Rating {...options} />}</div>
            <div className='comment'>{review.comment}</div>
        </div>
    )
}

export default ProductReviews
