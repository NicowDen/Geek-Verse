const INITIAL_STATE = {
  cinemaSelection: null,
  error: null,
  errorColor: "",
};

const cinemaSelectionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "CINEMA_SELECTION": {
      return { ...state, cinemaSelection: action.payload.film };
    }

    case "CINEMA_SELECTION_UPDATE_ERROR": {
      return {
        ...state,
        error: action.payload.error,
        errorColor: action.payload.errorColor,
      };
    }

    default: {
      return state;
    }
  }
};

export default cinemaSelectionReducer;
