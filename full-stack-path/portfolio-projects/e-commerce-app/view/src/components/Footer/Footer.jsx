import './Footer.css'

const Footer = () => {
    return (
        <footer className="container footer">
            <div className="footer__top">
                <div className="footer__newsletter">
                    <h3>Subscribe to our newsletter</h3>
                    <p>Get the latest news and updates</p>
                    <form>
                        <input type="email" placeholder="Enter your email" />
                        <button type="submit">Subscribe</button>
                    </form>
                </div>
                <div className="footer__links">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Products</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </div>
            </div>
            <div className="footer__bottom">
                <p>© 2025 E-commerce App. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer
