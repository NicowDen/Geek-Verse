import mc from "./nav-bar-header.module.scss";
import { useDispatch, useSelector } from "react-redux";
import disconnect from "../../api/users/disconnect.thunk";
/*====components====*/
import NavBarHeaderSettings from "./nav-bar-header-settings/NavBarHeaderSettings";
import MainLittleButton from "../little-components/buttons/main-little-button/MainLittleButton";
import Logo from "../little-components/logo/Logo";
/*====components====*/

const NavBarHeader = ({ theme }) => {
  const dispatch = useDispatch();

  const { logged, wWidth } = useSelector((store) => {
    return {
      logged: store.loggReducer.logged,
      wWidth: store.sizeReducer.wWidth,
      navBarHeaderSettings: store.modificatorsReducer.navBarHeaderSettings,
    };
  });

  const handleLoginClick = () => {
    dispatch({ type: "OPEN_SIGNIN" });
  };

  const handleSettingsClick = () => {
    dispatch({ type: "OPEN_CLOSE_SETTINGS" });
  };

  const handleOnProfileClick = () => {
    // dispatch({ type: "CLOSE_SETTINGS" });
  };
  const handleOnThemeClick = () => {
    dispatch({ type: "OPEN_THEME_MENU" });
    dispatch({ type: "CLOSE_SETTINGS" });
  };
  const handleOnAdminClick = () => {
    dispatch({ type: "OPEN_ADMIN_MENU" });
    dispatch({ type: "CLOSE_SETTINGS" });
  };

  const handleDisconnectClick = () => {
    dispatch(disconnect);
    dispatch({ type: "CLOSE_SETTINGS" });
  };

  const handleOnMetaAdminClick = () => {
    dispatch({ type: "OPEN_META_ADMIN_MENU" });
    dispatch({ type: "CLOSE_SETTINGS" });
  };

  return (
    <div className={mc.container}>
      <div
        className={
          wWidth === "mobile"
            ? `${mc.mid} ${mc.mid_mobile}`
            : wWidth === "tablet"
            ? `${mc.mid} ${mc.mid_tablet}`
            : mc.mid
        }
      >
        <h1 className={mc.h1_1}>{wWidth === "mobile" ? "G" : "Geek"}</h1>
        <div className={`${mc.logo} adaptive-img-contain`}>
          <span>
            <Logo theme={theme} />
          </span>
        </div>
        <h1 className={mc.h1_2}>{wWidth === "mobile" ? "V" : "Verse"}</h1>
      </div>
      <div className={mc.right}>
        <MainLittleButton
          hoverOff={logged}
          handleOnClick={!logged ? handleLoginClick : null}
          children={
            <i
              className={
                logged
                  ? `${mc.login_success} icon-person-outline`
                  : `${mc.login_not} icon-person-outline`
              }
            ></i>
          }
        />
        <div className={mc.nav_bar_settings}>
          <NavBarHeaderSettings
            handleOnSettingsClick={handleSettingsClick}
            handleOnProfileClick={handleOnProfileClick}
            handleOnThemeClick={handleOnThemeClick}
            handleOnAdminClick={handleOnAdminClick}
            handleOnMetaAdminClick={handleOnMetaAdminClick}
            handleDisconnectClick={handleDisconnectClick}
          />
        </div>
      </div>
    </div>
  );
};

export default NavBarHeader;
