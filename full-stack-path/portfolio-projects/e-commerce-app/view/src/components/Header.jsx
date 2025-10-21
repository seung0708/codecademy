import { useState } from "react";

import Container from "./Container";
import { Link } from "react-router-dom";
import { ShoppingBagIcon, Bars3Icon, UserIcon, ArrowRightIcon  } from "@heroicons/react/24/outline";

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    return (
        <Container className="header">
            <div className="header__left">
                <Bars3Icon className="header__hamburger__icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
                <Link to="/">Fashion Store</Link>
                <nav className="header__nav__desktop">
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/products">Products</Link>
                        </li>
                        <li>
                            <Link to="/contact">Contact</Link>
                        </li>
                    </ul>
                </nav>  
            </div>
            <div className="header__right">
                <div className="header__actions">
                    <div className="header__actions__cart">
                        <Link className="header__actions__link" to="/cart">
                            <ShoppingBagIcon className="header__actions__link__icon"  />
                        </Link>
                        <span className="header__actions__cart__count">0</span>
                    </div>
                    
                    <Link className="header__actions__link" to="/login">Login</Link>/
                    <Link className="header__actions__link" to="/register">Register</Link>
                </div>
            </div>
           
            <nav className={isMobileMenuOpen ? "header__nav__mobile open" : "header__nav__mobile"}>
                <ul>
                    <li>
                        <Link to="/products">Products</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact</Link>
                    </li>
                </ul>
            </nav>
            
        </Container>
    )
}

export default Header