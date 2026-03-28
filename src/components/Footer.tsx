import React from 'react';

const Footer: React.FC = () => (
  <footer className="footer">
    <div className="footer-logo">SHEMBERG</div>
    <p>&copy; {new Date().getFullYear()} Shemberg Window Systems. All rights reserved.</p>
  </footer>
);

export default Footer;
