const INITIAL_STATE = {
  theme: "",
};

const themesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_THEME": {
      return { ...state, theme: action.payload.themeColor };
    }

    default: {
      return state;
    }
  }
};

export default themesReducer;
