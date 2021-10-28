import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    MY_ORDERS_REQUEST,
    MY_ORDERS_SUCCESS,
    MY_ORDERS_FAIL,
    ORDERS_DETAIL_REQUEST,
    ORDERS_DETAIL_SUCCESS,
    ORDERS_DETAIL_FAIL,
    ALL_ORDERS_REQUEST,
    ALL_ORDERS_SUCCESS,
    ALL_ORDERS_FAIL,
    GET_USER_ORDERS_REQUEST,
    GET_USER_ORDERS_SUCCESS,
    GET_USER_ORDERS_FAIL,
    UPDATE_ORDER_DETAILS_REQUEST,
    UPDATE_ORDER_DETAILS_SUCCESS,
    UPDATE_ORDER_DETAILS_FAIL,
    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_FAIL,
    CLEAR_ERRORS
} from '../constants/orderConstants';
import axios from 'axios';


//==============================User actions=========================//

// my orders
export const myOrders = () => async (dispatch) => {
    const url = '/api/orders/me'
    try {
        dispatch({ type: MY_ORDERS_REQUEST });
        const { data } = await axios.get(url, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        })
        dispatch({
            type: MY_ORDERS_SUCCESS,
            payload: data.orders
        })
    } catch (error) {
        dispatch({
            type: MY_ORDERS_FAIL,
            payload: error.response.data.message,
        })
    }
}

// my order details
export const getOrderDetails = (id) => async (dispatch) => {
    const url = `/api/order/${id}`
    try {
        dispatch({ type: ORDERS_DETAIL_REQUEST });
        const { data } = await axios.get(url, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        })
        dispatch({
            type: ORDERS_DETAIL_SUCCESS,
            payload: data.order
        })
    } catch (error) {
        dispatch({
            type: ORDERS_DETAIL_FAIL,
            payload: error.response.data.message,
        })
    }
}

// create new order 
export const createOrder = (order) => async (dispatch) => {
    const url = '/api/order/new'
    try {
        dispatch({ type: CREATE_ORDER_REQUEST });
        const { data } = await axios.post(url,
            order, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        })
        dispatch({
            type: CREATE_ORDER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: error.response.data.message,
        })
    }
}

//================================Admin actions=============================//

// Get All Orders 
export const getAllOrders = () => async (dispatch) => {
    const url = `/api/admin/orders`
    try {
        dispatch({ type: ALL_ORDERS_REQUEST });

        const { data } = await axios.get(url, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        });
        dispatch({
            type: ALL_ORDERS_SUCCESS,
            payload: data.orders
        });
    } catch (error) {
        dispatch({
            type: ALL_ORDERS_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Get user Orders 
export const getUserOrders = (id) => async (dispatch) => {
    const url = `/api/admin/u/orders/${id}`
    try {
        dispatch({ type: GET_USER_ORDERS_REQUEST });

        const { data } = await axios.get(url, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        });
        dispatch({
            type: GET_USER_ORDERS_SUCCESS,
            payload: data.orders
        });
    } catch (error) {
        dispatch({
            type: GET_USER_ORDERS_FAIL,
            payload: error.response.data.message,
        });
    }
};


// Update Order
export const updateOrder = (id, status) => async (dispatch) => {
    const url = `/api/admin/order/${id}`
    try {
        dispatch({ type: UPDATE_ORDER_DETAILS_REQUEST });
        const { data } = await axios.put(url,
            { status }, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true
        }
        );

        dispatch({
            type: UPDATE_ORDER_DETAILS_SUCCESS,
            payload: data.success
        });
    } catch (error) {
        dispatch({
            type: UPDATE_ORDER_DETAILS_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Delete Order
export const deleteOrder = (id) => async (dispatch) => {
    const url = `/api/admin/order/${id}`
    try {
        dispatch({ type: DELETE_ORDER_REQUEST });

        const { data } = await axios.delete(url,
            {
                withCredentials: true
            });

        dispatch({
            type: DELETE_ORDER_SUCCESS,
            payload: data.success
        });
    } catch (error) {
        dispatch({
            type: DELETE_ORDER_FAIL,
            payload: error.response.data.message,
        });
    }
};


// clearing error
export const clearError = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    });
}