//bouton croix renvoyant une incône différent en fonction du thème
import mc from "./cross-button.module.scss";
const CrossButton = ({ theme, handleOnClick, id }) => {
  return (
    <>
      <i
        id={id}
        onClick={handleOnClick}
        className={
          theme === "vintage"
            ? "icon-close-outline"
            : "icon-close-circle-outline"
        }
      ></i>
    </>
  );
};

export default CrossButton;
