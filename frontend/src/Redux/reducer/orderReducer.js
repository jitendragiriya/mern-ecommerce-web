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
    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_RESET,
    DELETE_ORDER_FAIL,
    UPDATE_ORDER_DETAILS_REQUEST,
    UPDATE_ORDER_DETAILS_SUCCESS,
    UPDATE_ORDER_DETAILS_RESET,
    UPDATE_ORDER_DETAILS_FAIL,
    CLEAR_ERRORS
} from '../constants/orderConstants'

//=====================user reducer============================//

export const newOrderReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_ORDER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case CREATE_ORDER_SUCCESS:
            return {
                loading: false,
                order: action.payload,
            };

        case CREATE_ORDER_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state;
    }
}

export const myOrdersReducer = (state = { orders: []}, action) => {
    switch (action.type) {
        case MY_ORDERS_REQUEST:
            return {
                loading: true,
                orders:[],
            };

        case MY_ORDERS_SUCCESS:
            return {
                loading: false,
                orders: action.payload,
            };

        case MY_ORDERS_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
};

export const orderDetailsReducer = (state = { order: {} }, action) => {
    switch (action.type) {
        case ORDERS_DETAIL_REQUEST:
            return {
                loading: true,
            };

        case ORDERS_DETAIL_SUCCESS:
            return {
                loading: false,
                order: action.payload,
            };

        case ORDERS_DETAIL_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
};

//================================admin reducer==================================//
export const getAllOrders = (state = { orders: []}, action) => {
    switch (action.type) {
        case ALL_ORDERS_REQUEST:
            return {
                loading: true,
                orders: [],
            };

        case ALL_ORDERS_SUCCESS:
            return {
                loading: false,
                orders: action.payload,
            };

        case ALL_ORDERS_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
};

export const getAllOrdersDetails = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_ORDER_DETAILS_REQUEST:
        case DELETE_ORDER_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case UPDATE_ORDER_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
            };
        case DELETE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload,
            };

        case UPDATE_ORDER_DETAILS_FAIL:
        case DELETE_ORDER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case UPDATE_ORDER_DETAILS_RESET:
            return {
                loading: false,
                isUpdated: false,
            };
        case DELETE_ORDER_RESET:
            return {
                loading: false,
                isDeleted: false,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
};

export const userOrderDetails = (state = { orders: [] }, action) => {
    switch (action.type) {
        case GET_USER_ORDERS_REQUEST:
            return {
                loading: true,
                orders: [],
            };

        case GET_USER_ORDERS_SUCCESS:
            return {
                loading: false,
                orders: action.payload,
            };

        case GET_USER_ORDERS_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
};