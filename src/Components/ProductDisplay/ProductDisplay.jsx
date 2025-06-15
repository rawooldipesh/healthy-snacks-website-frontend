import React, { useState, useContext, useEffect } from 'react';
import './ProductDisplay.css';
import { ShopContext } from '../../Context/ShopContext';
import StarRating from './StarRating';

const ProductDisplay = (props) => {
    const { product } = props;
    const { addToCart, removeFromCart, cartItems } = useContext(ShopContext);
    
    const [selectedQuantity, setSelectedQuantity] = useState(250); // Default is 250gms
    const [quantityInCart, setQuantityInCart] = useState(0); // Track number of items in cart
    const [reviews, setReviews] = useState([]);
    const [reviewInput, setReviewInput] = useState('');
    const [rating, setRating] = useState(0);
    const BASE_URL = "https://healthy-snacks-website-backend.onrender.com";

    useEffect(() => {
        // Fetch reviews for the product
        fetch(`${BASE_URL}/reviews/${product.id}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setReviews(data.reviews);
                }
            });
    }, [product.id]);

    useEffect(() => {
        // Check if the product is already in the cart and set its quantity
        if (cartItems[product.id]) {
            const totalQuantity = cartItems[product.id].reduce((sum, entry) => sum + entry.quantity, 0);
            setQuantityInCart(totalQuantity);
        }
    }, [cartItems, product.id]);

    const handleQuantityChange = (quantity) => {
        setSelectedQuantity(quantity);
    };

    const calculatePrice = () => {
        return (selectedQuantity / 250) * product.price;
    };

    const handleAddReview = () => {
        const authToken = localStorage.getItem('auth-token');
        console.log("Auth Token:", authToken); // Debug log for auth token
    
        if (!authToken) {
            alert('Please log in to submit a review.');
            return;
        }
    
        if (reviewInput.trim() !== '' && rating > 0) {
            fetch(`${BASE_URL}/addreview`, {
                method: 'POST',
                headers: {
                    'auth-token': authToken,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    productId: product.id,
                    review: reviewInput,
                    rating: rating,
                }),
            })
                .then((response) => {
                    if (response.status === 401) {
                        alert("Unauthorized: Please log in again.");
                        throw new Error("Unauthorized");
                    }
                    return response.json();
                })
                .then((data) => {
                    if (data.success) {
                        setReviews([...reviews, { username: 'You', review: reviewInput, date: new Date(), rating: rating }]);
                        setReviewInput('');
                        setRating(0);
                    }
                })
                .catch((error) => console.error("Error adding review:", error));
        }
    };
    
    

    const increaseQuantity = () => {
        addToCart(product.id, calculatePrice(), selectedQuantity); // Add item to cart
        setQuantityInCart(prev => prev + 1); // Increase local cart count
    };
    const decreaseQuantity = () => {
        if (quantityInCart > 0) {
            const indexToRemove = cartItems[product.id].findIndex(entry => entry.weight === selectedQuantity);
            
            if (indexToRemove >= 0) {
                removeFromCart(product.id, indexToRemove); // Remove item from cart
                setQuantityInCart(prev => prev - 1); // Decrease local cart count
            }
        }
    };
    

    return (
        <div className='productdisplay'>
            <div className="productdisplay-left">
                <div className="productdisplay-img-list">
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                </div>
                <div className="productdisplay-img">
                    <img className='productdisplay-main-img' src={product.image} alt="" />
                </div>
            </div>
            <div className="productdisplay-right">
                <h1>{product.name}</h1>
                
                <div className="productdisplay-right-prices">
                    ₹ {calculatePrice()} 
                </div>
                <div className="productdisplay-right-description">
                    Healthy and tasty! To fulfill your snacking needs.
                </div>
                <div className="productdisplay-right-qty">
                    <h1>SELECT QUANTITY</h1>
                    <div className="productdisplay-right-quantity">
                    <div className="productdisplay-right-quantity">
                    <div
                         onClick={() => handleQuantityChange(250)}
                         className={selectedQuantity === 250 ? 'selected' : ''}
                     >
                          250gms
                     </div>
                    <div
                          onClick={() => handleQuantityChange(500)}
                          className={selectedQuantity === 500 ? 'selected' : ''}
                     >
                         500gms
                    </div>
                     <div
                            onClick={() => handleQuantityChange(1000)}
                             className={selectedQuantity === 1000 ? 'selected' : ''}
                     >
                        1Kg
                    </div>
                    </div>

                    </div>
                </div>
                <button onClick={increaseQuantity}>ADD TO CART</button>
                
                {/* Quantity Control Section */}
                <div className="productdisplay-right-quantity-control">
                <button onClick={decreaseQuantity}>-</button>
                    <span>{quantityInCart}</span>
                    <button onClick={increaseQuantity}>+</button>
                </div>
                
                <p className='productdisplay-right-category'><span>Category :</span> {product.category}, {product.name}</p>

                {/* Review Section */}
                <div className="productdisplay-reviews">
                    <h2> Add Reviews</h2>
                    <div className="productdisplay-review-input">
                        <StarRating rating={rating} onRatingChange={setRating} /> 
                        <textarea
                            value={reviewInput}
                            onChange={(e) => setReviewInput(e.target.value)}
                            placeholder="Write a review..."
                        ></textarea>
                        <button onClick={handleAddReview}>Submit Review</button>
                    </div>
                    <div className="productdisplay-review-list">
                        {reviews.length > 0 ? (
                            reviews.map((review, index) => (
                                <div key={index} className="productdisplay-review-item">
                                    <strong>{review.username}:</strong> {review.review}
                                    <span className="review-date">
                                        {" "}({new Date(review.date).toLocaleDateString()})
                                    </span>
                                    <div className="review-rating">
                                        {'★'.repeat(review.rating)} {/* Display the star rating */}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No reviews yet. Be the first to review this product!</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDisplay;
