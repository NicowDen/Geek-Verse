//composant modal permettant l'affichage de certains sous menus trop petits pour être affichés
//dans une page complète. Notamment le composant thème.
import mc from "./modal.module.scss";
import MainLittleButton from "../buttons/main-little-button/MainLittleButton";
import CrossButton from "../cross-button/CrossButton";

const Modal = ({ openModal, closeModal, children, theme }) => {
  return (
    <div
      className={
        openModal ? mc.container : `${mc.container} ${mc.hide_container}`
      }
    >
      <div
        className={
          openModal
            ? mc.sub_container
            : `${mc.sub_container} ${mc.hide_sub_container}`
        }
      >
        <div className={mc.close_button}>
          <MainLittleButton
            handleOnClick={closeModal}
            children={<CrossButton size="32px" theme={theme} />}
          />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
