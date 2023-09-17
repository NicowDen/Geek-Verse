import { combineReducers } from "redux";
import modificatorsReducer from "./modificators-reducers";
import signUpReducer from "./signUp.reducer";
import signInReducer from "./signIn.reducer";
import adminsCinemaReducer from "./admins-reducers/admins-cinema.reducer";
import sizeReducer from "./size.reducer";
import loggReducer from "./logg.reducer";
import themesReducer from "./themes.reducer";
import cinemaSlidersReducer from "./cinema-sliders.reducer.js";
import adminsMenuReducer from "./admins-reducers/admins-menu-reducer";
import adminsReducer from "./admins-reducers/admins.reducer";
import mainPagesReducer from "./main-pages.reducer";
import metaAdminReducer from "./meta-admin.reducer";
import cinemaSelectionReducer from "./cinema-selection.reducer";

const finalReducer = combineReducers({
  modificatorsReducer,
  signInReducer,
  signUpReducer,
  adminsCinemaReducer,
  loggReducer,
  sizeReducer,
  themesReducer,
  cinemaSlidersReducer,
  adminsMenuReducer,
  adminsReducer,
  mainPagesReducer,
  metaAdminReducer,
  cinemaSelectionReducer,
});

export default finalReducer;
