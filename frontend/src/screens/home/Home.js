import React, { Fragment, useEffect, useState } from 'react'
import './Home.css'
import Product from './components/dishes/Dishes'
import MetaData from '../../utils/title/MetaData'
import { clearError, getProduct } from '../../Redux/actions/productAction'
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../../components/loaders/Loading'
import Pagination from "react-js-pagination";
import SortIcon from '@mui/icons-material/Sort'
import { Slider } from '@mui/material'
import { ToastContainer } from 'react-toastify';
import Review from './components/reviews/Review'

const categories = [
    "Laptop",
    "Footwear",
    "Electronics",
    "ram",
    "syam",
    "Camera",
    "rohan",
];

export default function Home({ match }) {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 250]);
    const [category, setCategory] = useState("");
    const [ratings, setRatings] = useState(0);
    const [open, setOpen] = useState(false);
    const { loading, error, products, resultPerPage, productsCount, filteredProductsCount } = useSelector((state) => state.products)

    const setActivePageNO = (e) => {
        setCurrentPage(e);
    }
    const keyword = match.params.keyword;

    useEffect(() => {
        dispatch(getProduct(keyword, currentPage, price, category, ratings))

        if (error) {
            dispatch(clearError());
        }

    }, [dispatch, keyword, error, currentPage, price, category, ratings]);

    return (
        <Fragment>
            {
                loading ?
                    (<Loading />) :
                    (
                        <Fragment>
                            <MetaData title="home page" />
                            <div className='home'>
                                <div className='dishes'>
                                    <div className='sortProducts'>
                                        <span className='sortBtn' onClick={() => setOpen(!open)}>
                                            <SortIcon />SortBy
                                        </span>
                                        <div className={open ? 'selectOptionsBox active' : 'selectOptionsBox'}>
                                            <div className='sortByPrice'>
                                                <span className='priceBtn'>Price</span>
                                                <div>
                                                    <Slider
                                                        value={price}
                                                        onChange={(event, newPrice, selectOptionsBox) => {
                                                            setPrice(newPrice);
                                                        }}
                                                        valueLabelDisplay="auto"
                                                        aria-labelledby="range-slider"
                                                        min={0}
                                                        max={25}
                                                    />
                                                </div>
                                            </div>

                                            <div className='sortByCate'>
                                                <span className='cateBtn'>Category</span>
                                                <div className=''>
                                                    <ul className="categoryBox">
                                                        {categories.map((category) => (
                                                            <li
                                                                className="category-link"
                                                                key={category}
                                                                onClick={() => setCategory(category)}
                                                            >
                                                                {category}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className='sortByRating'>
                                                <span className='RatingBtn'>Rating</span>
                                                <div className=''>
                                                    <fieldset>
                                                        <Slider
                                                            value={ratings}
                                                            onChange={(e, newRating) => {
                                                                setRatings(newRating);
                                                            }}
                                                            aria-labelledby="continuous-slider"
                                                            valueLabelDisplay="auto"
                                                            min={0}
                                                            max={5}
                                                        />
                                                    </fieldset>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="heading__subheading">
                                        <h3 className="sub__heading"> Our Dishes </h3>
                                        <h1 className="heading"> popular dishes </h1>
                                    </div>

                                    {loading ? <Loading /> : <>
                                        <div className='product__center'>
                                            {products && products.map(product => (
                                                <Product product={product} key={product._id} />
                                            ))}
                                        </div>
                                        {(resultPerPage < productsCount && resultPerPage < filteredProductsCount) &&
                                            < div className='productPagination'>
                                                <Pagination
                                                    onChange={setActivePageNO}
                                                    activePage={currentPage}
                                                    itemsCountPerPage={resultPerPage}
                                                    totalItemsCount={productsCount}
                                                    nextPageText="Next"
                                                    prevPageText="Prev"
                                                    firstPageText="1st"
                                                    lastPageText="Last"
                                                    itemClass="page-item"
                                                    linkClass="page-link"
                                                    activeClass="pageItemActive"
                                                    activeLinkClass="pageLinkActive"
                                                    pageRangeDisplayed={1}
                                                />
                                            </div>}
                                    </>}
                                </div>
                                <div className='customer__reviews'>
                                    <div className="heading__subheading">
                                        <h3 className="sub__heading"> Reviews </h3>
                                        <h1 className="heading"> why choose us? </h1>
                                    </div>
                                </div>
                                <Review product={products} />
                            </div>
                            <ToastContainer />
                        </Fragment>
                    )

            }
        </Fragment >
    )
}
