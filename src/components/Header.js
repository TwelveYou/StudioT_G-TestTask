import React, { useEffect } from 'react';
import logo from '../data/logo.svg';
import '../styles/Header.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
  const currentPage = useSelector(state => state.page);
  useEffect(() => {
    lightCurrentPage();
  })

  function lightCurrentPage(){
    let menuItems = document.getElementsByClassName('header-content-menu__item');
    Array.from(menuItems).forEach((item) => {
      if(item.textContent === currentPage){
        item.style = 'border-bottom: 2px solid white;';
      } else{
        item.style = '';
      }
    })
  } 

  return (
    <header className='header' id='header'>
      <div className='header-content'>
        <Link className='header-content__logo' to='/'>
          <img className='header-content__logo-img' src={logo} alt="STAR WARS" />
        </Link>
        <div className='header-content-menu'>
          <Link className='header-content-menu__item' to='/'>Home</Link>
          <Link className='header-content-menu__item' to='/Characters'>Characters</Link>
        </div>
      </div>
    </header>
  )
}
