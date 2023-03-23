import '../styles/Characters.css';

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CharacterCard from './CharacterCard';

export default function Characters() {
  const countFoundedChars = useSelector(state => state.countFoundedChars);
  const characters = useSelector(state => state.characters);
  const urlAPI = useSelector(state => state.urlAPI);
  const dispatch = useDispatch();

  useEffect(() => {// on first opening characters, need first time load first page characters
    dispatch({type:'SET_PAGE', payloader: 'Characters'});
    if(characters.length === 0){
      getCharacters();
    }
  })

  useEffect(()=>{ // if next url don't exist in API, then hide adding button 
    if(urlAPI === null){
      document.getElementById('button__get-more').style.display = 'none';
    }
  },[urlAPI])

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
      dispatch({type:'SET_URL_API', payloader: data.next});
      // if(data.next === 'null'){
      //   document.getElementById('button__get-more').style.visibility = 'hidden';
      // }
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
          try{
            resolve(JSON.parse(request.responseText));
            console.log(JSON.parse(request.responseText));
          } catch(e){
            console.log(e);
          }
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
      <div className='characters-cards-area'>
        <div className='characters-cards-area_flex-center'>
          {characters.map((char, index) => (
            <CharacterCard card={char} key={index}/>
          ))}
        </div>
      </div>
      <div className='characters-button-area'>
        <button 
          className='characters-button-area__button' 
          id='button__get-more'
          onClick={()=>getCharacters()}
        >
          Get more
        </button>
      </div>
    </div>
  )
}