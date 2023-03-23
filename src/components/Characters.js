import '../styles/Characters.css';

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CharacterCard from './CharacterCard';

export default function Characters() {
  const countFoundedChars = useSelector(state => state.countFoundedChars);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({type:'SET_PAGE', payloader: 'Characters'});
  }, [dispatch])

  function getRequestAJAX(){
    console.log('Запрос');
  }

  return (
    <div className='characters'>
      <p className='characters__language'> language: en </p>
      <h3 className='characters__title'>
        {countFoundedChars} <span className='characters__title_bold'>Peoples</span> for you to choose your favorite
      </h3>
      <div className='characters-filter'>
        <label className='characters-filter__label'>filter</label>
        <select className='characters-filter__select'>
          <option value='all'>all</option>
          <option>not all</option>
        </select>
      </div>
      <button onClick={getRequestAJAX}>Проверка запроса</button>
      
      <CharacterCard/>
    </div>
  )
}
