import mc from "./main-little-button.module.scss";

const MainLittleButton = ({ handleOnClick, children, hoverOff }) => {
  return (
    <>
      <button
        onClick={handleOnClick}
        className={hoverOff ? mc.button : `${mc.button} ${mc.button_active}`}
      >
        {children}
      </button>
    </>
  );
};

export default MainLittleButton;
