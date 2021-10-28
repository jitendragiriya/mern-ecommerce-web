import React, { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateProfile, loggedInUser, clearError } from '../../../Redux/actions/userActions'
import Loading from '../../../components/loaders/Loading'
import { notifySuccess, notifyError } from '../../../utils/alerts/Alerts'
import { UPDATE_PROFILE_RESET } from "../../../Redux/constants/userConstants";
import { ToastContainer } from 'react-toastify';
import MetaData from '../../../utils/title/MetaData'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const UpdateProfile = ({ history }) => {
    const dispatch = useDispatch();
    const { user, loading } = useSelector(state => state.user)
    const { error, isUpdated, loading: updateLoading } = useSelector((state) => state.profile);
    const [inputs, setInputs] = useState({ name: user.name, email: user.email });

    const [avatar, setAvatar] = useState('/profile.png');
    const [avatarPreview, setAvatarPreview] = useState(user.avatar.url);


    const { name, email } = inputs;
    const handleSubmit = e => {
        e.preventDefault();
        dispatch(updateProfile(name, email, avatar))
    }


    const updateProfileDataChange = (e) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
            }
        };

        reader.readAsDataURL(e.target.files[0]);
    };


    useEffect(() => {
        if (error) {
            notifyError(error)
            notifyError("please Enter a valid email or password.");
            dispatch(clearError());
        }

        if (isUpdated) {
            notifySuccess("Profile Updated Successfully");
            dispatch(loggedInUser());
            dispatch({
                type: UPDATE_PROFILE_RESET,
            });
            history.push('/account')
        }
    }, [dispatch, error, isUpdated, history])
    const onChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    }
    return (
        <Fragment>
            {
                loading || updateLoading ? (<Loading />) : (
                    <Fragment>
                        <MetaData title='updata me' />
                        <div className="allTypeFormPage">
                            <div className='mainFormContainer'>
                                <div className="form__header">
                                    <h2>Update Profile</h2>
                                </div>
                                <form className="formClass" onSubmit={handleSubmit}>
                                    <div className="form__control">
                                        <label htmlFor="name">name</label>
                                        <input type="text" className="name" id='name' name="name" value={inputs.name || user.name} onChange={onChange} />
                                    </div>
                                    <div className="form__control">
                                        <label htmlFor="email">Email</label>
                                        <input type="text" className="email" id='email' name="email" value={inputs.email || user.email} onChange={onChange} />
                                    </div>

                                    <div className="form__control">
                                    <img className='avtarPre' src={avatarPreview ? avatarPreview : <AccountCircleIcon/>} alt="img" />
                                        <label htmlFor="avatar">Profile Pic.</label>
                                        {<p className='validateError img'>{'*image should be < 100kb'}</p>}
                                        <input type="file" className="avatar" id='avatar'
                                            onChange={updateProfileDataChange} name="avatar" />
                                    </div>
                                    <button className='formSubmitBtn'>Update Profile</button>
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

export default UpdateProfile
