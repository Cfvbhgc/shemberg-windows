import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <NavLink to="/" className="navbar-logo">SHEMBERG</NavLink>
      <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
        <li><NavLink to="/" end onClick={() => setMenuOpen(false)}>Home</NavLink></li>
        <li><NavLink to="/catalog" onClick={() => setMenuOpen(false)}>Catalog</NavLink></li>
        <li><NavLink to="/configurator" onClick={() => setMenuOpen(false)}>Configurator</NavLink></li>
        <li><NavLink to="/gallery" onClick={() => setMenuOpen(false)}>Gallery</NavLink></li>
      </ul>
      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
        <span /><span /><span />
      </button>
    </nav>
  );
};

export default Navbar;
