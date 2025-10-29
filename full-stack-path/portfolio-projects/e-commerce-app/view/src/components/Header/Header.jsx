import './Header.css'

import { useState } from "react";

import Container from "../Container/Container";
import { Link } from "react-router-dom";
import { ShoppingBagIcon, Bars3Icon } from "@heroicons/react/24/outline";

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    
    return (
        <Container className="header">
            <div className="header__left">
                <Bars3Icon className="header__hamburger__icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
                <Link to="/" className="header__logo">Fashion Store</Link>
                <nav className="header__nav__desktop">
                    <ul>
                        <li>
                            <Link to="/products">Products</Link>
                        </li>
                    </ul>
                </nav>  
            </div>
            <div className="header__right">
                <div className="header__actions">
                {isUserLoggedIn ? (
                    <Link className="header__actions__link__logout" to="/logout">Logout</Link>
                ) : (
                  <>
                    <Link className="header__actions__link" to="/login">Login</Link> /
                    <Link className="header__actions__link" to="/register">Register</Link>
                  </>
                )}
                    <div className="header__actions__cart">
                        <Link className="header__actions__link" to="/cart">
                            <ShoppingBagIcon className="header__actions__link__icon"  />
                        </Link>
                        <span className="header__actions__cart__count">0</span>
                    </div>
                </div>
            </div>
           
            <nav className={isMobileMenuOpen ? "header__nav__mobile open" : "header__nav__mobile"}>
                <ul>
                    <li>
                        <Link to="/products">Products</Link>
                    </li>
                </ul>
            </nav>
            
        </Container>
    )
}

export default Header