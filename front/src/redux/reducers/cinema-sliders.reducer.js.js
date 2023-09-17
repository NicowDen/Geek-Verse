const INITIAL_STATE = {
  cinema: [],
  searchBar: {
    value: "",
    selected: false,
  },
  searchCinemaResult: [],
};

const cinemaSlidersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "CINEMA_FULL": {
      return { ...state, cinema: action.payload.films };
    }

    case "UPDATE_SEARCHBAR_FIELD": {
      return {
        ...state,
        searchBar: {
          ...state.searchBar,
          value: action.payload.value,
        },
      };
    }
    case "SEARCHBAR_LABEL_TOP": {
      return {
        ...state,
        searchBar: {
          ...state.searchBar,
          selected: true,
        },
      };
    }
    case "SEARCHBAR_LABEL_DOWN": {
      return {
        ...state,
        searchBar: {
          ...state.searchBar,
          selected: false,
        },
      };
    }
    case "SEARCH_CINEMA_RESULT": {
      return {
        ...state,
        searchCinemaResult: action.payload.searchResult,
      };
    }

    default: {
      return state;
    }
  }
};

export default cinemaSlidersReducer;
