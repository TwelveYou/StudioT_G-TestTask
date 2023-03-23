import React, { useEffect } from 'react';
import '../styles/Home.css';
import image from '../data/Image.png';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({type:'SET_PAGE', payloader: 'Home'});
  }, [dispatch])
  
  return (
    <div className='home'>
      <div className='home-content'>
        <div className='home-info'>
          <h3 className='home-info__heading'>
            <span className='home-info__heading_bold'>Find</span> all your 
            favorite <span className='home-info__heading_bold'>character</span>
          </h3>
          <p className='home-info__text'>
            You can find out all the information about your favorite characters
          </p>
          <Link to='/Characters'>
           <button className='home-info__button'>See more...</button>
          </Link>
        </div>
        <img className='home__picture' src={image} alt='Here Yoda be must' width="400" />
      </div>
    </div>
  )
}
