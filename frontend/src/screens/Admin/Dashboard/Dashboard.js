import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Dashboard.css'
// import VisibilityIcon from '@mui/icons-material/Visibility'
// import ChatIcon from '@mui/icons-material/Chat'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import EarningIcon from '@mui/icons-material/Money'
import { useSelector, useDispatch } from 'react-redux';
import { getAdminProduct } from '../../../Redux/actions/productAction'
import { getAllOrders } from '../../../Redux/actions/orderActions'
import { getAllUsers } from '../../../Redux/actions/userActions'
import RecentOrders from './components/RecentOrders'
import RecentCustomerce from './components/RecentCustomerce'

import SidebarMenu from './components/SidebarMenu'
import Graphs from './components/Graphs'
import Loading from '../../../components/loaders/Loading'
import MetaData from '../../../utils/title/MetaData'

const Dashboard = () => {
    const dispatch = useDispatch();
    const { loading, products } = useSelector((state) => state.products)

    const { orders } = useSelector((state) => state.allOrders);

    const { users } = useSelector((state) => state.allUsers);
    let totalAmount = 0;

    orders.forEach((order) => {
        totalAmount += order.totalPrice;
    });

    useEffect(() => {
        dispatch(getAdminProduct())
        dispatch(getAllOrders());
        dispatch(getAllUsers());
    }, [dispatch]);

    return (
        <Fragment>
            {loading ? <Loading /> :
                (<Fragment>
                    <MetaData title='Dashboard' />
                    <SidebarMenu />
                    <div className='adminDashboard'>
                        <div className='main'>
                            <div className='acardBox'>
                                <Link to='/admin/orders'>
                                    <div className='adminPCards'>
                                        <div>
                                            <div className='numofViews'>{orders.length}</div>
                                            <div className='acardName'>Sales</div>
                                        </div>
                                        <div className='aIconBox'>
                                            <ShoppingCartIcon />
                                        </div>
                                    </div>
                                </Link>
                                <div className='adminPCards'>
                                    <div>
                                        <div className='numofViews'>₹{totalAmount.toFixed(2)}</div>
                                        <div className='acardName'>Earnings</div>
                                    </div>
                                    <div className='aIconBox'>
                                        <EarningIcon />
                                    </div>
                                </div>
                            </div>

                            {orders && products ? <Graphs orders={orders} products={products} /> : ''}
                            <div className='adODetials'>
                                <RecentOrders orders={orders} />
                                <RecentCustomerce users={users} />
                            </div>
                        </div>
                    </div>
                </Fragment>
                )}
        </Fragment >
    )
}

export default Dashboard
