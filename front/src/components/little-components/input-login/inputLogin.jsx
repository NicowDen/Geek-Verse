import mc from "./input-login.module.scss";

const InputLogin = ({
  labelContent,
  inputValue,
  inputType,
  handleInputChange,
  handleInputActive,
  handleInputInactive,
  labelUp,
  name,
}) => {
  return (
    <div className={mc.container}>
      <label className={labelUp ? `${mc.label} ${mc.labelUp}` : mc.label}>
        {labelContent}
      </label>
      <input
        className={mc.input}
        required={true}
        type={inputType}
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleInputActive}
        onBlur={handleInputInactive}
        name={name}
        autoComplete="off"
      ></input>
    </div>
  );
};

export default InputLogin;
