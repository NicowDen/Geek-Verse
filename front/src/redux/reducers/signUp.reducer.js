const INITIAL_SIGNUP = {
  id: 1,
  pseudo: {
    value: "",
    selected: false,
  },
  email: {
    value: "",
    selected: false,
  },
  confirmEmail: {
    value: "",
    selected: false,
  },
  password: {
    value: "",
    selected: false,
  },
  confirmPassword: {
    value: "",
    selected: false,
  },
  error: null,
};

const signUpReducer = (state = INITIAL_SIGNUP, action) => {
  switch (action.type) {
    case "IS_LOGGED": {
      return {
        ...state,
        isLogged: true,
      };
    }

    case "UPDATE_SIGNUP_FIELD": {
      return {
        ...state,
        [action.payload.key]: {
          ...state[action.payload.key],
          value: action.payload.value,
        },
      };
    }

    case "CLEAN_SIGNUP_INPUTS": {
      return {
        ...state,
        pseudo: {
          value: "",
        },
        email: {
          value: "",
        },
        confirmEmail: {
          value: "",
        },
        password: {
          value: "",
        },
        confirmPassword: {
          value: "",
        },
      };
    }

    case "LABEL_SIGNUP_TOP": {
      return {
        ...state,
        [action.payload.input]: {
          ...state[action.payload.input],
          selected: true,
        },
      };
    }

    case "LABEL_SIGNUP_DOWN": {
      return {
        ...state,
        [action.payload.input]: {
          ...state[action.payload.input],
          selected: false,
        },
      };
    }

    case "LABEL_SIGNUP_DOWN_ALL": {
      return {
        ...state,
        pseudo: {
          selected: false,
        },
        email: {
          selected: false,
        },
        confirmEmail: {
          selected: false,
        },
        password: {
          selected: false,
        },
        confirmPassword: {
          selected: false,
        },
      };
    }

    case "CLEAN_SIGNUP_ALL": {
      return {
        ...state,
        pseudo: {
          value: "",
          selected: false,
        },
        email: {
          value: "",
          selected: false,
        },
        password: {
          value: "",
          selected: false,
        },
        confirmEmail: {
          value: "",
          selected: false,
        },
        confirmPassword: {
          value: "",
          selected: false,
        },
      };
    }

    case "SET_SIGNUP_ERROR": {
      return { ...state, error: action.payload.error };
    }

    case "CLEAN_SIGNUP_ERROR": {
      return { ...state, error: null };
    }

    default: {
      return state;
    }
  }
};

export default signUpReducer;
