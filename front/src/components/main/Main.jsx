import mc from "./main.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
/*====components====*/
import AdminsMenu from "../admins-menu/AdminsMenu";
import CinemaSelection from "../cinema-selection/CinemaSelection";
import CinemaSliders from "../cinema-sliders/CinemaSliders";
import PageLoader from "../little-components/page-loader/PageLoader";
/*====components====*/

const Main = () => {
  const dispatch = useDispatch();

  const { adminMenuView, cinemaSlidersView, cinemaSelectionView } = useSelector(
    (store) => store.mainPagesReducer
  );

  const handleClick = async (e) => {
    if (
      e.target.className !== "icon-settings-2-outline" &&
      e.target.className !== "icon-settings-outline"
    ) {
      dispatch({ type: "CLOSE_SETTINGS" });
    }
  };

  return (
    <>
      <div onClick={handleClick} className={mc.container}>
        {adminMenuView && <AdminsMenu />}
        {cinemaSlidersView && <CinemaSliders />}
        {cinemaSelectionView && <CinemaSelection />}
      </div>
    </>
  );
};

export default Main;
