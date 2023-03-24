import '../styles/CharacterCard.css';

import React from 'react';
import {  useDispatch, useSelector } from 'react-redux';

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
    if(property !== 'n/a' && property !== 'unknown'){
      let plate = 
        <div className={'card-char-content-plates__plate '+property}>
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
