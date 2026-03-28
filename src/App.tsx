// Главный компонент приложения — layout и маршрутизация

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Configurator from './pages/Configurator';
import Gallery from './pages/Gallery';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navigation />
        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/configurator" element={<Configurator />} />
            <Route path="/gallery" element={<Gallery />} />
          </Routes>
        </main>
        <footer className="footer">
          <div className="container">
            <div className="footer-inner">
              <span className="footer-logo">SHEMBERG</span>
              <span className="footer-copy">© 2026 Все права защищены</span>
              <span className="footer-contact">+7 (495) 123-45-67</span>
            </div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
