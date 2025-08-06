import React from 'react';
import './Navbar.css';

import {Sun, Moon} from 'lucide-react';

const Navbar = () => {
    return (
        <nav className='nav'>
            <ul className="nav_links">
              <li className="nav_link"><a href="#about">About</a></li>
              <li className="nav_link"><a href="#projects">Projects</a></li>
              <li className="nav_link"><a href="#contact">Contact</a></li>
            </ul>
            <button className='switch'>
                <Sun />
            </button>
        </nav>
    )
}

export default Navbar;