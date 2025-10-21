import Container from "./Container";
import { Link } from "react-router-dom";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";

const Header = () => {
    return (
        <Container className="header">
            <nav className="header__nav">
                <Link to="/">Fashion Store</Link>
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
        </Container>
    )
}

export default Header