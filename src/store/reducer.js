export const defaultState = { // начальное состояние хранилища
    page: 'home',
    urlAPI : 'http://swapi.dev/api/people/',
    countFoundedChars: 0,
    characters : [],
    chosenCharacter: null,
    filterColorEye : 'all',
    listColorEye: [],
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

      case "SET_FILTER_COLOR_EYE": 
        return {...state, filterColorEye: action.payloader};

      case "SET_LIST_COLOR_EYE": 
        return {...state, listColorEye: action.payloader};
      
      default: 
        return state;
    }
  }