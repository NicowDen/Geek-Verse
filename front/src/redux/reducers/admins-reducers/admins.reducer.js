const INITIAL_STATE = {
  isMetaAdmin: false,
  isAdmin: false,
  isMember: false,
};

const adminsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "IS_MEMBER": {
      return { ...state, isMetaAdmin: false, isAdmin: false, isMember: true };
    }

    case "IS_ADMIN": {
      return { ...state, isMetaAdmin: false, isAdmin: true, isMember: true };
    }

    case "IS_META_ADMIN": {
      return { ...state, isMetaAdmin: true, isAdmin: true, isMember: true };
    }

    case "IS_NOTHING": {
      return { ...state, isMetaAdmin: false, isAdmin: false, isMember: false };
    }

    default: {
      return state;
    }
  }
};

export default adminsReducer;
