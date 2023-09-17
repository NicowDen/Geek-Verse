//composant disponible via le bouton parametre dans la barre header.
import mc from "./meta-admin-menu.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { updateAdminThunk } from "../../api/users/updateAdmin.api";
/*====components====*/
import Modal from "../little-components/modal/Modal";
import Input from "../little-components/input/Input";
import ErrorModal from "../little-components/error-modal/ErrorModal";
import ConfirmationModal from "../little-components/confirmation-modal/ConfirmationModal";
/*====components====*/

const MetaAdminMenu = ({ theme }) => {
  const dispatch = useDispatch();
  const { metaAdminMenuView, addAdminInput, email, error, errorColor } =
    useSelector((store) => {
      return store.metaAdminReducer;
    });

  const [confirmModal, setConfirmModal] = useState(false);

  const closeMetaAdminMenu = (e) => {
    dispatch({ type: "CLOSE_META_ADMIN_MENU" });
  };

  const labelUp = () => {
    dispatch({ type: "ADD_ADMIN_LABEL_TOP" });
  };

  const labelDown = (e) => {
    if (e.target.value.length <= 0) dispatch({ type: "ADD_ADMIN_LABEL_DOWN" });
  };

  const updateField = (e) => {
    dispatch({
      type: "UPDATE_META_ADMIN_FIELD",
      payload: { value: e.target.value },
    });
  };

  const enterValidation = (e) => {
    if (e.key === "Enter" && !confirmModal) {
      dispatch({
        type: "META_ADMIN_UPDATE_EMAIL",
        payload: { email: e.target.value },
      });
      dispatch({
        type: "UPDATE_META_ADMIN_FIELD",
        payload: { value: "" },
      });
      setConfirmModal(true);
    }
  };

  const closeErrorModal = () => {
    dispatch({
      type: "META_ADMIN_UPDATE_ERROR",
      payload: { error: null },
    });
  };

  const confirmUpdate = () => {
    const form = {
      email,
    };
    dispatch((dispatch, getState) =>
      updateAdminThunk(dispatch, getState, form)
    );
    setConfirmModal(false);
  };

  return (
    <Modal
      openModal={metaAdminMenuView}
      closeModal={closeMetaAdminMenu}
      theme={theme}
      children={
        <div className={mc.container}>
          <ConfirmationModal
            theme={theme}
            openModal={confirmModal}
            closeModal={() => setConfirmModal(false)}
            question={`Passer ${email} admin ?`}
            yesClick={confirmUpdate}
            noClick={() => setConfirmModal(false)}
          />
          <ErrorModal
            openModal={error}
            closeModal={closeErrorModal}
            error={error}
            errorColor={errorColor}
          />
          <div className={mc.add_admin}>
            <h3>Ajouter un admin</h3>
            <Input
              labelModificator={addAdminInput.selected}
              labelContent="email"
              inputType="text"
              name="addAdmin"
              inputValue={addAdminInput.value}
              updateField={(e) => updateField(e)}
              labelUp={labelUp}
              labelDown={(e) => labelDown(e)}
              labelPosition="center"
              enterValidation={(e) => enterValidation(e)}
            />
          </div>
        </div>
      }
    />
  );
};

export default MetaAdminMenu;
