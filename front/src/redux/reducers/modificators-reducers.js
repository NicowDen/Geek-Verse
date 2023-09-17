//reducer permettant de stocker divers booléens pour certaines modifications d'état.
const INITIAL_STATE = {
  loginView: false,
  switchSignInSignUp: false,
  navBarHeaderSettings: false,
  loading: false,
  themeView: false,
  cinemaSearchGalleryView: false,
  gamingSearchGalleryView: false,
};

const modificatorsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    //==LOGIN MODIFICATORS==//
    case "OPEN_SIGNIN": {
      return { ...state, loginView: true, switchSignInSignUp: false };
    }
    case "CLOSE_LOGIN": {
      return { ...state, loginView: false };
    }
    case "OPEN_SIGNUP": {
      return { ...state, switchSignInSignUp: true };
    }

    //==SETTINGS MODIFICATORS==//
    case "OPEN_CLOSE_SETTINGS": {
      return { ...state, navBarHeaderSettings: !state.navBarHeaderSettings };
    }
    case "CLOSE_SETTINGS": {
      return { ...state, navBarHeaderSettings: false };
    }

    //==THEMEMENU MODIFICATORS==//
    case "OPEN_THEME_MENU": {
      return { ...state, themeView: true };
    }
    case "CLOSE_THEME_MENU": {
      return { ...state, themeView: false };
    }

    //==LOADING MODIFICATORS==//
    case "START_LOADING": {
      return { ...state, loading: true };
    }
    case "STOP_LOADING": {
      return { ...state, loading: false };
    }

    //==SEARCH GALLERIES MODIFICATORS==//
    case "OPEN_CINEMA_SEARCH_GALLERY": {
      return {
        ...state,
        cinemaSearchGalleryView: true,
      };
    }
    case "CLOSE_CINEMA_SEARCH_GALLERY": {
      return {
        ...state,
        cinemaSearchGalleryView: false,
      };
    }

    case "OPEN_GAMING_SEARCH_GALLERY": {
      return {
        ...state,
        gamingSearchGalleryView: true,
      };
    }
    case "CLOSE_GAMING_SEARCH_GALLERY": {
      return {
        ...state,
        gamingSearchGalleryView: false,
      };
    }

    default: {
      return state;
    }
  }
};

export default modificatorsReducer;
