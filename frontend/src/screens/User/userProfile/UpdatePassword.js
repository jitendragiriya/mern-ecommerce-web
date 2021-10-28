import React, { useState, useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearError, updatePassword } from "../../../Redux/actions/userActions";
import { useHistory } from 'react-router-dom'
import { UPDATE_PASSWORD_RESET } from "../../../Redux/constants/userConstants";
import { notifySuccess } from '../../../utils/alerts/Alerts'
import { ToastContainer } from 'react-toastify';
import Loading from '../../../components/loaders/Loading';
import MetaData from '../../../utils/title/MetaData';
import formValidate from './validation/FormValidation';

const UpdatePassword = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [err, setErr] = useState();
    const [inputs, setInputs] = useState({ oldPassword: '', password: '', confirmPassword: '' });

    const { oldPassword, password, confirmPassword } = inputs;
    const { error, isUpdated, loading } = useSelector((state) => state.profile);
    const handleSubmit = e => {
        e.preventDefault();
        setErr(formValidate(inputs));
        dispatch(updatePassword(oldPassword, password, confirmPassword));
    }
    useEffect(() => {
        if (isUpdated) {
            notifySuccess("Password Updated Successfully");
            dispatch({
                type: UPDATE_PASSWORD_RESET,
            });
            history.push("/account");
        }
        if (error) {
            dispatch(clearError());
        }
    }, [dispatch, error, history, isUpdated]);

    const onChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    }
    return (
        <Fragment>{loading ?
            (<Loading />) : (
                <Fragment>
                    <MetaData title='change password' />
                    <div className="allTypeFormPage">
                        <div className='mainFormContainer'>
                            <div className="form__header">
                                <h2>Change Password</h2>
                            </div>
                            <form className="formClass" method="POST" onSubmit={handleSubmit}>
                                <div className="form__control">
                                    <label htmlFor="oldPass">old password</label>
                                    <input type="text" className="oldPassword" id='oldPass' name="oldPassword" value={inputs.oldPassword} onChange={onChange} />

                                </div>
                                <div className="form__control">
                                    <label htmlFor="password">New Password</label>
                                    <input type="text" className="password" id='password' name="password" value={inputs.password} onChange={onChange} />
                                    {err && <p className='validateError'>{err.password}</p>}
                                </div>
                                <div className="form__control">
                                    <label htmlFor="confirmPaassword">Confirm Password</label>
                                    <input type="text" className="confirmPassword" id='confirmPaassword' name="confirmPassword" value={inputs.confirmPassword} onChange={onChange} />
                                    {err && <p className='validateError'>{err.confirmPassword}</p>}
                                </div>
                                <button className='formSubmitBtn'>Change password</button>
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

export default UpdatePassword
