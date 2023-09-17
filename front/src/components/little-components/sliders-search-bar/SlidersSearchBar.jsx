import mc from "./sliders-search-bar.module.scss";
import Input from "../input/Input";

const SlidersSearchBar = ({
  labelModificator,
  labelContent,
  inputType,
  inputValue,
  updateField,
  labelUp,
  labelDown,
  label,
}) => {
  return (
    <div className={mc.container}>
      <div className={mc.input}>
        <Input
          labelModificator={labelModificator}
          labelContent={labelContent}
          inputType={inputType}
          inputValue={inputValue}
          updateField={updateField}
          labelUp={labelUp}
          labelDown={labelDown}
          customLabelClass={label}
          labelPosition="center"
        />
      </div>
    </div>
  );
};

export default SlidersSearchBar;
