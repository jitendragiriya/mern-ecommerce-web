import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import './UserProfile.css'
import { useSelector } from 'react-redux'
import Loading from '../../../components/loaders/Loading'
import { ToastContainer } from 'react-toastify';
import MetaData from '../../../utils/title/MetaData'
import image from './img/profile.png';

const UserProfile = () => {
    const { user, loading } = useSelector(state => state.user)
    return (
        <Fragment>
            {loading ?
                (<Loading />) :
                (
                    <Fragment>
                        <MetaData title='profile' />
                        <div className='userProfile'>
                            <div className='profile__info'>
                                <div className='userProfile__image'>
                                    {
                                        user.avatar && user.avatar.url ?
                                            <img src={user.avatar.url} alt='img' /> :
                                            <img src={image} alt='profile' />
                                    }
                                </div>
                                <h2 className='UserName'>{user && user.name}</h2>
                                <div className='personal__info'>
                                    <span>Member Since</span><span>{user.date && user.date.slice(0, 10)}</span>
                                </div>
                                <Link to='/me/update'>
                                    <div className='btnPrimary'>Edit Profile</div></Link>
                            </div>
                            <div className='moreAboutUser'>
                                <Link to='/orders'>
                                    <div className='btnPrimary profileBtn'>My orders</div>
                                </Link>
                                <Link to='/me/password/update'>
                                    <div className='btnPrimary profileBtn'>Change Password</div>
                                </Link>
                            </div>
                        </div>
                    </Fragment>
                )
            }
            <ToastContainer />
        </Fragment>
    )
}

export default UserProfile
