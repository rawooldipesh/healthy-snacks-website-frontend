import React, { useContext, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import complaint_icon from '../Assets/complaint_icon.png'; // Import the complaint logo
import { ShopContext } from '../../Context/ShopContext';
import nav_dropdown from '../Assets/nav_dropdown.png';

const Navbar = () => {
    const [menu, setMenu] = useState("shop");
    const {getTotalCartItems} = useContext(ShopContext);
    const menuRef = useRef();

    const dropdown_toggle = (e) => {
        e.preventDefault();
        menuRef.current.classList.toggle('nav-menu-visible');
        e.target.classList.toggle('open');
    }

    return (
        <div className='navbar'>
            <div className="nav-logo">
                <img src={logo} alt="BHAKTI SNACKS LOGO" />
                <div>
                    <p className='nav-brand'>BHAKTI SNACKS</p>
                    <span className='nav-slogan'>The Satvik Diet !</span>
                </div>
            </div>
            <img className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropdown} alt="" />
            <ul ref={menuRef} className="nav-menu">
                <li onClick={() => setMenu("shop")}>
                    <Link style={{textDecoration:'none'}} to='/shop'>EXPLORE</Link> {menu === "shop" && <hr />}
                </li>
                <li onClick={() => setMenu("sweets")}>
                    <Link style={{textDecoration:'none'}} to='/sweets'>SWEETS</Link> {menu === "sweets" && <hr />}
                </li>
                <li onClick={() => setMenu("namkeen")}>
                    <Link style={{textDecoration:'none'}} to='/namkeen'>NAMKEEN</Link> {menu === "namkeen" && <hr />}
                </li>
                <li onClick={() => setMenu("khakras")}>
                    <Link style={{textDecoration:'none'}} to='/khakras'>KHAKRAS</Link> {menu === "khakras" && <hr />}
                </li>
            </ul>
            <div className="nav-login-cart">
                {localStorage.getItem('auth-token')
                ?<button onClick={() => {localStorage.removeItem('auth-token'); window.location.replace('/')}}>Logout</button>
                :<Link to='/Login'><button>Login</button></Link>}
                <Link to='/cart'><img src={cart_icon} alt="Cart Icon" /></Link>
                <div className="nav-cart-count">{getTotalCartItems()}</div>
            </div>
            {/* Complaint section */}
            <div className="nav-complaint">
                <Link to='/complaint'>
                    <img src={complaint_icon} alt="Complaint Icon" className="nav-complaint-icon" />
                </Link>
                {/* <Link className='nav-myorders' to="/my-orders">My Orders</Link> */}

            </div>
        </div>
    );
}

export default Navbar;
