import React, { Fragment, useEffect } from 'react'
import './UserDetails.css'
// import './UserProfile.css'
import { useSelector, useDispatch } from 'react-redux';
import { getUserDetails } from '../../../Redux/actions/userActions'
import { getUserOrders } from '../../../Redux/actions/orderActions'
import Loading from '../../../components/loaders/Loading'
import { ToastContainer } from 'react-toastify';
import Orders from './Orders';
import Profile from './Profile';
import MetaData from '../../../utils/title/MetaData';

const UserDetails = ({ match }) => {
    const userId = match.params.id;
    const dispatch = useDispatch();
    const { user, loading } = useSelector((state) => state.userDetail)
    const { orders } = useSelector((state) => state.userOrders)

    useEffect(() => {
        dispatch(getUserDetails(userId))
        dispatch(getUserOrders(userId))
    }, [dispatch, userId])

    return (
        <Fragment>
            {loading ?
                (<Loading />) :
                (<Fragment>
                    <MetaData title={`${user.name}`} />
                    <div className='UserDetails'>
                        <Profile user={user} />
                        <Orders orders={orders} />
                    </div>
                </Fragment>)
            }
            <ToastContainer />
        </Fragment>
    )
}

export default UserDetails
