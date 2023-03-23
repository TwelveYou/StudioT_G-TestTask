import '../styles/Characters.css';
// import addressAPI from '../data/addressAPI';

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CharacterCard from './CharacterCard';

export default function Characters() {
  const countFoundedChars = useSelector(state => state.countFoundedChars);
  const characters = useSelector(state => state.characters);
  const urlAPI = useSelector(state => state.urlAPI);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({type:'SET_PAGE', payloader: 'Characters'});
    if(characters.length === 0){
      getCharacters();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function getCharacters(){
      let data =  await sendAJAXRequestPromise()
      .then(function (response) {
        return response;
      })
      .catch(function (err) {
        console.error(err.statusText);
        return null;
      });

    try{
      if(countFoundedChars === 0){
        dispatch({type:'SET_COUNT_FOUNDED_CHARS', payloader: data.count});
      }          
      dispatch({type:'ADD_CHARACTERS', payloader: data.results});
      dispatch({type:'SET_NEXT_PAGE', payloader: data.next});
    } catch(err){
      console.error('Ошибка при распознавании ответа')
      console.error(err);
    }
  }

  function sendAJAXRequestPromise () {
    return new Promise(function (resolve, reject) {
      var request = new XMLHttpRequest();
      request.open('GET',urlAPI);
      request.onloadstart = () => { 
        document.getElementById('loader').style.visibility = 'visible';
      }
      request.onload = function () {
        document.getElementById('loader').style.visibility = 'hidden';
        if (request.status >= 200 && request.status < 300) {
          resolve(JSON.parse(request.responseText));
        } else {
          reject(request.status);
        }
      };
      request.onerror = function () {
        reject(request.status);
      };
      request.send();
    });
  }

  // function showCards(){
  //   if(characters.length !== 0){
  //     return <CharacterCard card={characters[0]}/>
  //   } else {
  //     return <div>Downloading cards</div>
  //   }
  // }

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
      {/* {showCards()} */}
      <CharacterCard card={characters[0]}/>

      <button className='characters__button' onClick={()=>console.log(characters)}>Get more characters</button>
      
      {/* <div>Вот: {showOneChar()}</div> */}
    </div>
  )
}
