const defaultState = { // начальное состояние хранилища
    page: 'Home',
  }; 

export const reducer = (state = defaultState, action) => {
    switch(action.type){
      case "SET_PAGE": 
        return {...state, page: action.payloader};
      
      default: 
        return state;
    }
  }