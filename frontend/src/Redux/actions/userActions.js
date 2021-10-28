import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    LOGGED_IN_USER_REQUEST,
    LOGGED_IN_USER_SUCCESS,
    LOGGED_IN_USER_FAIL,
    USER_LOGOUT_SUCCESS,
    USER_LOGOUT_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    GET_USER_DETAILS_REQUEST,
    GET_USER_DETAILS_SUCCESS,
    GET_USER_DETAILS_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    CLEAR_ERRORS
} from '../constants/userConstants'

import axios from 'axios';

//=============================user actions controller=========================================//
// LOGIN USER
export const login = (email, password) => async (dispatch) => {
    const url = "/api/login";
    try {
        dispatch({ type: USER_LOGIN_REQUEST });
        const { data } = await axios.post(url,
            { email, password }, {
            headers: {
                "Accept": 'application/json',
                "Content-Type": "application/json"
            },
            withCredentials: true
        })
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data.user
        })
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response.data.message
        });
    }
}

// REGISTER USER

export const register = (name, email, password, confirmPassword, avatar) => async (dispatch) => {
    const url = "/api/register";
    try {
        dispatch({ type: USER_REGISTER_REQUEST });
        const { data } = await axios.post(url,
            { name, email, password, confirmPassword, avatar }, {
            headers: {
                "Accept": 'application/json',
                "Content-Type": "application/json"
            },
            withCredentials: true
        })
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data.user
        })
    } catch (error) {
        let err;
        if (error.response === undefined) {
            err = undefined
        }
        else {
            err = error.response.data.message
        }
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: err
        });
    }
}

// LOGGEDD_IN USER

export const loggedInUser = () => async (dispatch) => {
    const url = "/api/me";
    try {
        dispatch({ type: LOGGED_IN_USER_REQUEST });
        const { data } = await axios.get(url, {
            headers: {
                "Accept": 'application/json',
                "Content-Type": "application/json"
            },
            withCredentials: true
        })
        dispatch({
            type: LOGGED_IN_USER_SUCCESS,
            payload: data.user
        })
    } catch (error) {
        dispatch({
            type: LOGGED_IN_USER_FAIL,
            payload: error.response.data.message
        });
    }
}

// LOGOUT USER

export const logout = () => async (dispatch) => {
    const url = "/api/logout";
    try {
        await axios.get(url, {
            headers: {
                "Accept": 'application/json',
                "Content-Type": "application/json"
            },
            withCredentials: true
        })
        dispatch({
            type: USER_LOGOUT_SUCCESS,
        })
    } catch (error) {
        dispatch({
            type: USER_LOGOUT_FAIL,
            payload: error.response.data.message
        });
    }
}


// UPDATE FROMFILE USER

export const updateProfile = (name, email, avatar) => async (dispatch) => {
    const url = "/api/me/update";
    try {
        dispatch({ type: UPDATE_PROFILE_REQUEST });
        const { data } = await axios.put(url,
            { name, email, avatar }, {
            headers: {
                "Accept": 'application/json',
                "Content-Type": "application/json"
            },
            withCredentials: true
        })
        dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        let err;
        if (error.response === undefined) {
            err = undefined
        }
        else {
            err = error.response.data.message
        }
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: err
        });
    }
}

// UPDATE PASSWORD --user

export const updatePassword = (oldPassword, newPassword, confirmPassword) => async (dispatch) => {
    const url = "/api/password/update";
    try {
        dispatch({ type: UPDATE_PASSWORD_REQUEST });
        const { data } = await axios.put(url,
            { oldPassword, newPassword, confirmPassword }, {
            headers: {
                "Accept": 'application/json',
                "Content-Type": "application/json"
            },
            withCredentials: true
        })
        dispatch({
            type: UPDATE_PASSWORD_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: error.response.data.message
        });
    }
}

// FORGOT PASSWORD --user

export const forgotPassword = (email) => async (dispatch) => {
    const url = "/api/password/forgot";
    try {
        dispatch({ type: FORGOT_PASSWORD_REQUEST });
        const { data } = await axios.post(url,
            { email }, {
            headers: {
                "Accept": 'application/json',
                "Content-Type": "application/json"
            },
            withCredentials: true
        })
        dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
            payload: data.message
        })
    } catch (error) {
        dispatch({
            type: FORGOT_PASSWORD_FAIL,
            payload: error.response.data.message
        });
    }
}

// RESET PASSWORD --user

export const resetPassword = (token, password, confirmPassword) => async (dispatch) => {
    const url = `/api/password/reset/${token}`;
    try {
        dispatch({ type: RESET_PASSWORD_REQUEST });
        const { data } = await axios.put(url,
            { password, confirmPassword }, {
            headers: {
                "Accept": 'application/json',
                "Content-Type": "application/json"
            },
            withCredentials: true
        })
        dispatch({
            type: RESET_PASSWORD_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: RESET_PASSWORD_FAIL,
            payload: error.response.data.message
        });
    }
}

//===============================admin action controller=============================//

// get All Users
export const getAllUsers = () => async (dispatch) => {
    const url = `/api/admin/users`;
    try {
        dispatch({ type: ALL_USERS_REQUEST });
        const { data } = await axios.get(url, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        });

        dispatch({
            type: ALL_USERS_SUCCESS,
            payload: data.users
        });
    } catch (error) {
        dispatch({
            type: ALL_USERS_FAIL,
            payload: error.response.data.message
        });
    }
};

// get Users details
export const getUserDetails = (id) => async (dispatch) => {
    const url = `/api/admin/user/${id}`;
    try {
        dispatch({ type: GET_USER_DETAILS_REQUEST });
        const { data } = await axios.get(url, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        });

        dispatch({
            type: GET_USER_DETAILS_SUCCESS,
            payload: data.user
        });
    } catch (error) {
        dispatch({
            type: GET_USER_DETAILS_FAIL,
            payload: error.response.data.message
        });
    }
};

// update user 
export const updateUserDetails = (id, role) => async (dispatch) => {
    const url = `/api/admin/user/${id}`;
    try {
        dispatch({ type: UPDATE_USER_REQUEST });
        const { data } = await axios.put(url,
            { role }, {
            headers: {
                "Accept": 'application/json',
                "Content-Type": "application/json"
            },
            withCredentials: true
        })
        dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: UPDATE_USER_FAIL,
            payload: error.response.data.message
        });
    }
}

// delete user  
export const deleteUser = (id) => async (dispatch) => {
    const url = `/api/admin/user/${id}`;
    try {
        dispatch({ type: DELETE_USER_REQUEST });
        const { data } = await axios.delete(url, {
            headers: {
                "Accept": 'application/json',
                "Content-Type": "application/json"
            },
            withCredentials: true
        })
        dispatch({
            type: DELETE_USER_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: DELETE_USER_FAIL,
            payload: error.response.data.message
        });
    }
}

// ERRORS
export const clearError = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    });
}