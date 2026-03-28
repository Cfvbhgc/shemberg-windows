// Навигация — фиксированная тонкая панель + fullscreen overlay на мобильных

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navigation() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { path: '/', label: 'Главная' },
    { path: '/catalog', label: 'Каталог' },
    { path: '/configurator', label: 'Конфигуратор' },
    { path: '/gallery', label: 'Галерея' },
  ];

  // Блокировка скролла body при открытом меню
  useEffect(function() {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return function() {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // Закрытие меню при смене маршрута
  useEffect(function() {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav className="navigation">
      <div className="nav-inner">
        <Link to="/" className="nav-logo">SHEMBERG</Link>

        <button
          className={`nav-burger ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Меню"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {links.map(function(link) {
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
