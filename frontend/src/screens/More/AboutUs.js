import React, { Fragment } from 'react';
import './AboutUs.css';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import image from '../../images/about-img.png'
import MetaData from '../../utils/title/MetaData';

const AboutUs = () => {
    return (
        <Fragment>
            <MetaData title='about'/>
            <div className='AboutPage'>
                <div className="about__cart">
                    <div className="about__image">
                        <img src={image} alt="" />
                    </div>

                    <div className="about__content">
                        <h3>best food in the country</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, sequi corrupti corporis quaerat voluptatem ipsam neque labore modi autem, saepe numquam quod reprehenderit rem? Tempora aut soluta odio corporis nihil!</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, nemo. Sit porro illo eos cumque deleniti iste alias, eum natus.</p>
                        <div className="aboutCart__icons">
                            <div className="icons">
                                <LocalShippingIcon />
                                <span>free delivery</span>
                            </div>
                            <div className="icons">
                                <AttachMoneyIcon />
                                <span>easy payments</span>
                            </div>
                            <div className="icons">
                                <HeadsetMicIcon />
                                <span>24/7 service</span>
                            </div>
                        </div>
                        <button className='learnMore__about'>learn more</button>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default AboutUs
