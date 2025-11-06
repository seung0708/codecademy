import './Header.css';
import { Link } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import { Sun, Moon } from 'lucide-react';
 
const Header = () => {
  const {isDark, toggleTheme, colors} = useTheme();
  return (
    <header 
      className="header"
      style={{ backgroundColor: colors.bg, color: colors.text }}
    >
      <nav id="desktop-nav">
        <span className='logo'>
          <Link to="/">
            Seung Kim
          </Link>
        </span>
        <div className="nav">
          <ul className="nav-links">
            <li><Link to="/about">About</Link></li>
            <li><Link to="/projects">Projects</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
          <button 
            onClick={toggleTheme}
            className="theme-toggle"
          >
            {isDark ? <Sun /> : <Moon />}
          </button>
        </div>
      </nav>
      <nav id="mobile-nav">
        <span className='logo'>
          <Link to="/">
            Seung Kim
          </Link>
        </span>
        <div className="mobile-menu">
          <div className="mobile-menu-content">
             <div className="hamburger-icon">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <ul className="menu-links">
            <li><Link to="/about">About</Link></li>
            <li><Link to="/projects">Projects</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
          <button 
            onClick={toggleTheme}
            className="theme-toggle"
          >
            {isDark ? <Sun /> : <Moon />}
          </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;