//composant permettant d'afficher le film sélectionné par l'utilisateur.
import mc from "./cinema-selection.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { formatDay, formatMonth } from "../../utils/formatDatas.utils";
import { useState } from "react";
import {
  firstLetterUpper,
  firstLettersUpper,
} from "../../utils/first-letter-upper.utils";
import { deleteOneCinemaThunk } from "../../api/cinema/deleteOneCinema.api";
import validator from "validator";
/*====components====*/
import VideoPlayer from "../little-components/video-player/VideoPlayer";
import SelectionCard from "../little-components/selection-card/SelectionCard";
import CrossButton from "../little-components/cross-button/CrossButton";
import ConfirmationModal from "../little-components/confirmation-modal/ConfirmationModal";
import ErrorModal from "../little-components/error-modal/ErrorModal";
/*====components====*/

const CinemaSelection = () => {
  const dispatch = useDispatch();
  const { cinemaSelection, error, errorColor, isAdmin, theme } = useSelector(
    (store) => {
      return {
        cinemaSelection: store.cinemaSelectionReducer.cinemaSelection,
        error: store.cinemaSelectionReducer.error,
        errorColor: store.cinemaSelectionReducer.errorColor,
        isAdmin: store.adminsReducer.isAdmin,
        theme: store.themesReducer.theme,
      };
    }
  );

  const [leftTabUp, setLeftTabUp] = useState(true);
  const [rightTabUp, setRightTabUp] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const leftTabClick = () => {
    setLeftTabUp(true);

    setRightTabUp(false);
  };

  const rightTabClick = () => {
    setLeftTabUp(false);
    setRightTabUp(true);
  };

  const deleteFilm = (e) => {
    const form = {
      filmId: cinemaSelection.id,
    };
    dispatch((dispatch, getState) =>
      deleteOneCinemaThunk(dispatch, getState, form)
    );
    setDeleteModal(false);
  };

  const closeErrorModal = () => {
    dispatch({
      type: "CINEMA_SELECTION_UPDATE_ERROR",
      payload: { error: null },
    });
    if (errorColor === "green") {
      dispatch({ type: "OPEN_CINEMA_SLIDERS" });
    }
  };

  return (
    <>
      <SelectionCard
        leftTabUp={leftTabUp}
        rightTabUp={rightTabUp}
        leftTabContent="Infos"
        rightTabContent="Trailer"
        leftTabClick={leftTabClick}
        rightTabClick={rightTabClick}
        leftContent={
          <div className={mc.left_container}>
            <ErrorModal
              openModal={error}
              closeModal={closeErrorModal}
              error={error}
              errorColor={errorColor}
            />
            {isAdmin && (
              <div className={mc.delete_film_button}>
                <CrossButton
                  theme={theme}
                  handleOnClick={() => setDeleteModal(true)}
                />
              </div>
            )}
            <ConfirmationModal
              theme={theme}
              openModal={deleteModal}
              closeModal={() => setDeleteModal(false)}
              question="Supprimer le film"
              yesClick={deleteFilm}
              noClick={() => setDeleteModal(false)}
            />
            <div className={mc.top}>
              <div className={mc.title}>
                <h2>
                  {validator.unescape(cinemaSelection.title.toUpperCase())}
                </h2>
              </div>
            </div>
            <div className={mc.mid}>
              <div className={`${mc.image} adaptive-img-contain`}>
                <span>
                  <img
                    crossOrigin="anonymous"
                    src={`http://localhost:7001/${cinemaSelection.image}`}
                    alt={`image de présentation du film ${cinemaSelection.title}`}
                  />
                </span>
              </div>
              <div className={mc.description}>
                <table>
                  <tbody className={mc.tbody}>
                    <tr className={mc.release_date}>
                      <th>Sortie</th>
                      <td>
                        <p>
                          Le {formatDay(cinemaSelection.release.day)}{" "}
                          {formatMonth(cinemaSelection.release.month)}{" "}
                          {cinemaSelection.release.year}
                        </p>
                      </td>
                    </tr>

                    <tr className={mc.kind}>
                      <th>Genre</th>
                      <td>
                        {cinemaSelection.type.map((el, i) => (
                          <span key={i}>
                            {validator.unescape(firstLetterUpper(el))}
                          </span>
                        ))}
                      </td>
                    </tr>
                    <tr className={mc.director}>
                      <th>De</th>
                      <td>
                        {cinemaSelection.directors.map((el, i) => (
                          <span key={i}>
                            {validator.unescape(firstLettersUpper(el))}
                          </span>
                        ))}
                      </td>
                    </tr>

                    <tr className={mc.actors}>
                      <th>Avec</th>
                      <td>
                        {cinemaSelection.actors.map((el, i) => (
                          <span key={i}>
                            {validator.unescape(firstLettersUpper(el))}
                          </span>
                        ))}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className={mc.bottom}>
              <h3>Synopsis</h3>
              <div className={mc.synopsis}>
                <p>
                  {validator.unescape(
                    firstLetterUpper(cinemaSelection.synopsis)
                  )}
                </p>
              </div>
            </div>
          </div>
        }
        rightContent={
          <div className={mc.player}>
            <VideoPlayer
              videoUrl={`${cinemaSelection.trailer}&origin=http://localhost:3000/`}
            />
          </div>
        }
      />
    </>
  );
};

export default CinemaSelection;
