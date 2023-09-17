import mc from "./confirmation-modal.module.scss";
/*====components====*/
import CrossButton from "../cross-button/CrossButton";
import MainLittleButton from "../buttons/main-little-button/MainLittleButton";
/*====components====*/

const ConfirmationModal = ({
  theme,
  openModal,
  closeModal,
  question,
  yesClick,
  noClick,
}) => {
  return (
    <div
      className={
        openModal ? mc.container : `${mc.container} ${mc.hide_container}`
      }
    >
      <div className={mc.close}>
        <MainLittleButton
          handleOnClick={closeModal}
          children={<CrossButton size="32px" theme={theme} />}
        />
      </div>
      <div className={mc.question}>
        <span>{question}</span>
      </div>
      <div className={mc.buttons}>
        <button onClick={yesClick} className={mc.yes}>
          YES
        </button>
        <button onClick={noClick} className={mc.no}>
          NO
        </button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
