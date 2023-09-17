import mc from "./sign-in.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { hash } from "../../../utils/crypto.utils";
import { signInThunk } from "../../../api/users/signIn.api";
/*====components====*/
import MainLittleButton from "../../little-components/buttons/main-little-button/MainLittleButton";
import ValidationBigButton from "../../little-components/buttons/validation-big-button/ValidationBigButton";
import InputLogin from "../../little-components/input-login/inputLogin";
import ErrorModal from "../../little-components/error-modal/ErrorModal";
/*====components====*/

const SignIn = () => {
  const dispatch = useDispatch();
  const { email, password, error } = useSelector(
    (store) => store.signInReducer
  );

  const handleInputChange = (key, value) => {
    dispatch({ type: "UPDATE_SIGNIN_FIELD", payload: { key, value } });
  };

  const cleanInputsValue = () => {
    dispatch({ type: "CLEAN_SIGNIN_INPUTS" });
  };

  const handleInputActive = (e, input) => {
    dispatch({ type: "LABEL_SIGNIN_TOP", payload: { input } });
  };

  const handleInputInactive = (e, input) => {
    if (e.target.value.length <= 0)
      dispatch({ type: "LABEL_SIGNIN_DOWN", payload: { input } });
  };

  const closeLogin = () => {
    dispatch({ type: "CLOSE_LOGIN" });
    cleanInputsValue();
    dispatch({ type: "CLEAN_SIGNIN_ALL" });
  };

  const openSignUp = () => {
    dispatch({ type: "OPEN_SIGNUP" });
    dispatch({ type: "CLEAN_SIGNIN_ALL" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = {
      email: email.value,
      password: hash(password.value),
    };
    dispatch((dispatch, getState) => signInThunk(dispatch, getState, form));
  };

  const closeErrorModal = () => {
    dispatch({
      type: "SET_SIGNIN_ERROR",
      payload: { error: null },
    });
  };

  return (
    <div className={mc.container}>
      <ErrorModal
        openModal={error}
        closeModal={closeErrorModal}
        error={error}
      />
      <div className={mc.login_close}>
        <MainLittleButton
          handleOnClick={closeLogin}
          children={<i className="icon-close-circle-outline"></i>}
        />
      </div>
      <form className={mc.form} onSubmit={(e) => handleSubmit(e)}>
        <div>
          <p className={mc.title}>Connection</p>
        </div>

        <div className={mc.inputs}>
          <InputLogin
            labelUp={email.selected}
            labelContent="Email"
            inputType="email"
            name="email"
            inputValue={email.value}
            handleInputChange={(e) =>
              handleInputChange("email", e.target.value)
            }
            handleInputActive={(e) => handleInputActive(e, "email")}
            handleInputInactive={(e) => handleInputInactive(e, "email")}
          />
          <InputLogin
            labelUp={password.selected}
            labelContent="Password"
            inputType="password"
            name="password"
            inputValue={password.value}
            handleInputChange={(e) =>
              handleInputChange("password", e.target.value)
            }
            handleInputActive={(e) => handleInputActive(e, "password")}
            handleInputInactive={(e) => handleInputInactive(e, "password")}
          />
        </div>

        <div className={mc.connect}>
          <ValidationBigButton
            onclick={(e) => handleSubmit(e)}
            buttonContent="Se connecter"
          />
          <span className={mc.openSignUp} onClick={openSignUp}>
            S'incrire
          </span>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
