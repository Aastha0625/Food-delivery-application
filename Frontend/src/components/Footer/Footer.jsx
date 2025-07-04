import React from 'react'
import './Footer.css'
import {assets} from '../../assets/assets.js'


const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className='footer-content'>
            <div className="footer-content-left">
                <img src={assets.logo} alt="" />
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati iure suscipit commodi ipsa velit consequatur, amet nam eum ipsam minima quisquam facilis sunt laborum! Nesciunt assumenda dolorem suscipit cupiditate tenetur!</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                </div>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>Get in touch</h2>
                <ul>
                    <li>918647215</li>
                    <li>conatct@tomato.com</li>
                </ul>
            </div>
        </div>
        <hr/>
        <p className='footer-copyright'>Copyright 2025 @ Tomato.com - All rights reserved.</p>
    </div>
  )
}

export default Footer