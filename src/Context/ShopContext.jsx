import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
    const [all_product, setAll_Product] = useState([]);
    const [cartItems, setCartItems] = useState({}); // Start with an empty object
    const BASE_URL = "https://healthy-snacks-website-backend.onrender.com";

    // Fetch all products and initialize default cart
    useEffect(() => {
        fetch(`${BASE_URL}/allproducts`)
            .then((response) => response.json())
            .then((data) => {
                setAll_Product(data);
                setCartItems(getDefaultCart(data)); // Set the default cart after fetching products
            });
    }, []);

    useEffect(() => {
        const fetchCartData = async () => {
            if (localStorage.getItem('auth-token')) {
                try {
                    const response = await fetch('http://localhost:4000/cart', {
                        method: 'GET',
                        headers: {
                            'auth-token': localStorage.getItem('auth-token'),
                        },
                    });
                    const result = await response.json();
                    if (result.success) {
                        setCartItems(result.cartData); // Set cart data from the server
                    }
                } catch (error) {
                    console.error('Error fetching cart data:', error);
                }
            }
        };
    
        fetchCartData();
    }, []);
    
    


    
    

    const getDefaultCart = (products) => {
        let cart = {};
        products.forEach(product => {
            cart[product.id] = []; // Initialize an empty array for each product ID
        });
        return cart;
    };

    const addToCart = (itemId, itemPrice, quantity) => {
        const authToken = localStorage.getItem('auth-token');
        
        if (authToken) {
            fetch(`${BASE_URL}/addtocart`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': authToken,
                },
                body: JSON.stringify({ itemId }),
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                // Optionally update local state here if needed
            });
        }
    
        setCartItems((prev) => {
            // Ensure prev[itemId] is an array
            const currentEntries = Array.isArray(prev[itemId]) ? prev[itemId] : [];
    
            // Find if there's already an entry with the same price
            const existingEntryIndex = currentEntries.findIndex(
                entry => entry.price === itemPrice && entry.weight === quantity
            );
    
            let newEntries;
    
            if (existingEntryIndex >= 0) {
                // Update quantity if entry exists
                newEntries = currentEntries.map((entry, index) =>
                    index === existingEntryIndex
                        ? { ...entry, quantity: entry.quantity + 1 }
                        : entry
                );
            } else {
                // Add new entry if it doesn't exist
                newEntries = [...currentEntries, { quantity: 1, price: itemPrice, weight: quantity }];
            }
    
            return {
                ...prev,
                [itemId]: newEntries,
            };
        });
    };
    

    const removeFromCart = (itemId, index) => {
        const authToken = localStorage.getItem('auth-token');
        
        if (authToken) {
            fetch(`${BASE_URL}/removefromcart`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': authToken,
                },
                body: JSON.stringify({ itemId }),
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                // Optionally update local state here if needed
            });
        }
    
        setCartItems((prev) => {
            const newEntries = prev[itemId].map((entry, idx) =>
                idx === index
                    ? { ...entry, quantity: entry.quantity - 1 }
                    : entry
            ).filter(entry => entry.quantity > 0); // Remove empty entries

            return {
                ...prev,
                [itemId]: newEntries,
            };
        });
    };

    const getTotalCartItems = () => {
        let totalItems = 0;
        Object.values(cartItems).forEach(entries => {
            // Ensure entries is an array before using forEach
            if (Array.isArray(entries)) {
                entries.forEach(entry => {
                    totalItems += entry.quantity;
                });
            } else {
                console.error('Expected entries to be an array:', entries);
            }
        });
        return totalItems;
    };
    
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        Object.values(cartItems).forEach(entries => {
            // Ensure entries is an array before using forEach
            if (Array.isArray(entries)) {
                entries.forEach(entry => {
                    totalAmount += entry.price * entry.quantity;
                });
            } else {
                console.error('Expected entries to be an array:', entries);
            }
        });
        return totalAmount;
    };
    
    const contextValue = { getTotalCartItems, getTotalCartAmount, all_product, cartItems, addToCart, removeFromCart };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
