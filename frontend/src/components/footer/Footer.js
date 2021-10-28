import React, { Fragment } from 'react'
import './Footer.css'
import { Link } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import PinterestIcon from '@mui/icons-material/Pinterest';

export default function Footer() {
    return (
        <Fragment>
            <div className='footer'>
                <div className='links'>
                    <div className="col">
                        <h4>INFORMATION</h4>
                        <Link to='#'><span>About us</span></Link>
                        <Link to='#'><span>Contact Us</span></Link>
                        <Link to='#'><span>Term & Conditions</span></Link>
                        <Link to='#'><span>Shipping Guide</span></Link>
                    </div>
                    <div className="col">
                        <h4>USEFUL LINK</h4>
                        <Link to='#'><span>Online Store</span></Link>
                        <Link to='#'><span>Customer Services</span></Link>
                        <Link to='#'><span>Promotion</span></Link>
                        <Link to='#'><span>Top Brands</span></Link>
                    </div>
                    <div className="social__Icons">
                        <span><FacebookIcon /></span>
                        <span><InstagramIcon /></span>
                        <span><GitHubIcon /></span>
                        <span><TwitterIcon /></span>
                        <span><PinterestIcon /></span>
                    </div>
                </div>
                <div className="credit"><p> copyright @ 2021 by <span>jitendra giriya</span></p> </div>
            </div>
        </Fragment>
    )
}
