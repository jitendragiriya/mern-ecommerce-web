import React, { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { forgotPassword, clearError } from '../../Redux/actions/userActions'
import { useHistory } from 'react-router-dom'
import { notifySuccess } from '../../utils/alerts/Alerts'
import { ToastContainer } from 'react-toastify'
import { FORGOT_PASSWORD_RESET } from '../../Redux/constants/userConstants'
import MetaData from '../../utils/title/MetaData'
import Loading from '../../components/loaders/Loading'

const ForgotPassword = () => {
    const [inputs, setInputs] = useState({ email: '' });
    const { loading, message, error } = useSelector(state => state.forgotPassword)
    const onChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    }
    const history = useHistory();
    const { email } = inputs;
    const dispatch = useDispatch();
    const handleSubmit = e => {
        e.preventDefault();
        dispatch(forgotPassword(email));
    }
    const success = email;
    useEffect(() => {
        if (message) {
            notifySuccess(message);
            dispatch({
                type: FORGOT_PASSWORD_RESET,
            });
            history.push(`/forgot/${success}`);
        }
        if (error) {
            dispatch(clearError());
        }
    }, [dispatch, history, message, success, error])
    return (
        <Fragment>{
            loading ?
                (<Loading />) :
                (<Fragment>
                    <MetaData title='forgot-password' />
                    <div className="allTypeFormPage">
                        <div className='mainFormContainer'>
                            <div className="form__header">
                                <h4>Forgot Password</h4>
                            </div>
                            <form className="formClass" method="POST" onSubmit={handleSubmit}>
                                <div className="form__control">
                                    <label htmlFor="email">Enter Email</label>
                                    <input type="text" className="email" id='email' name="email" value={inputs.email} onChange={onChange} />
                                    {error && <p className='validateError'>please enter a valid email.</p>}
                                </div>
                                <button className='formSubmitBtn'>Forgot Password</button>
                            </form>
                        </div>
                    </div>
                </Fragment>
                )
        }
            <ToastContainer />
        </Fragment>
    )
}

export default ForgotPassword
