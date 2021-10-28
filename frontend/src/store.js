import { createStore, combineReducers, applyMiddleware } from 'redux'

import thunk from 'redux-thunk'

import { composeWithDevTools } from 'redux-devtools-extension'
import {  adminUpdateProduct, newProductReducer, newReviewReducer, productDetailsReducer, productReducer } from './Redux/reducer/productReducer';

import { allUsersReducer, forgotPasswordReducer, profileReducer, userDetailsReducer, userReducer } from './Redux/reducer/userReducer'
import { cartReducer } from './Redux/reducer/cartReducer'
import { getAllOrders, getAllOrdersDetails, myOrdersReducer, newOrderReducer, orderDetailsReducer, userOrderDetails } from './Redux/reducer/orderReducer'
const reducer = combineReducers({
    products: productReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    newReviews: newReviewReducer,
    newProduct: newProductReducer,
    order:getAllOrdersDetails,
    allOrders: getAllOrders,
    allUsers: allUsersReducer,
    updateProduct:adminUpdateProduct,
    userDetail:userDetailsReducer,
    userOrders:userOrderDetails,
});

let initialstate = {
    cart: {
        cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
        shippingInfo: localStorage.getItem("shippingInfo")
            ? JSON.parse(localStorage.getItem("shippingInfo"))
            : {},
    },
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialstate,
    composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
