import {
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    ADMIN_DETAILS_REQUEST,
    ADMIN_DETAILS_SUCCESS,
    ADMIN_DETAILS_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_FAIL,
    UPDATE_PRODUCT_DETAILS_REQUEST,
    UPDATE_PRODUCT_DETAILS_SUCCESS,
    UPDATE_PRODUCT_DETAILS_FAIL,
    CLEAR_ERRORS
}
    from '../constants/productConstants';
import axios from 'axios'

// GET ALL THE PRODUCTS
export const getProduct = (keyword = "", currentPage = 1, price = [0, 250], category, ratings = 0) => async (dispatch) => {

    let url = `/api/product?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

    if (category) {
        url = `/api/product?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
    }
    try {
        dispatch({ type: ALL_PRODUCT_REQUEST });
        let { data } = await axios.get(url, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        dispatch({
            type: ALL_PRODUCT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: error.response.data.message
        });
    }
}

// GET ADMIN PRODUCTS
export const getAdminProduct = () => async (dispatch) => {
    const url = "/api/admin/products";
    try {
        dispatch({ type: ADMIN_DETAILS_REQUEST });
        let { data } = await axios.get(url, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        })
        dispatch({
            type: ADMIN_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ADMIN_DETAILS_FAIL,
            payload: error.response.data.message
        });
    }
}

export const getProductDetails = (id) => async (dispatch) => {
    const url = `/api/products/${id}`;
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST });
        const { data } = await axios.get(url)
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message
        });
    }
}

//newReview
export const newReview = (rating, comment, productId) => async (dispatch) => {
    const url = `/api/product/review`;
    try {
        dispatch({ type: NEW_REVIEW_REQUEST });
        const { data } = await axios.put(url, { rating, comment, productId }, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        })
        dispatch({
            type: NEW_REVIEW_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: NEW_REVIEW_FAIL,
            payload: error.response.data.message
        });
    }
}

//newProduct
export const newProductCreate = (myForm) => async (dispatch) => {
    const url = `/api/admin/product/new`;
    try {
        dispatch({ type: NEW_PRODUCT_REQUEST });
        const { data } = await axios.post(url, myForm, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        })
        dispatch({
            type: NEW_PRODUCT_SUCCESS,
            payload: data
        })
    } catch (error) {
        let err;
        if (error.response === undefined) {
            err = 'image should be less then 100kb'
        }
        else {
            err = error.response.data.message
        }
        dispatch({
            type: NEW_PRODUCT_FAIL,
            payload: err
        });
    }
}

//newProduct
export const updateProduct = (id, myForm) => async (dispatch) => {
    const url = `/api/admin/product/update/${id}`;
    try {
        dispatch({ type: UPDATE_PRODUCT_DETAILS_REQUEST });
        const { data } = await axios.put(url, myForm, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        })
        dispatch({
            type: UPDATE_PRODUCT_DETAILS_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        let err;
        if (error.response === undefined) {
            err = 'image should be less then 100kb'
        }
        else {
            err = error.response.data.message
        }
        dispatch({
            type: UPDATE_PRODUCT_DETAILS_FAIL,
            payload: err
        });
    }
}

//deleteProduct
export const adminProductDelete = (id) => async (dispatch) => {
    const url = `/api/admin/product/update/${id}`;
    try {
        dispatch({ type: DELETE_PRODUCT_REQUEST });
        const { data } = await axios.delete(url, {
            withCredentials: true
        })
        dispatch({
            type: DELETE_PRODUCT_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: DELETE_PRODUCT_FAIL,
            payload: error.response.data.message,
        });
    }
}

export const clearError = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    });
}