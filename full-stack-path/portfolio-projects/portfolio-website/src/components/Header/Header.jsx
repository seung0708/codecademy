import './Header.css';
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const { pathname } = useLocation();

  return (
    <header className="header">
      <span className='logo'>
        <Link to="/" className={pathname === "/" ? "active" : ""}>
          Seung Kim
        </Link>
      </span>
      <nav className="nav">
        <Link to="/about" className={pathname === "/about" ? "active" : ""}>
          About
        </Link>
        <Link to="/projects" className={pathname === "/projects" ? "active" : ""}>
          Projects
        </Link>
        <Link to="/contact" className={pathname === "/contact" ? "active" : ""}>
          Contact
        </Link>
      </nav>
    </header>
  );
};

export default Header;