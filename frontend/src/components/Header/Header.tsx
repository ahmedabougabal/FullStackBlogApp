import React, { useState, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';

const styles = {
  header: {
    backgroundColor: 'white',
    borderBottom: '1px solid #e2e8f0',
    position: 'sticky' as const,
    top: 0,
    zIndex: 10,
    padding: '1rem 0',
    marginBottom: '2rem',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    textDecoration: 'none',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 700,
    color: '#2d3748',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  logoIcon: {
    fontSize: '1.75rem',
    color: '#3182ce',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
  },
  link: (isActive: boolean) => ({
    color: isActive ? '#3182ce' : '#4a5568',
    textDecoration: 'none',
    fontWeight: 500,
    fontSize: '1rem',
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    transition: 'all 0.2s ease',
    '&:hover': {
      color: '#3182ce',
      backgroundColor: '#ebf8ff',
    },
  }),
  createButton: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0.75rem 1.5rem',
    backgroundColor: '#3182ce',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '8px',
    fontWeight: 500,
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: '#2c5282',
      transform: 'translateY(-2px)',
    },
  },
  mobileMenuButton: {
    display: 'none',
    '@media (max-width: 640px)': {
      display: 'block',
      padding: '0.5rem',
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
      color: '#4a5568',
    },
  },
  mobileNav: (isOpen: boolean) => ({
    display: 'none',
    '@media (max-width: 640px)': {
      display: isOpen ? 'flex' : 'none',
      flexDirection: 'column' as const,
      position: 'absolute' as const,
      top: '100%',
      left: 0,
      right: 0,
      backgroundColor: 'white',
      padding: '1rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
  }),
};

const Header: React.FC = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const isActive = useCallback((path: string) => {
    return location.pathname === path;
  }, [location]);

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <Link to="/" style={styles.logoContainer}>
          <div style={styles.logo}>
            <span style={styles.logoIcon}>📝</span>
            Blog Platform
          </div>
        </Link>

        <button 
          style={styles.mobileMenuButton}
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>

        <nav style={styles.nav}>
          <Link 
            to="/" 
            style={styles.link(isActive('/'))}
          >
            Home
          </Link>
          <Link 
            to="/create" 
            style={styles.createButton}
          >
            Write a Post
          </Link>
        </nav>

        <div style={styles.mobileNav(isMobileMenuOpen)}>
          <Link 
            to="/" 
            style={styles.link(isActive('/'))}
            onClick={toggleMobileMenu}
          >
            Home
          </Link>
          <Link 
            to="/create" 
            style={styles.createButton}
            onClick={toggleMobileMenu}
          >
            Write a Post
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
