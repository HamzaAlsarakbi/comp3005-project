import React, { useEffect, useRef, useState } from 'react';
import { Link } from "react-router-dom";

import './Navbar.css'
import { Icons } from '../../lib/icons';
import axios from 'axios';
import api from '../../lib/api';


interface UserSession {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
}

const Navbar = () => {
  const navbarRef = useRef<HTMLDivElement>(null);
  const [session, setSession] = useState<UserSession | null>(null);

  useEffect(() => {
    let prevScrollPos = window.scrollY;
    let downLength = 0;

    window.addEventListener('scroll', () => {
      const currentScrollPos = window.scrollY;
      if (prevScrollPos > currentScrollPos) {
        navbarRef.current!.classList.remove('navbar-hide');
        downLength = 0;
      } else if (currentScrollPos > navbarRef.current!.offsetHeight) {
        if (downLength > navbarRef.current!.offsetHeight / 2) {
          navbarRef.current!.classList.add('navbar-hide');
        }
        downLength += currentScrollPos - prevScrollPos;
      }
      prevScrollPos = currentScrollPos;
    });

    axios.get(api.path('/sessions/check'), { withCredentials: true }).then((res) => {
      if (res.status === 200) {
        setSession(res.data);
      }
    }).catch((err) => {
      console.error(err);
    })


  }, []);


  const logoutHandler = () => {
    axios.get(api.path('/logins/logout'), { withCredentials: true }).then((res) => {
      if (res.status === 200) window.location.replace('/');
    })
  }

  return (
    <div className='navbar' ref={navbarRef}>
      <div className='navbar-section' id='navbar-left'>
        <Link to='/' className='navbar-link-container'>
          <img src={
            session?.role === 'MEMBER' ? Icons.MEMBER :
              session?.role === 'TRAINER' ? Icons.TRAINER : Icons.MEMBER
          } alt='logo' id='navbar-logo' />
          <p className='navbar-link'>{`${session?.first_name ?? 'Profile'} ${session?.last_name ?? ''}`}</p>
        </Link>
      </div>
      <div className='navbar-section' id='navbar-center'></div>
      <div className='navbar-section' id='navbar-right'>
        <Link to='/news' className='navbar-link-container'>
          <p className='navbar-link'>Trainers</p>
        </Link>
        <Link to='/contact' className='navbar-link-container'>
          <p className='navbar-link'>Classes</p>
        </Link>
        <button className='navbar-link-container' onClick={logoutHandler}>
          <p className='navbar-link'>Logout</p>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
