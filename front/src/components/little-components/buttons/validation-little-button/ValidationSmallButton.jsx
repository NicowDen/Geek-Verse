import mc from "./validation-small-button.module.scss";

const ValidationSmallButton = ({ validate }) => {
  return (
    <>
      <button onClick={validate} className={mc.button}>
        <i className={"icon-arrow-forward-outline"}></i>
      </button>
    </>
  );
};

export default ValidationSmallButton;
