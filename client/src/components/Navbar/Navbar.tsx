import React, { useEffect, useRef } from 'react';
import { Link } from "react-router-dom";

import './Navbar.css'
import { Icons } from '../../lib/icons';
import axios from 'axios';
import api from '../../lib/api';
import { UserRole, useSession } from '../SessionProvider/SessionProvider';




const Navbar = () => {
  const navbarRef = useRef<HTMLDivElement>(null);
  const session = useSession();

  useEffect(() => {
    console.log(session);
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

  }, [session]);


  const logoutHandler = () => {
    axios.get(api.path('/logins/logout'), { withCredentials: true }).then((res) => {
      if (res.status === 200) window.location.replace('/');
    });
  }

  return (
    <div className='navbar' ref={navbarRef}>
      <div className='navbar-section' id='navbar-left'>
        <Link to={`/`} className='navbar-link-container'>
          <img src={Icons.EYE} alt='logo' id='navbar-logo' />
          <span className='navbar-link'>Fitness App</span>
        </Link>
        {session?.role !== UserRole.ADMIN ?
          <Link to={`/${session?.role.toLowerCase()}s/${session?.email}`} className='navbar-link-container'>
            <img src={
              session?.role === 'MEMBER' ? Icons.MEMBER :
                session?.role === 'TRAINER' ? Icons.TRAINER : Icons.MEMBER
            } alt='logo' id='navbar-logo' />
            <span className='navbar-link'>
              {`${session?.first_name ?? 'Profile'} ${session?.last_name ?? ''}`}</span>
          </Link>
          : <></>}
      </div>
      <div className='navbar-section' id='navbar-center'></div>
      <div className='navbar-section' id='navbar-right'>
        <Link to='/trainers' className='navbar-link-container'>
          <span className='navbar-link'>Trainers</span>
        </Link>
        <Link to='/bookings' className='navbar-link-container'>
          <span className='navbar-link'>Bookings</span>
        </Link>
        <Link to='/members' className='navbar-link-container'>
          <span className='navbar-link'>Members</span>
        </Link>
        <Link to='/classes' className='navbar-link-container'>
          <span className='navbar-link'>Classes</span>
        </Link>
        {session?.role === UserRole.ADMIN ?
          <Link to='/equipment' className='navbar-link-container'>
            <span className='navbar-link'>Equipment</span>
          </Link>
          : <></>}
        {session?.role === UserRole.ADMIN ?
          <Link to='/rooms' className='navbar-link-container'>
            <span className='navbar-link'>Rooms</span>
          </Link>
          : <></>}
        <button className='navbar-link-container' onClick={logoutHandler}>
          <span className='navbar-link'>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
