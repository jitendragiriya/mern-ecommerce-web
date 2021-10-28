import React, { useState, useEffect, Fragment } from 'react'
import './Productdetails.css'
import { getProductDetails, newReview, clearError } from '../../Redux/actions/productAction'
import { useSelector, useDispatch } from 'react-redux'
import { addItemsToCart } from '../../Redux/actions/cartActions'
import ProductReviews from './ProductReviews'
import { ToastContainer } from 'react-toastify';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
} from "@mui/material";
import { Rating } from "@mui/material";
import { NEW_REVIEW_RESET } from '../../Redux/constants/productConstants'
import Loading from '../../components/loaders/Loading'
import { notifySuccess, notifyError } from '../../utils/alerts/Alerts'
import MetaData from '../../utils/title/MetaData'

export default function Productdetails({ match }) {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [ratingIn, setRatingIn] = useState({ rating: 0, comment: '' });
    const { product, loading, error } = useSelector((state) => state.productDetails)
    const { success, error: reviewError } = useSelector((state) => state.newReviews);

    const options = {
        value: product.ratings,
        readOnly: true,
        precision: 0.5
    };
    const addToBasket = () => {
        dispatch(addItemsToCart(match.params.id, quantity))
        notifySuccess(`${quantity} item added to cart. `)
    }

    const increaseQuantity = () => {
        if (product.Stock <= quantity) return;
        const qty = quantity + 1;
        setQuantity(qty);
    };

    const decreaseQuantity = () => {
        if (1 >= quantity) return;
        const qty = quantity - 1;
        setQuantity(qty);
    };

    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true);
    };
    const { rating, comment } = ratingIn;
    const reviewSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(newReview(Number(rating), comment, match.params.id));
        setRatingIn({ rating: '', comment: '' })
        setOpen(false);
    };

    useEffect(() => {
        if (error) {
            notifyError(error);
            dispatch(clearError());
        }
        if (reviewError) {
            notifyError(reviewError);
            dispatch(clearError());
        }
        if (success) {
            dispatch({ type: NEW_REVIEW_RESET });
            notifySuccess('Thanks for your review.')
        }
        dispatch(getProductDetails(match.params.id))
    }, [dispatch, error, reviewError, match.params.id, success]);

    const setRInput = (e) => {
        setRatingIn({ ...ratingIn, [e.target.name]: e.target.value })
    }

    return (
        <Fragment>
            {loading ?
                (<Loading />) :
                (
                    <Fragment>
                        <MetaData title='product' />
                        <div className='productDetailPage'>
                            <div className='product__details'>
                                <div className="left">
                                    <img src={product.images && product.images[0].url} alt="product" />
                                </div>
                                <div className="right">
                                    <h1>{product.name}</h1>
                                    <div className='reviews'>
                                        {
                                            <Rating {...options} />
                                        }  ({product.numofReviews} Reviews)
                                    </div>
                                    <div className="price">${product.price}</div>
                                    <div className='product__quantity'>
                                        <button className='porduct__quan_btn' onClick={decreaseQuantity} >-</button>
                                        <input type="number" value={quantity} readOnly max={product.Stock} />
                                        <button className='porduct__quan_btn' onClick={increaseQuantity} >+</button>
                                    </div>
                                    <button disabled={quantity > product.Stock ? true : false} onClick={addToBasket} className={quantity > product.Stock ? "addCart disabled" : "addCart"}>Add To Cart</button>
                                    <h3>Product Detail</h3>
                                    <p>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit.Vero minima
                                        delectus nulla voluptates nesciunt quidem laudantium, quisquam
                                        voluptas facilis dicta in explicabo, laboriosam ipsam suscipit!
                                    </p>
                                    <div className='product__status'>
                                        <span className='status'>Status :</span>
                                        <span className='current__status'>{product.Stock >= 1 ? <span className='inStock'>InStock</span> : <span className='outOfStock'>Out Of Stock</span>}</span>
                                    </div>
                                    <button onClick={submitReviewToggle} className="btnPrimary">
                                        Submit Review
                                    </button>
                                </div>

                            </div>
                            <Dialog
                                open={open}
                                onClose={submitReviewToggle}>
                                <DialogTitle>Submit Review</DialogTitle>
                                <DialogContent className="submitDialog">
                                    <Rating
                                        onChange={setRInput}
                                        value={ratingIn.rating}
                                        size="large"
                                        name="rating"
                                    />

                                    <textarea
                                        className="submitDialogTextArea"
                                        cols="30"
                                        rows="5"
                                        value={ratingIn.comment}
                                        onChange={setRInput}
                                        name="comment"
                                    ></textarea>
                                </DialogContent>
                                <DialogActions className="dialogActions">
                                    <Button onClick={submitReviewToggle} color="secondary">
                                        Cancel
                                    </Button>
                                    <Button onClick={reviewSubmitHandler} color="primary">
                                        Submit
                                    </Button>
                                </DialogActions>
                            </Dialog>
                            <div className='productReviews'>
                                <h2>Reviews</h2>
                                <div className='productReviewContainer'>
                                    {product.reviews && product.reviews[0] ?
                                        (
                                            product.reviews && product.reviews.map((review) =>
                                            (<ProductReviews key={review._id} review={review} />
                                            ))
                                        ) : (<div>No Review yet.</div>)
                                    }
                                </div>
                            </div>
                        </div>
                    </Fragment>
                )}
            <ToastContainer />
        </Fragment>
    )
}
