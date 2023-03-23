

import React from 'react';
import {  useSelector } from 'react-redux';

export default function CharacterCard(props) {
  const characters = useSelector(state => state.characters);

  function showCharCard(){
    if(characters.length !== 0){
      try{
        let card =     
        <div>
          <h4>{props.card.name}  </h4>
          <p>{props.card.gender}</p>
          <p>{props.card.height}</p>
          <p>{props.card.mass}</p>
          <p>{props.card.birth_year}</p>
          <p>{props.card.eye_color}</p>
          <p>{props.card.hair_color}</p>
        </div>;
        return card;
      } catch(err){
        console.error(err);
      }
    }
  }

  return (
    <div>
      {showCharCard()}
    </div>
  )
}
