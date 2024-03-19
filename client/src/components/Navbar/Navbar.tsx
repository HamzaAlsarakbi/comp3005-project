import React, { useContext, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";

import './Navbar.css'
import './../Theme/Theme.css'
import { Icons } from '../../lib/icons';
import ThemeContext from '../../contexts/ThemeContext';
import { LazyLoadImage } from 'react-lazy-load-image-component';

interface NavbarProps {
  loggedIn: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ loggedIn }) => {
  const navbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let prevScrollPos = window.scrollY;
    let downLength = 0;

    window.addEventListener('scroll', () => {
      const currentScrollPos = window.scrollY;
      if (prevScrollPos > currentScrollPos) {
        navbarRef.current!.classList.remove('navbar-hide');
        downLength = 0;
      } else if (currentScrollPos > navbarRef.current!.offsetHeight) {
        if(downLength > navbarRef.current!.offsetHeight/2) {
          navbarRef.current!.classList.add('navbar-hide');
        }
        downLength += currentScrollPos - prevScrollPos;
      }
      prevScrollPos = currentScrollPos;
    });
  }, []);


  const { theme } = useContext(ThemeContext);
  return (
    <div className='navbar' ref={navbarRef}>
      <div className='navbar-section' id='navbar-left'>
        <Link to='/' className='navbar-link-container'>
          <LazyLoadImage src={theme === 'dark' ? Icons.LOGO_LIGHT : Icons.LOGO_DARK} alt='logo' id='navbar-logo' />
        </Link>
      </div>
      <div className='navbar-section' id='navbar-center'></div>
      <div className='navbar-section' id='navbar-right'>
        <a href='/about' className='navbar-link-container'>
          <p className='navbar-link'>About</p>
        </a>
        <Link to='/services' className='navbar-link-container'>
          <p className='navbar-link'>Services</p>
        </Link>
        <Link to='/news' className='navbar-link-container'>
          <p className='navbar-link'>News</p>
        </Link>
        <Link to='/contact' className='navbar-link-container'>
          <p className='navbar-link'>Contact</p>
        </Link>
        <Link to='https://www.billetportal.ca' className='navbar-link-container'>
          <p className='navbar-link'>Login</p>
        </Link>
      </div>
      {loggedIn && <form className='navbar-section' action='/newsroom/add' method='get'>
        <button className='login' id='navbar-right' type='submit'>New Article</button>
      </form>
      }
    </div>
  );
};

export default Navbar;
