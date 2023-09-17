const INITIAL_STATE = {
  title: {
    value: "",
    selected: false,
    preview: "",
  },
  release: {
    value: "",
    selected: false,
    preview: "",
  },
  directors: {
    value: "",
    selected: false,
    preview: [],
  },
  actors: {
    value: "",
    selected: false,
    preview: [],
  },
  image: {
    value: null,
    selected: false,
    preview: null,
  },
  type: {
    value: "",
    selected: false,
    preview: [],
  },
  synopsis: {
    value: "",
    selected: false,
    preview: "",
  },
  trailer: {
    value: "",
    selected: false,
    preview: "",
  },
  error: null,
  errorColor: "",
};

const adminsCinemaReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "UPDATE_ADMIN_CINEMA_FIELD": {
      return {
        ...state,
        [action.payload.key]: {
          ...state[action.payload.key],
          value: action.payload.value,
        },
      };
    }

    case "UPDATE_ADMIN_CINEMA_FIELD_IMAGE": {
      return {
        ...state,
        image: {
          ...state.image,
          value: action.payload.value,
        },
      };
    }

    case "LABEL_ADMIN_CINEMA_TOP": {
      return {
        ...state,
        [action.payload.key]: {
          ...state[action.payload.key],
          selected: true,
        },
      };
    }

    case "LABEL_ADMIN_CINEMA_DOWN": {
      return {
        ...state,
        [action.payload.key]: {
          ...state[action.payload.key],
          selected: false,
        },
      };
    }

    case "VALID_ADMIN_CINEMA_INPUT": {
      if (
        typeof state[action.payload.key].preview === "string" &&
        action.payload.key !== "trailer"
      ) {
        return {
          ...state,
          [action.payload.key]: {
            ...state[action.payload.key],
            preview: action.payload.value.toLowerCase(),
          },
        };
      } else if (action.payload.key === "trailer") {
        return {
          ...state,
          [action.payload.key]: {
            ...state[action.payload.key],
            preview: action.payload.value,
          },
        };
      } else {
        return {
          ...state,
          [action.payload.key]: {
            ...state[action.payload.key],
            preview: [
              ...state[action.payload.key].preview,
              action.payload.value.toLowerCase(),
            ],
          },
        };
      }
    }

    case "ADMIN_CINEMA_DELETE_TARGET": {
      return {
        ...state,
        [action.payload.key]: {
          ...state[action.payload.key],
          preview: [
            ...state[action.payload.key].preview.filter(
              (el, i) => el !== action.payload.target
            ),
          ],
        },
      };
    }

    case "VALID_ADMIN_CINEMA_IMAGE": {
      return {
        ...state,
        image: {
          ...state.image,
          preview: action.payload.value,
        },
      };
    }

    case "CLEAN_ADMIN_CINEMA_INPUT": {
      return {
        ...state,
        [action.payload.key]: {
          ...state[action.payload.key],
          value: "",
        },
      };
    }

    case "CLEAN_ADMIN_CINEMA_INPUTS": {
      return INITIAL_STATE;
    }

    case "SET_ADMIN_CINEMA_ERROR": {
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

export default adminsCinemaReducer;
