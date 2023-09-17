const INITIAL_STATE = {
  metaAdminMenuView: false,
  addAdminInput: {
    value: "",
    selected: false,
  },
  email: "",
  error: null,
  errorColor: "",
};

const metaAdminReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "OPEN_META_ADMIN_MENU": {
      return { ...state, metaAdminMenuView: true };
    }

    case "CLOSE_META_ADMIN_MENU": {
      return { ...state, metaAdminMenuView: false };
    }

    case "UPDATE_META_ADMIN_FIELD": {
      return {
        ...state,
        addAdminInput: {
          ...state.addAdminInput,
          value: action.payload.value,
        },
      };
    }

    case "ADD_ADMIN_LABEL_TOP": {
      return {
        ...state,
        addAdminInput: {
          ...state.addAdminInput,
          selected: true,
        },
      };
    }

    case "ADD_ADMIN_LABEL_DOWN": {
      return {
        ...state,
        addAdminInput: {
          ...state.addAdminInput,
          selected: false,
        },
      };
    }

    case "META_ADMIN_UPDATE_EMAIL": {
      return {
        ...state,
        email: action.payload.email,
      };
    }

    case "META_ADMIN_UPDATE_ERROR": {
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

export default metaAdminReducer;
