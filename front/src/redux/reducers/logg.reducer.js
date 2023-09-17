const INITIAL_STATE = {
  logged: false,
  isMetaAdmin: false,
  isAdmin: false,
  isMember: false,
};

const loggReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "LOGG_IS_OK": {
      return { ...state, logged: true };
    }

    case "LOGG_IS_KO": {
      return { ...state, logged: false };
    }

    case "IS_MEMBER": {
      return { ...state, isMetaAdmin: false, isAdmin: false, isMember: true };
    }

    case "IS_ADMIN": {
      return { ...state, isMetaAdmin: false, isAdmin: true, isMember: true };
    }

    case "IS_META_ADMIN": {
      return { ...state, isMetaAdmin: true, isAdmin: true, isMember: true };
    }

    default: {
      return state;
    }
  }
};

export default loggReducer;
