import './Header.css';
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import { Sun, Moon } from 'lucide-react';
 
const Header = () => {
  const { pathname } = useLocation();
  const {isDark, toggleTheme, colors} = useTheme();
  console.log(isDark, toggleTheme)
  return (
    <header 
      className="header"
      style={{ backgroundColor: colors.bg, color: colors.text }}
    >
      <span className='logo'>
        <Link to="/" className={pathname === "/" ? "active" : ""}>
          Seung Kim
        </Link>
      </span>
      <nav className="nav">
        <div className="nav-links">
          <Link to="/about" className={pathname === "/about" ? "active" : ""}>
            About
          </Link>
          <Link to="/projects" className={pathname === "/projects" ? "active" : ""}>
            Projects
          </Link>
          <Link to="/contact" className={pathname === "/contact" ? "active" : ""}>
            Contact
          </Link>
        </div>
        <button 
          onClick={toggleTheme}
          className="theme-toggle"
        >
          {isDark ? <Sun /> : <Moon />}
        </button>
      </nav>
    </header>
  );
};

export default Header;