import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const { user } = useContext(AuthContext);
    const [cartItems, setCartItems] = useState([]);

    // The storage key depends on the logged-in user
    const storageKey = user ? `cart_${user._id}` : 'cart_guest';

    // Load cart from localStorage when storageKey changes
    useEffect(() => {
        const savedCart = localStorage.getItem(storageKey);
        if (savedCart) {
            setCartItems(JSON.parse(savedCart));
        } else {
            setCartItems([]);
        }
    }, [storageKey]);

    // Sync cart to localStorage
    useEffect(() => {
        if (cartItems.length > 0 || localStorage.getItem(storageKey)) {
            localStorage.setItem(storageKey, JSON.stringify(cartItems));
        }
    }, [cartItems, storageKey]);

    const addToCart = (product) => {
        setCartItems((prevItems) => {
            const exist = prevItems.find((x) => x._id === product._id);
            if (exist) {
                return prevItems.map((x) =>
                    x._id === product._id ? { ...exist, qty: exist.qty + 1 } : x
                );
            }
            return [...prevItems, { ...product, qty: 1 }];
        });
    };

    const removeFromCart = (product) => {
        setCartItems((prevItems) => {
            const exist = prevItems.find((x) => x._id === product._id);
            if (exist.qty === 1) {
                return prevItems.filter((x) => x._id !== product._id);
            }
            return prevItems.map((x) =>
                x._id === product._id ? { ...exist, qty: exist.qty - 1 } : x
            );
        });
    };

    const deleteFromCart = (id) => {
        setCartItems((prevItems) => prevItems.filter((x) => x._id !== id));
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('cart');
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, deleteFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
