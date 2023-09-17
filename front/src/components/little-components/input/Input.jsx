import mc from "./input.module.scss";

const Input = ({
  labelModificator,
  labelContent,
  inputType,
  inputValue,
  updateField,
  labelUp,
  labelDown,
  enterValidation,
  labelPosition,
  name,
}) => {
  if (inputType === "text" || inputType === "date") {
    return (
      <div className={mc.container}>
        <label
          className={
            labelPosition === "center"
              ? labelModificator
                ? `${mc.label} ${mc.labelUp} ${mc.label_center}`
                : `${mc.label} ${mc.label_center}`
              : labelModificator
              ? `${mc.label} ${mc.labelUp} ${mc.label_left}`
              : `${mc.label} ${mc.label_left}`
          }
        >
          {labelContent}
        </label>
        <input
          className={mc.input}
          type={inputType}
          value={inputValue}
          onChange={updateField}
          onFocus={labelUp}
          onBlur={labelDown}
          onKeyDown={enterValidation}
          autoComplete="off"
          name={name}
        />
      </div>
    );
  } else if (inputType === "file") {
    return (
      <div className={mc.container}>
        <label>
          <input
            className={mc.input}
            type={inputType}
            onChange={updateField}
            name="resume"
          />
          <div className={mc.input_file_div}>
            <i className="icon-attach-outline"></i>
            <span>Télécharger…</span>
          </div>
        </label>
      </div>
    );
  } else {
    return (
      <div className={mc.container}>
        <label
          className={
            labelModificator
              ? `${mc.label} ${mc.label_left} ${mc.labelUp}`
              : `${mc.label} ${mc.label_left}`
          }
        >
          {labelContent}
        </label>
        <textarea
          className={mc.input}
          value={inputValue}
          onChange={updateField}
          onFocus={labelUp}
          onBlur={labelDown}
          onKeyDown={enterValidation}
        ></textarea>
      </div>
    );
  }
};

export default Input;
