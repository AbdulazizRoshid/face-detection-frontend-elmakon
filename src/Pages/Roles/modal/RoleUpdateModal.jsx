import axios from "axios";
import React, { useEffect, useState } from "react";
import { useGlobalState } from "../../../context/globalState";
import { roleValidate } from "../../../validator/roleValidator";
import "./role_modal.css";
function RoleUpdateModal({
  setIsOpenUpdateRole,
  title = "Kasblar",
  roleId,
  getNotifications,
}) {

  // context
  const {dispatch} = useGlobalState();

  // state
  const [role, setRole] = useState("");
  // effect
  useEffect(() => {
    getOneRole();
  }, [roleId]);

  function getOneRole(id) {
    axios
      .get("/userRole/" + roleId)
      .then((data) => {
        setRole(data?.data.role_name);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getUpdated() {
    axios
      .patch("/userRole/" + roleId, { role_name: role })
      .then((data) => {
        if ((data.data.status = 200)) {
          setIsOpenUpdateRole(false)
          dispatch({type:"EDIT_ROLE",payload:data?.data?.data[0]})
          getNotifications({
            title: "Muvaffaqiyatli o'zgartirildi",
            subTitle: "Kasb muvaffaqiyatli o`zgartirildi",
            existError: false,
          });
        } else {
          console.log(data);
        }
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
      });
  }

  return (
    <div className="role_main_modal" onClick={() => setIsOpenUpdateRole(false)}>
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
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Kasb"
          />
        </form>
        <div className="role_modal_btn_group">
          <button
            className="red m-2"
            onClick={() => setIsOpenUpdateRole(false)}
          >
            Bekor Qilish
          </button>
          <button className="green m-2" onClick={getUpdated}>
            Tahrirlash
          </button>
        </div>
      </div>
    </div>
  );
}

export default RoleUpdateModal;
