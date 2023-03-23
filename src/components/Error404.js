import { Link } from 'react-router-dom';
import deathStar from '../data/zero.png';
import '../styles/Error404.css';

import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';


export default function Error404() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({type:'SET_PAGE', payloader: ''});
    hideHeader(true);
  }, [dispatch])

  function hideHeader(hide){
    if (hide){
      document.getElementById('header').style.display = "none";
    } else {
      document.getElementById('header').style.display = "";
    }
    
  }

  return (
    <div className='error404'>
    <div className='error404-content'>
      <div className='error404-content-text'>
       <span className='error404-content-text__4'>4</span>
       <img className='error404-content-text__0' src={deathStar} alt='Here Yoda be must' width="400" />
       <span className='error404-content-text__4'>4</span>
      </div>
      <div className='error404-content-button-area'>
        <Link className='error404-content-button-area__link' to='/'>
          <button className='error404-content-button-area__button' onClick={()=>hideHeader(false)}>See more...</button>
        </Link>
      </div>
      
    </div>
  </div>
  )
}
