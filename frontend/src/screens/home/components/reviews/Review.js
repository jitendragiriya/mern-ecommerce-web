import React from 'react'
import './Review.css'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import img1 from './img/profile.png'
import Rating from '@mui/material/Rating';

const Review = ({ product }) => {
    const data = [];

    product && product.slice(0, 10).map((item) => {
        return item.reviews.map((i) => {
            return data.push(i)
        })
    })
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };
    return (
        <Carousel swipeable={true}
            draggable={true}
            showDots={false}
            responsive={responsive}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={1000}
            keyBoardControl={true}
            customTransition="all .5"
            transitionDuration={2000}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}>
            {data &&
                data.map((rev) => (
                    <div className="review__slide" key={rev._id}>
                        <div className="user">
                            <img src={img1} alt="" />
                            <div className="user-info">
                                <h3>{rev && rev.name}</h3>
                                <div className="stars">
                                    {rev &&
                                        <Rating
                                            value={rev.rating}
                                            readOnly={true}
                                            precision={0.5} />}
                                </div>
                            </div>
                        </div>
                        <p>{rev && rev.comment}</p>
                    </div>
                ))
            }
        </Carousel >
    )
}

export default Review;
