import Container from "./Container";

const Header = () => {
    return (
        <Container className="header">
            <a href="/">Fashion Store</a>
            <nav>
                <ul>
                    <li>
                        <a href="/">Home</a>
                    </li>
                    <li>
                        <a href="/products">Products</a>
                    </li>
                    <li>
                        <a href="/contact">Contact</a>
                    </li>
                </ul>
            </nav>
        </Container>
    )
}

export default Header