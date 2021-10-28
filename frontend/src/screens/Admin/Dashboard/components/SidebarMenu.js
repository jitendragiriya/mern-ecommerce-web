import React, { Fragment, useEffect, useState } from 'react'
import './SidebarMenu.css'
import { Link } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu'
import HomeIcon from '@mui/icons-material/Home'
// import SettingsIcon from '@mui/icons-material/Settings'
import PeopleIcon from '@mui/icons-material/People'
// import MessageIcon from '@mui/icons-material/Message'
import ProductIcon from '@mui/icons-material/AddBox'
// import HelpIcon from '@mui/icons-material/Help'
import ShopIcon from '@mui/icons-material/Shop';
import LockIcon from '@mui/icons-material/Lock'
import ExistToAppIcon from '@mui/icons-material/ExitToApp'
import { logout } from '../../../../Redux/actions/userActions'
import { notifySuccess } from '../../../../utils/alerts/Alerts'
import { useDispatch } from 'react-redux'

const SidebarMenu = () => {
    const [isActive, setActive] = useState("false");
    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(logout());
        notifySuccess('logout successfully.')
    }

    useEffect(() => {
        let link = document.querySelectorAll('.dnavLink')
        function activeLink() {
            link.forEach((item) =>
                item.classList.remove('hovered'));
            this.classList.add('hovered');
        }
        link.forEach((item) =>
            item.addEventListener('mouseover', activeLink))
    }, []);

    return (
        <Fragment>
            <div className={isActive ? 'adminPageSidebar' : 'adminPageSidebar active'}>
                <div className={isActive ? 'dashboardNavigation' : 'dashboardNavigation active'}>
                    <div className='dnavLink'>
                        <Link to='/dashboard'>
                            <span className="navOicon"><HomeIcon /></span>
                            <span className="navOtitle">Dashboard</span>
                        </Link>
                    </div>
                    <div className='dnavLink'>
                        <Link to='/admin/users'>
                            <span className="navOicon"><PeopleIcon /></span>
                            <span className="navOtitle">Customers</span>
                        </Link>
                    </div>
                    <div className='dnavLink'>
                        <Link to='/admin/orders'>
                            <span className="navOicon"><ShopIcon /></span>
                            <span className="navOtitle">New Orders</span>
                        </Link>
                    </div>
                    <div className='dnavLink'>
                        <Link to='/admin/products'>
                            <span className="navOicon"><ProductIcon /></span>
                            <span className="navOtitle">Products</span>
                        </Link>
                    </div>
                    <div className='dnavLink'>
                        <Link to='/me/password/update'>
                            <span className="navOicon"><LockIcon /></span>
                            <span className="navOtitle">Password</span>
                        </Link>
                    </div>
                    <div className='dnavLink'>
                        <Link to='/dashboard'>
                            <span className="navOicon"><ExistToAppIcon /></span>
                            <span className="navOtitle" onClick={handleLogout}>Sign Out</span>
                        </Link>
                    </div>
                </div>
                <div className='toggle' onClick={() => setActive(!isActive)}>
                    <MenuIcon />
                </div>
            </div>
        </Fragment>
    )
}

export default SidebarMenu
