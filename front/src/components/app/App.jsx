import mc from "./app.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkToken } from "../../api/users/checkToken.api";
import { readAllCinemaThunk } from "../../api/cinema/readAllCinema.api";
/*====components====*/
import NavBar from "../nav-bar/NavBar";
import Main from "../main/Main";
import Login from "../login/Login";
import ThemeMenu from "../theme-menu/ThemeMenu";
import MetaAdminMenu from "../meta-admin-menu/MetaAdminMenu";
/*====components====*/

const App = () => {
  const dispatch = useDispatch();

  const { theme } = useSelector((store) => {
    return {
      theme: store.themesReducer.theme,
    };
  });

  useEffect(() => {
    dispatch(readAllCinemaThunk);
  }, []);

  const getScreenSize = () => {
    const windowSize = window.innerWidth;

    if (windowSize <= 480) {
      dispatch({
        type: "GET_WINDOW_WIDTH",
        payload: { wWidth: "mobile" },
      });
    }
    if (windowSize > 480 && windowSize <= 979) {
      dispatch({
        type: "GET_WINDOW_WIDTH",
        payload: { wWidth: "tablet" },
      });
    }
    if (windowSize > 979) {
      dispatch({
        type: "GET_WINDOW_WIDTH",
        payload: { wWidth: "desktop" },
      });
    }
  };

  useEffect(() => {
    const handleWindowResize = () => {
      getScreenSize();
    };
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  useEffect(() => {
    dispatch(checkToken);
    dispatch({ type: "OPEN_CINEMA_SLIDERS" });
    getScreenSize();
  }, []);

  return (
    <div className={mc.container}>
      <Login />
      <ThemeMenu theme={theme} />
      <MetaAdminMenu theme={theme} />
      <header className={mc.header}>
        <NavBar theme={theme} />
      </header>
      <main className={mc.main}>
        <Main theme={theme} />
      </main>
    </div>
  );
};

export default App;
