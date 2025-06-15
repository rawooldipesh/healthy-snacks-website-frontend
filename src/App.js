import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import LoginSignup from './Pages/LoginSignup';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import Footer from './Components/Footer/Footer';
import sweets_banner from './Components/Assets/banner_sweets.png';
import namkeen_banner from './Components/Assets/banner_namkeen.png';
import khakras_banner from './Components/Assets/banner_khakras.png';
import ComplaintPage from './Components/Complaint/ComplaintPage';
// import MyOrders from './Components/MyOrders/MyOrders';

// Create a separate component to handle redirection on reload
function RedirectHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the page was reloaded
    if (localStorage.getItem('redirected') === 'true') {
      alert('You will be redirected to the homepage');
      localStorage.removeItem('redirected'); // Reset the flag
      navigate('/'); // Redirect to the homepage
    }

    // Listen for the reload event
    window.onbeforeunload = function () {
      localStorage.setItem('redirected', 'true'); // Set the flag
    };

    // Cleanup on component unmount
    return () => {
      window.onbeforeunload = null; // Remove the event listener
    };
  }, [navigate]);

  return null; // This component doesn't render any UI
}

function App() {
  return (
    <div className="wrapper">
      <BrowserRouter>
        {/* Add the RedirectHandler component inside the BrowserRouter */}
        <RedirectHandler />

        <Navbar />
        <div className="content">
          <Routes>
            <Route path='/' element={<Shop />} />
            <Route path='/shop' element={<Shop />} />
            <Route path='/sweets' element={<ShopCategory banner={sweets_banner} category="sweets" />} />
            <Route path='/namkeen' element={<ShopCategory banner={namkeen_banner} category="namkeen" />} />
            <Route path='/khakras' element={<ShopCategory banner={khakras_banner} category="khakras" />} />
            <Route path="/product" element={<Product />}>
              <Route path=':productId' element={<Product />} />
            </Route>
            <Route path='/cart' element={<Cart />} />
            <Route path='/login' element={<LoginSignup />} />
            <Route path="/complaint" element={<ComplaintPage />} />
            {/* <Route path="/my-orders" element={<MyOrders />} /> */}

          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
