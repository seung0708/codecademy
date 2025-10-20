import Container from "./Container";
import { Link } from "react-router-dom";

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
                <Link className="header__actions__link" to="/cart">Cart</Link>
                <Link className="header__actions__link" to="/login">Login</Link>/
                <Link className="header__actions__link" to="/register">Register</Link>
            </div>
        </Container>
    )
}

export default Header