import mc from "./admins-menu.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
/*====components====*/
import AdminCinemaMenu from "./admin-cinema-menu/AdminCinemaMenu";
/*====components====*/

const AdminsMenu = () => {
  const dispatch = useDispatch();

  const [selectOptions, setSelectOptions] = useState(false);

  const handleOnGamingClick = () => {
    dispatch({ type: "OPEN_ADMIN_GAMING_MENU" });
    setSelectOptions(false);
  };

  const handleOnCinemaClick = () => {
    dispatch({ type: "OPEN_ADMIN_CINEMA_MENU" });
    setSelectOptions(false);
  };

  const { adminCinemaMenu } = useSelector((store) => {
    return {
      adminCinemaMenu: store.adminsMenuReducer.adminCinemaMenu,
      adminGamingMenu: store.adminsMenuReducer.adminGamingMenu,
      theme: store.themesReducer.theme,
    };
  });

  return (
    <div className={mc.container}>
      <div className={mc.selection_bar_container}>
        <div
          onClick={() => setSelectOptions(!selectOptions)}
          className={
            selectOptions ? mc.select : `${mc.select} ${mc.select_close}`
          }
        >
          <button>Catégories</button>
          <i
            className={
              selectOptions
                ? "icon-arrow-ios-upward-outline"
                : "icon-arrow-ios-downward-outline"
            }
          ></i>
        </div>
        <div
          className={
            selectOptions ? mc.options : `${mc.options} ${mc.options_open}`
          }
        >
          <button onClick={handleOnGamingClick}>Ajouter un jeu</button>
          <button onClick={handleOnCinemaClick}>Ajouter un film</button>
        </div>
      </div>

      <div className={mc.preview}>{adminCinemaMenu && <AdminCinemaMenu />}</div>
    </div>
  );
};

export default AdminsMenu;
