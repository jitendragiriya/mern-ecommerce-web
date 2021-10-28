import React, { useState, useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword, clearError } from '../../Redux/actions/userActions'
import { useHistory } from 'react-router-dom'
import Loading from '../../components/loaders/Loading'
import { notifyError, notifySuccess } from '../../utils/alerts/Alerts'
import formValidate from './validation/FormValidation'
import MetaData from '../../utils/title/MetaData'
import { ToastContainer } from 'react-toastify'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const UpdatePassword = ({ match }) => {
    const history = useHistory();
    const [passeye, setPasseye] = useState(false);
    const [inputs, setInputs] = useState({ password: '', confirmPassword: '' });
    const [err, setErr] = useState({})

    const { error, success, loading } = useSelector((state) => state.forgotPassword);
    const { password, confirmPassword } = inputs;
    const dispatch = useDispatch();
    const handleSubmit = e => {
        e.preventDefault();
        setErr(formValidate(inputs))
        dispatch(resetPassword(match.params.token, password, confirmPassword));
    }
    useEffect(() => {
        if (error) {
            notifyError('Link has been expired!')
            dispatch(clearError());
        }

        if (success) {
            notifySuccess("Password Updated Successfully");
            history.push("/login");
        }
    }, [dispatch,error, history, success])

    const onChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    }
    return (
        <Fragment>{
            loading ?
                (<Loading />) : (
                    <Fragment>
                        <MetaData title='reset-password'/>
                        <div className="allTypeFormPage">
                            <div className='mainFormContainer'>
                                <div className="form__header">
                                    <h2>Reset Password</h2>
                                </div>
                                <form className="formClass" method="POST" onSubmit={handleSubmit}>
                                    <div className="form__control">
                                        <label htmlFor="newPassword">New Password</label>
                                        <input type={passeye ? "text" : "password"} className="email" id='password' name="password" value={inputs.password} onChange={onChange} />
                                        <span onClick={() => setPasseye(!passeye)} >{passeye ? <VisibilityIcon /> : <VisibilityOffIcon />}</span>
                                        {err.password && <p className='validateError'>{err.password}</p>}
                                    </div>
                                    <div className="form__control">
                                        <label htmlFor="confirmPaassword">Confirm Password</label>
                                        <input type={passeye ? "text" : "password"} className="email" id='confirmPassword' name="confirmPassword" value={inputs.confirmPassword} onChange={onChange} />
                                        <span onClick={() => setPasseye(!passeye)} >{passeye ? <VisibilityIcon /> : <VisibilityOffIcon />}</span>
                                        {err.confirmPassword && <p className='validateError'>{err.confirmPassword}</p>}
                                    </div>
                                    <button className='formSubmitBtn'>Reset Password</button>
                                </form>
                            </div>
                        </div>
                    </Fragment>
                )
        }
            <ToastContainer/>
        </Fragment>
    )
}

export default UpdatePassword
