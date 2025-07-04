import React from 'react'
import './AppDownload.css'
import { assets } from '../../assets/assets.js'


const AppDownload = () => {
  return (
    <div className='app-download' id='app-download'>
        <p>For better experience download <br />Tomato App</p>
        <div className="app-download-platforms">
            <img src={assets.app_store} alt="" />
            <img src={assets.play_store} alt="" />
        </div>
    </div>
  )
}

export default AppDownload