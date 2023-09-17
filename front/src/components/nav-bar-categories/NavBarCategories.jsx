import mc from "./nav-bar-categories.module.scss";
import { useDispatch, useSelector } from "react-redux";
/*====components====*/
import CategoriesButton from "../little-components/buttons/categories-button/CategoriesButton";
/*====components====*/

const NavBarCategories = () => {
  const dispatch = useDispatch();

  const { cinemaSlidersView, gamingSlidersView, wWidth } = useSelector(
    (store) => {
      return {
        cinemaSlidersView: store.mainPagesReducer.cinemaSlidersView,
        gamingSlidersView: store.mainPagesReducer.gamingSlidersView,
        wWidth: store.sizeReducer.wWidth,
      };
    }
  );

  const handleOnCinemaClick = () => {
    dispatch({ type: "OPEN_CINEMA_SLIDERS" });
  };
  const handleOnGamingClick = () => {
    dispatch({ type: "OPEN_GAMING_SLIDERS" });
  };

  return (
    <div className={mc.container}>
      <div className={mc.separator}></div>
      <div className={mc.categories}>
        <CategoriesButton
          toggle={gamingSlidersView}
          handleOnClick={handleOnGamingClick}
          children={
            <>
              <h2>Gaming</h2>
            </>
          }
        />
      </div>
      <div className={mc.separator}></div>
      <div className={mc.categories}>
        <CategoriesButton
          toggle={cinemaSlidersView}
          handleOnClick={handleOnCinemaClick}
          children={
            <>
              <h2>Cinéma</h2>
            </>
          }
        />
      </div>
      <div className={mc.separator}></div>
    </div>
  );
};

export default NavBarCategories;
