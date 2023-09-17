const INITIAL_STATE = {
  adminMenuView: false,
  cinemaSlidersView: false,
  cinemaSelectionView: false,
  gamingSlidersView: false,
  gamingSelectionView: false,
};

const mainPagesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    //==LOADER PAGE==//
    case "OPEN_LOADER_PAGE": {
      return {
        ...INITIAL_STATE,
        pageLoader: true,
      };
    }
    case "CLOSE_LOADER_PAGE": {
      return {
        ...INITIAL_STATE,
        pageLoader: false,
      };
    }

    //==ADMINS PAGES==//
    case "OPEN_ADMIN_MENU": {
      return {
        ...INITIAL_STATE,
        adminMenuView: true,
      };
    }

    //==CINEMA PAGES==//
    case "OPEN_CINEMA_SLIDERS": {
      return {
        ...INITIAL_STATE,
        cinemaSlidersView: true,
      };
    }
    case "OPEN_CINEMA_SELECTION": {
      return {
        ...INITIAL_STATE,
        cinemaSelectionView: true,
      };
    }

    //==GAMING PAGES==//
    case "OPEN_GAMING_SLIDERS": {
      return {
        ...INITIAL_STATE,
        gamingSlidersView: true,
      };
    }
    case "OPEN_GAMING_SELECTION": {
      return {
        ...INITIAL_STATE,
        gamingSelectionView: true,
      };
    }

    default: {
      return state;
    }
  }
};

export default mainPagesReducer;
