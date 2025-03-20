import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom'; // React Router kullanıyorsanız

interface LayoutProps {
  children: ReactNode; // children prop'unun türünü belirtiyoruz
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f4', minHeight: '100vh' }}>
      <header style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px 20px' }}>
        <h1 style={{ margin: 0 }}>Site Başlığı</h1>
        <nav>
          <ul style={{ display: 'flex', listStyleType: 'none', padding: 0 }}>
            <li style={{ marginRight: '20px' }}>
              <Link to="/add" style={{ color: 'white', textDecoration: 'none' }}>Add</Link>
            </li>
            <li style={{ marginRight: '20px' }}>
              <Link to="/route" style={{ color: 'white', textDecoration: 'none' }}>Route</Link>
            </li>
            <li>
              <Link to="/list" style={{ color: 'white', textDecoration: 'none' }}>Listeleme</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main style={{ padding: '20px' }}>{children}</main>
      <footer style={{ textAlign: 'center', padding: '10px', backgroundColor: '#4CAF50', color: 'white' }}>
        <p>Footer içeriği</p>
      </footer>
    </div>
  );
};

export default Layout;