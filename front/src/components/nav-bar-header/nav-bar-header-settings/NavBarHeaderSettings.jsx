import mc from "./nav-bar-header-settings.module.scss";
import { useSelector } from "react-redux";
/*====components====*/
import MainLittleButton from "../../little-components/buttons/main-little-button/MainLittleButton";
import SettingsButton from "../../little-components/settings-button/SettingsButton";
/*====components====*/

const NavBarHeaderSettings = ({
  handleOnSettingsClick,
  handleOnProfileClick,
  handleOnThemeClick,
  handleOnAdminClick,
  handleOnMetaAdminClick,
  handleDisconnectClick,
}) => {
  const {
    logged,
    isMember,
    isAdmin,
    isMetaAdmin,
    navBarHeaderSettings,
    theme,
  } = useSelector((store) => {
    return {
      ...store.loggReducer,
      navBarHeaderSettings: store.modificatorsReducer.navBarHeaderSettings,
      theme: store.themesReducer.theme,
    };
  });

  return (
    logged && (
      <>
        <div className={mc.button_container}>
          <MainLittleButton
            handleOnClick={handleOnSettingsClick}
            children={<SettingsButton theme={theme} />}
          />
        </div>

        <div
          className={
            navBarHeaderSettings
              ? mc.settings_menu_container
              : `${mc.settings_menu_container} ${mc.settings_menu_hide}`
          }
        >
          <ul>
            {/* <li>
                <MainLittleButton
                  handleOnClick={handleOnProfileClick}
                  children={<span>Profil</span>}
                />
              </li> */}
            <li>
              <MainLittleButton
                handleOnClick={handleOnThemeClick}
                children={<span>Thème</span>}
              />
            </li>

            {isAdmin && (
              <li>
                <MainLittleButton
                  handleOnClick={handleOnAdminClick}
                  children={<span>Ajout article</span>}
                />
              </li>
            )}
            {isMetaAdmin && (
              <li>
                <MainLittleButton
                  handleOnClick={handleOnMetaAdminClick}
                  children={<span>Ajouter admin</span>}
                />
              </li>
            )}
            <li>
              <MainLittleButton
                handleOnClick={handleDisconnectClick}
                children={<span>Déconnexion</span>}
              />
            </li>
          </ul>
        </div>
      </>
    )
  );
};

export default NavBarHeaderSettings;
