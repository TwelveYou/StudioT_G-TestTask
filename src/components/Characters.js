import '../styles/Characters.css';

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CharacterCard from './CharacterCard';

export default function Characters() {
  const countFoundedChars = useSelector(state => state.countFoundedChars);
  const characters = useSelector(state => state.characters);
  const urlAPI = useSelector(state => state.urlAPI);
  const listColorEye = useSelector(state => state.listColorEye);
  const filterColorEye = useSelector(state => state.filterColorEye);
  const dispatch = useDispatch();

// on first opening characters, need first time load first page characters
  useEffect(() => {
    dispatch({type:'SET_PAGE', payloader: 'Characters'});
    if(characters.length === 0){
      firstGetCharacters();
    }
  })

// if next url don't exist in API, then hide adding button 
  useEffect(()=>{ 
    if(urlAPI === null){
      document.getElementById('button__get-more').style.display = 'none';
    }
  },[urlAPI])

// Change Options in filter by downloaded characters
  useEffect(()=>{ 
    let colors = [];
    Array.from(characters).forEach((char) => {
      if(!colors.includes(char.eye_color)){
        colors.push(char.eye_color);
      } 
    })
    colors.sort();
    dispatch({type: 'SET_LIST_COLOR_EYE',payloader: colors});
    // document.getElementById('select-filter').value = filterColorEye;
  },[characters, dispatch,filterColorEye])

// firstGetCharacters download first characters by sendAJAXRequestPromise
  async function firstGetCharacters(){
    let data =  await sendAJAXRequestPromise()
    .then(function (response) {
      return response;
    })
    .catch(function (err) {
      document.getElementById('loader').style.visibility = 'hidden';
      console.error(err.statusText);
      return null;
    });
    if (data === null){
      alert("App can't connect with API");
    } else 
    try{
      dispatch({type:'SET_COUNT_FOUNDED_CHARS', payloader: data.count});
      dispatch({type:'SET_CHARACTERS', payloader: data.results});
      dispatch({type:'SET_URL_API', payloader: data.next});
    } catch(err){
      console.error('Ошибка при распознавании ответа')
      console.error(err);
    }
  }

// getCharacters download and add characters in general list by sendAJAXRequestPromise
  async function getCharacters(){
      let data =  await sendAJAXRequestPromise()
      .then(function (response) {
        return response;
      })
      .catch(function (err) {
        document.getElementById('loader').style.visibility = 'hidden';
        console.error(err.statusText);
        return null;
      });

    if (data === null){
      alert("App can't connect with API");
    } else 
    try{
      dispatch({type:'ADD_CHARACTERS', payloader: data.results});
      dispatch({type:'SET_URL_API', payloader: data.next});
    } catch(err){
      console.error('Ошибка при распознавании ответа')
      console.error(err);
    }
    document.getElementById('select-filter').value = filterColorEye;
  }

// sendAJAXRequestPromise make request
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
      request.timeout = 5000;
      request.ontimeout = function () {
        document.getElementById('loader').style.visibility = 'hidden';
        reject(request.status);
      };
      request.send();
    });
  }

// showFilteredCards return filtered list of cards
  function showFilteredCards(){
    let cards;
    if(filterColorEye === 'all'){
      cards = characters.map((char, index) => (
        <CharacterCard card={char} key={'key'+index} id={index}/>
      ));
    } 
    else {
      cards = characters.filter(char=> char.eye_color === filterColorEye).map((char, index) => (
        <CharacterCard card={char} key={index} id={characters.indexOf(char)}/>
      ));
    }
    return cards
  }

  return (
    <div className='characters'>
      <p className='characters__language'> language: en </p>
      <h3 className='characters__title'>
        {countFoundedChars} <span className='characters__title_bold'>Peoples</span> for you to choose your favorite
      </h3>
      <div className='characters-filter'>
        <label className='characters-filter__label'>color eye</label>
        <select 
          className='characters-filter__select' 
          id='select-filter' 
          defaultValue={filterColorEye}
        >
          <option 
            value='all'
            onClick={()=>dispatch({type: 'SET_FILTER_COLOR_EYE',payloader: 'all'})} 
          >
            all
          </option>
          {listColorEye.map((colorEye, index)=>(
            <option  
              onClick={()=>dispatch({type: 'SET_FILTER_COLOR_EYE',payloader: colorEye})} 
              value={colorEye}
              key={index}
              selected={colorEye === filterColorEye}
            > 
              {colorEye} 
            </option>
          ))}
        </select>
      </div>
      <div className='characters-cards-area'>
        <div className='characters-cards-area_flex-center'>
          {showFilteredCards()}
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