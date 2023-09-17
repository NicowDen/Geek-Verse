import mc from "./sign-up.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { hash } from "../../../utils/crypto.utils";
import { signUpThunk } from "../../../api/users/signUp.api";
/*====components====*/
import ValidationBigButton from "../../little-components/buttons/validation-big-button/ValidationBigButton";
import MainLittleButton from "../../little-components/buttons/main-little-button/MainLittleButton";
import InputLogin from "../../little-components/input-login/inputLogin";
import ErrorModal from "../../little-components/error-modal/ErrorModal";
/*====components====*/

const SignUp = () => {
  const dispatch = useDispatch();

  const { pseudo, email, confirmEmail, password, confirmPassword, error } =
    useSelector((store) => {
      return store.signUpReducer;
    });

  const handleInputChange = (key, value) => {
    dispatch({ type: "UPDATE_SIGNUP_FIELD", payload: { key, value } });
  };

  const handleInputActive = (e, input) => {
    dispatch({ type: "LABEL_SIGNUP_TOP", payload: { input } });
    dispatch({ type: "CLEAN_SIGNUP_ERROR" });
  };

  const handleInputInactive = (e, input) => {
    if (e.target.value.length <= 0)
      dispatch({ type: "LABEL_SIGNUP_DOWN", payload: { input } });
  };

  const closeLogin = () => {
    dispatch({ type: "CLOSE_LOGIN" });
    dispatch({ type: "CLEAN_SIGNUP_ALL" });
  };

  const openSignIn = () => {
    dispatch({ type: "OPEN_SIGNIN" });
    dispatch({ type: "CLEAN_SIGNUP_INPUTS" });
  };

  const closeErrorModal = () => {
    dispatch({
      type: "SET_SIGNUP_ERROR",
      payload: { error: null },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = {
      pseudo: pseudo.value,
      email: email.value,
      password: hash(password.value),
    };
    dispatch((dispatch, getState) => signUpThunk(dispatch, getState, form));
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
        <div className={mc.title}>
          <p>Inscription</p>
        </div>
        <div className={mc.inputs}>
          <InputLogin
            labelUp={pseudo.selected}
            labelContent="Pseudo"
            inputType="text"
            name="pseudo"
            inputValue={pseudo.value}
            handleInputChange={(e) =>
              handleInputChange("pseudo", e.target.value)
            }
            handleInputActive={(e) => handleInputActive(e, "pseudo")}
            handleInputInactive={(e) => handleInputInactive(e, "pseudo")}
          />
          <div className={mc.email}>
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
              labelUp={confirmEmail.selected}
              labelContent="Confirm email"
              inputType="email"
              name="confirmEmail"
              inputValue={confirmEmail.value}
              handleInputChange={(e) =>
                handleInputChange("confirmEmail", e.target.value)
              }
              handleInputActive={(e) => handleInputActive(e, "confirmEmail")}
              handleInputInactive={(e) =>
                handleInputInactive(e, "confirmEmail")
              }
            />
          </div>
          <div className={mc.password}>
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
            <InputLogin
              labelUp={confirmPassword.selected}
              labelContent="Confirm password"
              inputType="password"
              name="confirmPassword"
              inputValue={confirmPassword.value}
              handleInputChange={(e) =>
                handleInputChange("confirmPassword", e.target.value)
              }
              handleInputActive={(e) => handleInputActive(e, "confirmPassword")}
              handleInputInactive={(e) =>
                handleInputInactive(e, "confirmPassword")
              }
            />
          </div>
        </div>
        <div className={mc.connect}>
          <ValidationBigButton
            onclick={(e) => handleSubmit(e)}
            buttonContent="S'inscrire"
          />
          <span className={mc.openSignIn} onClick={openSignIn}>
            Déjà client ?
          </span>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
