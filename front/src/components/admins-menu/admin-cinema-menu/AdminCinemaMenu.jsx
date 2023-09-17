import mc from "./admin-cinema-menu.module.scss";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { sendNewCinemaThunk } from "../../../api/cinema/sendNewCinema.api";
import { getItem } from "../../../utils/storage.utils";
/*====components====*/
import AdminCinemaPreview from "./admin-cinema-preview/AdminsCinemaPreview";
import Input from "../../little-components/input/Input";
import ValidationBigButton from "../../little-components/buttons/validation-big-button/ValidationBigButton";
import ErrorModal from "../../little-components/error-modal/ErrorModal";
/*====components====*/

const AdminsCinemaMenu = () => {
  const dispatch = useDispatch();

  const {
    title,
    release,
    directors,
    actors,
    image,
    type,
    synopsis,
    trailer,
    error,
    errorColor,
  } = useSelector((store) => {
    return store.adminsCinemaReducer;
  });

  const [fileImage, setFileImage] = useState(null);

  useEffect(() => {
    let fileReader = null;
    let isCancel = false;
    if (fileImage) {
      fileReader = new FileReader();
      fileReader.readAsDataURL(fileImage);
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          dispatch({
            type: "UPDATE_ADMIN_CINEMA_FIELD_IMAGE",
            payload: { value: result },
          });
          fileReader = null;
        }
      };
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [fileImage]);

  const sendNewFilm = async (e) => {
    e.preventDefault();
    const token = getItem("token");
    const form = {
      token,
      title: title.preview,
      release: release.preview,
      directors: directors.preview,
      actors: actors.preview,
      type: type.preview,
      synopsis: synopsis.preview,
      image: image.preview,
      trailer: trailer.preview.substring(32),
      //le requete échappe les caractère spéciaux donc on isole l'id de la video
      //et on reconstruit le lien dans le back
    };
    dispatch((dispatch, getState) =>
      sendNewCinemaThunk(dispatch, getState, form)
    );
    setFileImage(null);
  };

  const updateField = (value, key) => {
    dispatch({
      type: "UPDATE_ADMIN_CINEMA_FIELD",
      payload: { key, value: value },
    });
  };

  const labelUp = (e, key) => {
    dispatch({ type: "LABEL_ADMIN_CINEMA_TOP", payload: { key } });
  };

  const labelDown = (e, key) => {
    if (e.target.value.length <= 0)
      dispatch({ type: "LABEL_ADMIN_CINEMA_DOWN", payload: { key } });
  };

  const enterValidation = (e, key, value) => {
    if (
      e.key === "Enter" &&
      e.shiftKey == false &&
      e.target.value.trim().length > 0
    ) {
      e.preventDefault();
      dispatch({
        type: "VALID_ADMIN_CINEMA_INPUT",
        payload: { key, value },
      });
      dispatch({ type: "CLEAN_ADMIN_CINEMA_INPUT", payload: { key } });
    }
  };

  const validateReleaseInput = (e, key, value) => {
    dispatch({
      type: "UPDATE_ADMIN_CINEMA_FIELD",
      payload: { key, value: value },
    });
    dispatch({
      type: "VALID_ADMIN_CINEMA_INPUT",
      payload: { key, value },
    });
    dispatch({ type: "CLEAN_ADMIN_CINEMA_INPUT", payload: { key } });
  };

  const updateFieldImage = (value) => {
    setFileImage(value);
    dispatch({ type: "VALID_ADMIN_CINEMA_IMAGE", payload: { value } });
  };

  const closeErrorModal = () => {
    dispatch({
      type: "SET_ADMIN_CINEMA_ERROR",
      payload: { error: null },
    });
    if (errorColor === "green") {
      dispatch({ type: "CLEAN_ADMIN_CINEMA_INPUTS" });
    }
  };

  const deleteSpecificInArray = (e, key) => {
    dispatch({
      type: "ADMIN_CINEMA_DELETE_TARGET",
      payload: { key, target: e.target.id },
    });
  };

  return (
    <div className={mc.container}>
      <div className={mc.top}>
        <div className={mc.inputs_block}>
          <Input
            labelModificator={title.selected}
            labelContent="Titre"
            inputType="text"
            name="title"
            inputValue={title.value}
            updateField={(e) => updateField(e.target.value, "title")}
            labelUp={(e) => labelUp(e, "title")}
            labelDown={(e) => labelDown(e, "title")}
            enterValidation={(e) => enterValidation(e, "title", title.value)}
          />

          <Input
            labelModificator={release.selected}
            inputType="date"
            name="release"
            inputValue={release.value}
            updateField={(e) =>
              validateReleaseInput(e, "release", e.target.value)
            }
            labelUp={(e) => labelUp(e, "release")}
            labelDown={(e) => labelDown(e, "release")}
          />

          <Input
            labelModificator={type.selected}
            labelContent="Type"
            inputType="text"
            name="type"
            inputValue={type.value}
            updateField={(e) => updateField(e.target.value, "type")}
            labelUp={(e) => labelUp(e, "type")}
            labelDown={(e) => labelDown(e, "type")}
            enterValidation={(e) => enterValidation(e, "type", type.value)}
          />

          <Input
            labelModificator={directors.selected}
            labelContent="Réalisateur(s)"
            inputType="text"
            name="directors"
            inputValue={directors.value}
            updateField={(e) => updateField(e.target.value, "directors")}
            labelUp={(e) => labelUp(e, "directors")}
            labelDown={(e) => labelDown(e, "directors")}
            enterValidation={(e) =>
              enterValidation(e, "directors", directors.value)
            }
          />

          <Input
            labelModificator={actors.selected}
            labelContent={"Acteur(s)"}
            inputType="text"
            name="actors"
            inputValue={actors.value}
            updateField={(e) => updateField(e.target.value, "actors")}
            labelUp={(e) => labelUp(e, "actors")}
            labelDown={(e) => labelDown(e, "actors")}
            enterValidation={(e) => enterValidation(e, "actors", actors.value)}
          />

          <Input
            labelModificator={synopsis.selected}
            labelContent="Synopsis"
            name="synopsis"
            inputValue={synopsis.value}
            updateField={(e) => updateField(e.target.value, "synopsis")}
            labelUp={(e) => labelUp(e, "synopsis")}
            labelDown={(e) => labelDown(e, "synopsis")}
            enterValidation={(e) =>
              enterValidation(e, "synopsis", synopsis.value)
            }
          />

          <Input
            labelModificator={trailer.selected}
            labelContent="Bande annonce"
            inputType="text"
            name="trailer"
            inputValue={trailer.value}
            updateField={(e) => updateField(e.target.value, "trailer")}
            labelUp={(e) => labelUp(e, "trailer")}
            labelDown={(e) => labelDown(e, "trailer")}
            enterValidation={(e) =>
              enterValidation(e, "trailer", trailer.value)
            }
          />

          <Input
            inputType="file"
            name="file"
            updateField={(e) => updateFieldImage(e.target.files[0])}
          />
        </div>

        <div className={mc.preview}>
          <AdminCinemaPreview
            image={image.value}
            title={title.preview}
            release={release.preview}
            type={type.preview}
            directors={directors.preview}
            actors={actors.preview}
            synopsis={synopsis.preview}
            trailer={trailer.preview.substring(32)}
            deleteSpecificInArray={deleteSpecificInArray}
          />
          <ErrorModal
            openModal={error}
            closeModal={closeErrorModal}
            error={error}
            errorColor={errorColor}
          />
        </div>
      </div>

      <div className={mc.send_button}>
        <ValidationBigButton
          onclick={sendNewFilm}
          buttonContent="Enregistrer"
        />
      </div>
      {/* <div>{error && <span className={mc.error}>{error}</span>}</div> */}
    </div>
  );
};

export default AdminsCinemaMenu;
