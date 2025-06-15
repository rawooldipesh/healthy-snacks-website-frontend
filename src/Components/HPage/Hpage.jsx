import React from 'react'
import './Hpage.css'
import icon from '../Assets/icon1.png'
import arrow_icon from '../Assets/arrow.png'
import Hpage_icon from '../Assets/Hpage_main.png'

const Hpage = () => {
  return (
    <div className = 'Hpage'>
        <div className="Hpage-left">
        <h2>REVOLUTIONALIZING HEALTHY SNACKING !</h2>
        <div>
            <div className="icon">
                <p>TASTY</p>
                <img src={icon} alt="&heart" />
            </div>
            <p>HEALTHY SNACKS</p>
            <p>FOR EVERYONE</p>
        </div>
        <div className="Hpage-newproducts">
            <div>LADOO SPECIALS</div>
            <img src={arrow_icon} alt="" />
        </div>
        </div>
        <div className="Hpage-right">
        <img src={Hpage_icon} alt="" />
        </div>
    </div>
  )
}

export default Hpage