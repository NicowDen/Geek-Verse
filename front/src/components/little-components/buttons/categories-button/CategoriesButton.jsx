import mc from "./categories-button.module.scss";

const CategoriesButton = ({ handleOnClick, children, toggle }) => {
  return (
    <div className={mc.container}>
      <button
        onClick={handleOnClick}
        className={toggle ? `${mc.button} ${mc.button_toggle}` : mc.button}
      >
        {children}
      </button>
    </div>
  );
};

export default CategoriesButton;
