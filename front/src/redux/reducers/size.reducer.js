const INITIAL_STATE = {
  wWidth: "",
};

const sizeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_WINDOW_WIDTH": {
      return { ...state, wWidth: action.payload.wWidth };
    }

    default: {
      return state;
    }
  }
};

export default sizeReducer;
