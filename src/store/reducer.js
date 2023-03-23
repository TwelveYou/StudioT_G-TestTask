const defaultState = { // начальное состояние хранилища
    other: null,
    page: 'home',
  };

export const reducer = (state = defaultState, action) => {
    switch(action.type){
      case "SET_PAGE": 
      return {...state, page: action.payloader};

      case "SET_OTHER": 
        return {...state, other: action.payloader};
      
      default: 
        return state;
    }
  }