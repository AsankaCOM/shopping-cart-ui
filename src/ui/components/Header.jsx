import React from 'react';
import './Header.css';

const Header = ({ isAuthenticated, user, logout, login, signup}) => {
    return (
        <header className="app-header">
            <h1>Shopping Cart</h1>
            <div> {user ? "Logged in as " + user.name : ""}</div>
            <nav>
                <a href="/">Home</a>
                <a href="/about">About</a>
                {isAuthenticated && <a href="#" onClick={logout}>Logout</a>}
                {!isAuthenticated && <a href="#" onClick={login}>Log in</a>}
                {!isAuthenticated && <a href="#" onClick={signup}>Signup</a>}
            </nav>
        </header>
    );
};

export default Header;
