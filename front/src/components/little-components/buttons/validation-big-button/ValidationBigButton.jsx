import mc from "./validation-big-button.module.scss";

const ValidationBigButton = ({ onclick, buttonContent }) => {
  return (
    <>
      <button onClick={onclick} className={mc.button}>
        <span>{buttonContent}</span>
      </button>
    </>
  );
};

export default ValidationBigButton;
