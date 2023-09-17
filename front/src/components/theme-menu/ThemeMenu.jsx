import mc from "./theme-menu.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { updateThemeThunk } from "../../api/users/updateTheme.api";
/*====components====*/
import Modal from "../little-components/modal/Modal";
import ValidationBigButton from "../little-components/buttons/validation-big-button/ValidationBigButton";
/*====components====*/

const ThemeMenu = ({ theme }) => {
  const dispatch = useDispatch();

  const { themeView } = useSelector((store) => {
    return store.modificatorsReducer;
  });

  const closeThemeMenu = (e) => {
    dispatch({ type: "CLOSE_THEME_MENU" });
  };

  const setTheme = async (themeColor) => {
    const form = {
      themeSelected: themeColor,
    };
    dispatch((dispatch, getState) =>
      updateThemeThunk(dispatch, getState, form)
    );
  };

  return (
    <Modal
      openModal={themeView}
      closeModal={closeThemeMenu}
      theme={theme}
      children={
        <div className={mc.container}>
          <div className="pinkBlue">
            <ValidationBigButton
              onclick={() => {
                setTheme("pinkBlue");
              }}
              buttonContent="Défaut"
            />
          </div>
          <div className="redWhite">
            <ValidationBigButton
              onclick={() => {
                setTheme("redWhite");
              }}
              buttonContent="Rouge et Blanc"
            />
          </div>
          <div className="blackGold">
            <ValidationBigButton
              onclick={() => {
                setTheme("blackGold");
              }}
              buttonContent="Noir et or"
            />
          </div>
          <div className="vintage">
            <ValidationBigButton
              onclick={() => {
                setTheme("vintage");
              }}
              buttonContent="Vintage"
            />
          </div>
        </div>
      }
    />
  );
};

export default ThemeMenu;
