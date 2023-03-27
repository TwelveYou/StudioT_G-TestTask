import '../styles/CharacterCard.css';

import React from 'react';
import {  useDispatch, useSelector } from 'react-redux';

export function getPlateColor(property){
  let colorPlate
  switch (property) {
    case 'male':
      colorPlate = 'rgb(115, 214, 119)';
      break;
    case 'female':
      colorPlate = 'rgb(201, 86, 255)';
      break;
    case 'hermaphrodite':
      colorPlate = 'rgb(245, 219, 19)';
      break;
    default:
      colorPlate = 'rgb(7, 215, 242)';
      break;
  }
  return colorPlate;
}

export default function CharacterCard(props) {
  const dispatch = useDispatch();
  const characters = useSelector(state => state.characters);

  function showCircle(property,nameProperty){
    if(property !== 'unknown'){
      let circle = 
      <div className='card-char-content-in-circle__param'>
        <p className='card-char-content-in-circle__param-value'>{props.card[nameProperty]}</p>
        <p className='card-char-content-in-circle__param-label'>{nameProperty}</p>
      </div>;
      return circle;
    }
  }

  function showPlate(property){
    if(property !== 'n/a' && property !== 'unknown' && property !== 'none'){
      let plate = 
        <div 
          className={'card-char-content-plates__plate'}
          style={{backgroundColor: getPlateColor(property)}}
        >
          {property}
        </div>
      return plate;
    }
  }

  function selectCharacter(){
    dispatch({type: 'SET_CHOSEN_CHARACTER', payloader: props.id});
    document.getElementById('modal-window').style.visibility = 'visible';
  }

  function showCharCard(){
    if(characters.length !== 0){
      try{
        let card =     
        <div className='card-char-content' onClick={() => selectCharacter()}>
          <h4 className='card-char-content__name'>{props.card.name}  </h4>
          <div className='card-char-content-in-circle'>
            {showCircle(props.card.height,'height')}
            {showCircle(props.card.mass,'mass')}
          </div>
          <div className='card-char-content-plates'>
            {showPlate(props.card.gender)}
            {showPlate(props.card.birth_year)}
          </div>
        </div>;
        return card;
      } catch(err){
        console.error(err);
      }
    }
  }

  return (
    <div className='card-char'>
      {showCharCard()}
    </div>
  )
}
