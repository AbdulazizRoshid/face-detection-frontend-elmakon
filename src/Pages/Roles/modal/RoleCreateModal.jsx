import axios from "axios";
import React, { useState } from "react";
import { useGlobalState } from "../../../context/globalState";
import { roleValidate } from "../../../validator/roleValidator";
import "./role_modal.css";

function RoleCreateModal({
  setIsOpenCreateRole,
  title = "Kasblar",
  getNotifications,
}) {
  // context
  const { dispatch } = useGlobalState();

  // states
  const [roleName, setRoleName] = useState("");

  // getSaveRole
  function getSaveRole(e) {
    e.preventDefault();
    axios
      .post("/userRole", { role_name: roleName })
      .then((data) => {
        dispatch({ type: "ADD_ROLE", payload: data?.data?.data[0] });
        getNotifications({
          title: "Muvaffaqiyatli qo`shildi",
          subTitle: "Kasb muvaffaqiyatli qo'shildi",
          existError: false,
        });
        setIsOpenCreateRole(false)

      })
      .catch((err) => {
        if (err.message == "Network Error") {
          getNotifications({
            title: "Xatolik",
            subTitle: "Tarmoqda xatolik, qaytadan urunib ko'ring",
            existError: true,
          });
        } else {
          getNotifications({
            title: "Xatolik",
            subTitle: roleValidate(err?.response?.data?.error),
            existError: true,
          });
        }
        setIsOpenCreateRole(true)

      });
  }
  return (
    <div className="role_main_modal" onClick={() => setIsOpenCreateRole(false)}>
      <div className="role_managa_modal" onClick={(e) => e.stopPropagation()}>
        <div className="role_modal_header">
          <h3>{title}</h3>
          <i className="fa-solid fa-exit"></i>
        </div>
        <form className="role_modal_form">
          <h3>Kasb nomini kiriting</h3>
          <input
            type="text"
            className="form-control"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
            placeholder="Kasb"
          />
        </form>
        <div className="role_modal_btn_group">
          <button
            className="red m-2"
            onClick={() => setIsOpenCreateRole(false)}
          >
            Bekor Qilish
          </button>
          <button className="green m-2" onClick={getSaveRole}>
            Saqlash
          </button>
        </div>
      </div>
    </div>
  );
}

export default RoleCreateModal;
