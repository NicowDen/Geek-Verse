//boutton settings dans la barre header, renvoyant un icône différent en fonction du thème.
const SettingsButton = ({ theme }) => {
  return (
    <>
      <i
        className={
          theme === "vintage"
            ? "icon-settings-outline"
            : "icon-settings-2-outline"
        }
      ></i>
    </>
  );
};

export default SettingsButton;
