import React, { Fragment } from 'react'
import image from './img/profile.png'
import { Link } from 'react-router-dom'

const Profile = ({ user }) => {
    return (
        <Fragment>
            <div className='userProfile'>
                <div className='profile__info'>
                    <div className='userProfile__image'>{
                        user.avatar && user.avatar.url ?
                            <img src={user.avatar.url} alt='img' /> :
                            <img src={image} alt='img' />
                    }
                    </div>
                    <h2 className='UserName'>{user && user.name}</h2>
                    <h3 className='userEmail'>{user && user.email}</h3>
                    <div className='personal__info'>
                        <span>Member Since</span><span>{user.date && user.date.slice(0, 10)}</span>
                    </div>
                    <Link to='/me/update'>
                        <div className='btnPrimary'>Edit Profile</div></Link>
                </div>
            </div>
        </Fragment>
    )
}

export default Profile
