const defaultState = { // начальное состояние хранилища
    page: 'home',
  };

export const reducer = (state = defaultState, action) => {
    switch(action.type){
      case "GET_PAGE": 
        return {...state, page: action.payloader};
      
      default: 
        return state;
    }
  }