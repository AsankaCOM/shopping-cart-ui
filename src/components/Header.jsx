import React, { useContext } from 'react';

import logoImg from '../assets/book-shop-logo.jpg'
import Button from './ui/Button.jsx';
import CartContext from '../store/CartContext.jsx';

const Header = ({ isAuthenticated, user, logout, login, signup }) => {
    const cartCtx = useContext(CartContext);

    const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
        return totalNumberOfItems + item.quantity;
    }, 0);

    return (
        <header id="main-header">
            <div id="title">
                <img src={logoImg} alt="Book Shop"></img>
                <h1>Shopping Cart</h1>
            </div>

            <div> {user ? "Logged in as " + user.name : ""}</div>
            <nav>
                {/* <a href="/">Home</a>
                <a href="/about">About</a> */}
                {isAuthenticated && <button onClick={logout}>Logout</button>}
                {!isAuthenticated && <button onClick={login}>Log in</button>}
                {!isAuthenticated && <button onClick={signup}>Signup</button>}
                <Button textOnly>Cart ({totalCartItems})</Button>
            </nav>
        </header>
    );
};

export default Header;
