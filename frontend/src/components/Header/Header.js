import React, { useState, useEffect, Fragment } from 'react'
import './Header.css'
import { Link } from "react-router-dom";
import { setTheme } from '../../utils/theme/Theme';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux'
import { logout, clearError } from '../../Redux/actions/userActions'
import SearchBar from '../search/SearchBar';
import { notifySuccess } from '../../utils/alerts/Alerts'

export default function Header() {
    const dispatch = useDispatch();
    const [hamburger, setHamburger] = useState(true)
    const showSidebar = () => setHamburger(!hamburger)
    const { user } = useSelector(state => state.user)
    const [togClass, setTogClass] = useState('light');
    let theme = localStorage.getItem('theme');

    const handleOnClick = () => {
        if (theme === 'theme-dark') {
            setTheme('theme-light');
            setTogClass('light')
        } else {
            setTheme('theme-dark');
            setTogClass('dark')
        }
    }

    const { isAuthenticated, error } = useSelector(state => state.user)

    const handleLogout = () => {
        dispatch(logout());
        notifySuccess('logout successfully.')
    }

    const { cartItems } = useSelector(state => state.cart)

    useEffect(() => {
        if (theme === 'theme-dark') {
            setTogClass('dark')
        } else if (theme === 'theme-light') {
            setTogClass('light')
        }

        let serIcon = document.querySelector('.productSearch')
        let serbox = document.querySelector('.pdsearchBox')
        serIcon.addEventListener("click", () => {
            serbox.classList.toggle('active')
        })
        if (error) {
            dispatch(clearError());
        }
    }, [dispatch, theme, error])

    return (
        <Fragment>
            <div className='header d__flex'>
                <Link to="/">
                    <div className="header__logo d__flex"><RestaurantIcon />MyShop</div>
                </Link>
                <div className={hamburger ? "nav__list d__flex" : " nav__list d__flex hamburger__open"}>
                    <Link to='/'>
                        <div className="nav__option">Home</div>
                    </Link>
                    <Link to='/orders'>
                        <div className="nav__option">Orders</div>
                    </Link>
                    <Link to='/about'>
                        <div className="nav__option">AboutUs</div>
                    </Link>
                    {isAuthenticated ? <>
                        <Link to=''>
                            <div className="nav__option" onClick={handleLogout}>Logout</div>
                        </Link>
                    </> :
                        <>
                            <Link to='/signup'>
                                <div className="nav__option">Signup</div>
                            </Link>
                            <Link to='/login'>
                                <div className="nav__option">Login</div>
                            </Link>
                        </>
                    }

                    {/* on mobile view */}
                    <Link to='/account'>
                        <div className="header__option userAccount not__for__mobile">
                            {user && user.avatar && user.avatar.url ? <img className='headerProfile' src={user.avatar.url} alt='profile' /> : < AccountCircleIcon />}
                        </div>
                    </Link>
                    <Link to='/cart'>
                        <div className="header__option nav__option for__mobile">
                            <ShoppingCartIcon className="shoppingCartIcon" />
                            <span className="cart__count">{cartItems?.length}</span>
                        </div>
                    </Link>
                </div>

                {/* on desktop view */}
                <div className="header__Icons d__flex">
                    <div className="productSearch"><SearchIcon />

                    </div>
                    <Link to='/account'>
                        <div className="header__option userAccount not__for__mobile">
                            {user && user.avatar && user.avatar.url ? <img className='headerProfile' src={user.avatar.url} alt='profile' /> : < AccountCircleIcon />}
                        </div>
                    </Link>
                    <Link to='/cart'>
                        <div className="header__option not__for__mobile">
                            <ShoppingCartIcon className="shoppingCartIcon" />
                            <span className="cart__count">{cartItems?.length}</span>
                        </div>
                    </Link>
                    <div className="header__option hamburger" onClick={showSidebar}>
                        <MenuIcon />
                    </div>
                </div>
                <SearchBar />
            </div >
        </Fragment>
    )
}
