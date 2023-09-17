const INITIAL_STATE = {
  adminCinemaMenu: false,
  adminGamingMenu: false,
};

const adminsMenuReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "OPEN_ADMIN_CINEMA_MENU": {
      return { ...state, adminCinemaMenu: true, adminGamingMenu: false };
    }

    case "OPEN_ADMIN_GAMING_MENU": {
      return { ...state, adminCinemaMenu: false, adminGamingMenu: true };
    }

    default: {
      return state;
    }
  }
};

export default adminsMenuReducer;
