import React from 'react';
import logo from '../data/logo.svg';
import '../styles/Header.css';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className='header'>
      <div className='header-content'>
        <Link className='header-content__logo' to='/'>
          <img className='header-content__logo-img' src={logo} alt="STAR WARS" />
        </Link>
        

        <div className='header-content-menu'>
          <Link className='header-content-menu__item' to='/'>Home</Link>
          <Link className='header-content-menu__item' to='/Characters'>Characters</Link>
          <Link className='header-content-menu__item' to='/Error404'>Error404</Link>
        </div>
      </div>

    </header>
  )
}
