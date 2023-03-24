const defaultState = { // начальное состояние хранилища
    page: 'home',
    countFoundedChars: 0,
    characters : [],
    urlAPI : 'http://swapi.dev/api/people/',
    chosenCharacter: null,
  };

export const reducer = (state = defaultState, action) => {
    switch(action.type){
      case "SET_PAGE": 
        return {...state, page: action.payloader};

      case "SET_COUNT_FOUNDED_CHARS": 
        return {...state, countFoundedChars: action.payloader};

      case "SET_CHARACTERS": 
        return {...state, characters: action.payloader};
      case "ADD_CHARACTERS": 
        return {...state, characters: [...state.characters, ...action.payloader]};

      case "SET_URL_API": 
        return {...state, urlAPI: action.payloader};

      case "SET_CHOSEN_CHARACTER": 
        return {...state, chosenCharacter: action.payloader};
      
      default: 
        return state;
    }
  }