const defaultState = { // начальное состояние хранилища
    page: 'home',
    countFoundedChars: 0,
  };

export const reducer = (state = defaultState, action) => {
    switch(action.type){
      case "SET_PAGE": 
      return {...state, page: action.payloader};

      case "SET_COUNT_FOUNDED_CHARS": 
        return {...state, countFoundedChars: action.payloader};
      
      default: 
        return state;
    }
  }