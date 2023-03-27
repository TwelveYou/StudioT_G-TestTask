import '../styles/CharacterCard.css';

import React from 'react';

export default function CharacterCard(props) {

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

        // background-color: rgb(7, 215, 242);
        // background-color: rgb(115, 214, 119);   
        // background-color: rgb(201, 86, 255);
        // background-color: rgb(245, 219, 19);
        }
      let plate = 
        <div 
          className={'card-char-content-plates__plate '+property} 
          style={{backgroundColor: colorPlate}}
        >
          {property}
        </div>
      return plate;
    }
  }

  function selectCharacter(){
    console.log('Вы нажали на "'+props.card.name+'"');
  }

  function showCharCard(){
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
      console.error(err.message);
    }
  }

  return (
    <div className='card-char'>
      {showCharCard()}
    </div>
  )
}
