import React from 'react';
import './Footer.css';
import footer_logo from '../Assets/logo_big.png';
import instragram_icon from '../Assets/instagram_icon.png';
import pintester_icon from '../Assets/pintester_icon.png';
import whatsapp_icon from '../Assets/whatsapp_icon.png';

const Footer = () => {
  return (
    <div className='footer'>
        <div className="footer-logo">
            <img src={footer_logo} alt="Bhakti Snacks Logo" />
            <p>BHAKTI SNACKS</p>
        </div>
        
        <ul className="footer-links">
            <li>Company</li>
            <li>Products</li>
            <li>About</li>
            <li>Contacts</li>
        </ul>
        
        <div className="footer-social-icon">
            <div className="footer-icons-container">
                <img src={instragram_icon} alt="Instagram Icon" />
            </div>
            <div className="footer-icons-container">
                <img src={pintester_icon} alt="Pinterest Icon" />
            </div>
            <div className="footer-icons-container">
                <a href="https://wa.me/918928984857" target="_blank" rel="noopener noreferrer">
                    <img src={whatsapp_icon} alt="WhatsApp Icon" />
                </a>
            </div>
        </div>
        
        <div className="footer-copyright">
            <hr/>
            <p>Copyright @2024 - All Rights Reserved.</p>
        </div>
    </div>
  );
};

export default Footer;
