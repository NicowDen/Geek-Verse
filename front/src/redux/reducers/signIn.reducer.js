const INITIAL_SIGNIN = {
  id: 1,
  pseudo: {
    value: "",
    selected: false,
  },
  email: {
    value: "",
    selected: false,
  },
  emailConfirm: {
    value: "",
    selected: false,
  },
  password: {
    value: "",
    selected: false,
  },
  passwordConfirm: {
    value: "",
    selected: false,
  },
  error: null,
};

const signInReducer = (state = INITIAL_SIGNIN, action) => {
  switch (action.type) {
    case "UPDATE_SIGNIN_FIELD": {
      return {
        ...state,
        [action.payload.key]: {
          ...state[action.payload.key],
          value: action.payload.value,
        },
      };
    }

    case "CLEAN_SIGNIN_INPUTS": {
      return {
        ...state,
        email: {
          value: "",
        },
        password: {
          value: "",
        },
      };
    }

    case "LABEL_SIGNIN_TOP": {
      return {
        ...state,
        [action.payload.input]: {
          ...state[action.payload.input],
          selected: true,
        },
      };
    }

    case "LABEL_SIGNIN_DOWN": {
      return {
        ...state,
        [action.payload.input]: {
          ...state[action.payload.input],
          selected: false,
        },
      };
    }

    case "LABEL_SIGNIN_DOWN_ALL": {
      return {
        ...state,
        email: {
          selected: false,
        },
        password: {
          selected: false,
        },
      };
    }

    case "CLEAN_SIGNIN_ALL": {
      return {
        ...state,
        email: {
          value: "",
          selected: false,
        },
        password: {
          value: "",
          selected: false,
        },
      };
    }

    case "SET_SIGNIN_ERROR": {
      return { ...state, error: action.payload.error };
    }

    default: {
      return state;
    }
  }
};

export default signInReducer;
