//composant modal, permettant l'affichage de différentes erreurs personnalisées dans différents menus.
import mc from "./error-modal.module.scss";

const ErrorModal = ({ openModal, closeModal, error, errorColor }) => {
  return (
    <div
      className={
        openModal ? mc.container : `${mc.container} ${mc.hide_container}`
      }
    >
      <div className={mc.error}>
        <span style={{ color: `${errorColor}` }}>{error}</span>
      </div>
      <div className={mc.button}>
        <button onClick={closeModal}>ok</button>
      </div>
    </div>
  );
};

export default ErrorModal;
