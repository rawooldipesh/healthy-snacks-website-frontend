import React, { useState,useContext } from 'react';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';
import CheckoutForm from '../Checkout/CheckoutForm';


            const BASE_URL = "https://healthy-snacks-website-backend.onrender.com";

const CartItems = () => {
    const { getTotalCartAmount, all_product, cartItems, removeFromCart } = useContext(ShopContext);
    const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  
    const handleCheckout = async () => {
      setShowCheckoutForm(true);
    };
  
    const handleSubmitCheckout = async (userDetails) => {
        const amount = getTotalCartAmount();
    
        // Prepare the product details to send in the request
        const products = all_product
            .map((product) => 
                cartItems[product.id]?.map((entry) => ({
                    productId: product.id,
                    name: `${product.name} (${entry.weight}gms)`,
                    price: entry.price,
                    quantity: entry.quantity,
                }))
            )
            .flat(); // Flatten the array as there could be nested arrays
    
        try {
            // Create order request to the backend

            const res = await fetch(`${BASE_URL}/create-order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount, userDetails, products }), // Send products with user details
            });
    
            const { order } = await res.json();
    
            if (order) {
                const options = {
                    key: 'rzp_test_sPVTX7JY4cH2fC', 
                    amount: order.amount,
                    currency: order.currency,
                    name: 'BHAKTI SNACKS',
                    description: 'Test Transaction',
                    order_id: order.id,
                    handler: function (response) {
                        alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}. Your Order Has Been Successfully Placed.`);
                        
                        // Trigger backend to send email after successful payment
                        fetch(`${BASE_URL}/payment-success`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${localStorage.getItem('auth-token')}`,
                            },
                            body: JSON.stringify({
                                razorpayPaymentId: response.razorpay_payment_id,
                                orderId: order.id,
                                userDetails: {
                                    name: userDetails.name,
                                    email: userDetails.email,
                                },
                                products,
                            }),
                        })
                        .then((res) => res.json())
                        .then((data) => {
                            if (data.success) {
                                console.log('Email sent successfully.');
                            } else {
                                console.error('Failed to send email:', data.message);
                            }
                        })
                        .catch((error) => {
                            console.error('Error during payment success process:', error);
                        });
                    },
                    prefill: {
                        name: userDetails.name,
                        email: userDetails.email,
                        contact: userDetails.phone,
                    },
                    theme: {
                        color: '#3399cc',
                    },
                };
    
                const rzp = new window.Razorpay(options);
                rzp.open();
            }
        } catch (error) {
            console.error('Error during payment process:', error);
        }
    };
    
  
  
    return (
        <div className='cartitems'>
            <div className="cartitems-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            {/* Ensure there are products to display */}
            {all_product.length > 0 ? (
                all_product.map((product) => {
                    // Use Array.isArray to ensure it's an array
                    if (!Array.isArray(cartItems[product.id]) || cartItems[product.id].length === 0) return null;

                    return cartItems[product.id].map((entry, index) => {
                        if (entry.quantity > 0) {
                            return (
                                <div key={`${product.id}-${index}`}>
                                    <div className="cartitems-format cartitems-format-main">
                                        <img className='carticon-product-icon' src={product.image} alt={product.name} />
                                        <p>{`${product.name} (${entry.weight}gms)`}</p>
                                        <p>₹{entry.price}</p>
                                        <button className='cartitems-quantity'>{entry.quantity}</button>
                                        <p>₹{entry.price * entry.quantity}</p>
                                        <img 
                                            className='cartitems-remove-icon' 
                                            src={remove_icon} 
                                            onClick={() => removeFromCart(product.id, index)} 
                                            alt="Remove item" 
                                        />
                                    </div>
                                    <hr />
                                </div>
                            );
                        }
                        return null;
                    });
                })
            ) : (
                <p>No items in the cart.</p>
            )}
            <div className="cartitems-down">
                <div className="cartitems-total">
                    <h1>Cart Totals</h1>
                    <div>
                        <div className="cartitems-total-item">
                            <p>Subtotal</p>
                            <p>₹{getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <p>Shipping Fees</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <h3>Total</h3>
                            <h3>₹{getTotalCartAmount()}</h3>
                        </div>
                    </div>
                    <button onClick={handleCheckout}>Proceed To Checkout</button>
                    </div>
            </div>
             {/* Overlay for Checkout Form */}
             {showCheckoutForm && (
                <div className="overlay">
                    <div className="overlay-content">
                        <CheckoutForm handleSubmit={handleSubmitCheckout} />
                        <button onClick={() => setShowCheckoutForm(false)} className="close-button">Close</button>
                    </div>
                </div>
            )}
        </div>
    );
    
};

export default CartItems;
