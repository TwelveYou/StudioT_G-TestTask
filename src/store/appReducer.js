const defaultState = { // начальное состояние хранилища
    other: null,
  };

export const appReducer = (state = defaultState, action) => {
    switch(action.type){
      case "SET_OTHER": 
        return {...state, other: action.payloader};
      
      default: 
        return state;
    }
  }