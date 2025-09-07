import React from 'react';
import { Link, useLocation } from "react-router-dom";
import './Navbar.css';

import {Sun, Moon} from 'lucide-react';

const navLinks = [
    {}
]

const Navbar = () => {
    const { pathname } = useLocation();
    return (
        <nav className="nav">
        <Link to="/" className={pathname === "/" ? "active" : ""}>
          Home
        </Link>
        <Link to="/about" className={pathname === "/about" ? "active" : ""}>
          About
        </Link>
        <Link to="/projects" className={pathname === "/projects" ? "active" : ""}>
          Projects
        </Link>
      </nav>
    )
}

export default Navbar;