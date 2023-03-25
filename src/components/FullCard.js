import '../styles/FullCard.css'; 
import icon_male from '../data/gender_male.svg';
import icon_female from '../data/gender_female.svg';
import icon_hermaphrodite from'../data/gender_hermaphrodite.svg';
import icon_robot from'../data/gender_robot.svg';

import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

export default function FullCard() {
    const dispatch = useDispatch();
    const chosenCharacter = useSelector(state => state.chosenCharacter);
    const characters = useSelector(state => state.characters);

// resetChosenCharacter set state chosenCharacter at null and hide modal-window
    function resetChosenCharacter(){
        dispatch({type:'SET_CHOSEN_CHARACTER',preloader: null});
        document.getElementById('modal-window').style.visibility = 'hidden';
    }

    function choseIconChar(gender){
        switch(gender){
            case 'male': 
                return icon_male;
            case 'female': 
                return icon_female;
            case 'hermaphrodite': 
                return icon_hermaphrodite;
            default :
                return icon_robot;
        }
    }
    
    function showPlate(property){
        if(property !== 'n/a' && property !== 'unknown' && property !== 'none'){
            let plate = 
            <div className={'modal-window-full-card-left-block-plates__plate '+property}>
                {property}
            </div>
            return plate;
        }
    }

    function showCircle(property,nameProperty){
        if(property !== 'unknown'){
            let circle = 
            <div className='modal-window-full-card-right-block__circle-param'>
                <p className='modal-window-full-card-right-block__circle-param-value'>{characters[chosenCharacter][nameProperty]}</p>
                <p className='modal-window-full-card-right-block__circle-param-label'>{nameProperty}</p>
            </div>;
            return circle;
        }
    }

    function showFullCard(){
        if(characters[chosenCharacter] !== null && characters[chosenCharacter] !== undefined){
            if(document.getElementById('modal-window')){
                document.getElementById('modal-window').style.display = 'block';
            }
            let fullCard = 
                <div className='modal-window-full-card'>
                    <div className='modal-window-full-card-left-block'>
                        <div className='modal-window-full-card-left-block__icon'>
                            <img src={choseIconChar(characters[chosenCharacter].gender)} alt='Иконка' width="250" />
                        </div>
                        <div className='modal-window-full-card-left-block-plates'>
                            {showPlate(characters[chosenCharacter].gender)}
                            {showPlate(characters[chosenCharacter].birth_year)}
                        </div>
                    </div>
                    <div className='modal-window-full-card-right-block'>
                        <p className='modal-window-full-card-right-block__name'>
                            {characters[chosenCharacter].name}
                        </p>
                        <div className='modal-window-full-card-right-block__text-params'>
                            <div className='modal-window-full-card-right-block__text-params-item'>
                                Color eye: {characters[chosenCharacter].eye_color}
                            </div>
                            <div className='modal-window-full-card-right-block__text-params-item'>
                                Hair: {characters[chosenCharacter].hair_color}
                            </div>
                            <div className='modal-window-full-card-right-block__text-params-item'>
                                Skin: {characters[chosenCharacter].skin_color}
                            </div>
                        </div>
                        <div className='modal-window-full-card-right-block__circle'>
                            {showCircle(characters[chosenCharacter].height,'height')}
                            {showCircle(characters[chosenCharacter].mass,'mass')}
                        </div>
                    </div>

                </div>;
            return fullCard;

        } else{
            if(document.getElementById('modal-window')){
                document.getElementById('modal-window').style.display = 'none';
            }
        }
    }


  return (
    <div id='modal-window'>
        <div className='modal-window__blackout'></div>
            {showFullCard()}
        <button className='modal-window__button-close' onClick={resetChosenCharacter}>
            <span>✕</span>
        </button>
    </div>
  )
}
