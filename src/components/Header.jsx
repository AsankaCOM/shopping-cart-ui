import React from 'react';

import logoImg from '../assets/book-shop-logo.jpg'

const Header = ({ isAuthenticated, user, logout, login, signup }) => {
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
                <button>Cart (0)</button>
            </nav>
        </header>
    );
};

export default Header;
