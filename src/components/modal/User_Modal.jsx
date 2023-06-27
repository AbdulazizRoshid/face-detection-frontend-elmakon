import React, { useEffect, useState } from "react";
import "./user_modal.css";
import exit from "../../utils/icons/exit.png";
import MultiSelect from "../selection/MultiSelect";
import SoloSelect from "../selection/SoloSelect";
import axios from "axios";
import { userValidate } from "../../validator/userValidator";
import { useGlobalState } from "../../context/globalState";
import { getAllArreys } from "../../config/loadData";


function User_Modal({ setIsOpenModal, getNotifications }) {
  // hooks
  const {value, dispatch} = useGlobalState();

  const {roles} = value;




  useEffect(()=>{
    startLoading("/userRole", "GET_ROLES");
    // setMainBrach(branches[0].branch_id);
    setJob(roles[0]?.role_id)
  },[])
  
async function startLoading(params, type) {
  dispatch({ type, payload: await getAllArreys(params) });
  }
  

  // states
  const [userName, setUserName] = useState("");
  const [lastName, setLastName] = useState("");
  // const [mainBranch, setMainBrach] = useState("");
  const [job, setJob] = useState("");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState("");
  // error

  let img =
    "https://png.pngtree.com/element_our/png/20181022/man-avatar-icon-professional-man-character-business-man-avatar-carton-symbol-png_206531.jpg";

  const getUsersave = async (e) => {
    e.preventDefault();
    let data = new FormData();
    data.append("user_img", avatar);
    data.append("user_firstname", userName);
    data.append("user_lastname", lastName);
    data.append("user_email", email);
    data.append("user_password", password);
    data.append("role_id", job);
    // data.append("branch_id", mainBranch);


    if (password.length && !email.length) {
     return getNotifications({
        title: "Ma'lumotda xatolik",
        subTitle: "Password kiritganingizda, Email ham kiritish majburiy",
      });
    }
    if (email.length && !password.length) {

      return  getNotifications({
        title: "Ma'lumotda xatolik",
        subTitle: "Email kiritganingizda, Password ham kiritish majburiy",
      });
    }
    

    axios
      .post("/users", data)
      .then((data) => {
        if (data.data.status == 201) {
          getNotifications({
            title: "Muvaffaqiyatli qo'shildi",
            subTitle: "Xodim muvaffaqiyatli qo'shildi",
            existError:false
          });
          dispatch({type:'ADD_NEW_USER',payload:data?.data?.data})
          setIsOpenModal(false);
        }
      })
      .catch((err) => {
        if (err.message == "Network Error") {
          getNotifications({
            title: "Xatolik",
            subTitle: "Tarmoqda xatolik, qaytadan urunib ko'ring",
            existError:true
          });
        } else {
          getNotifications({
            title: "Xatolik",
            subTitle: userValidate(err?.response?.data?.error),
            existError:true
          });
        }
      });
  };

  function notAllowedButton() {
    if (
      !userName.length ||
      !lastName.length 
      // !mainBranch.length ||
      // !job.length
    ) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <div className="user_modal" onClick={null}>
      <div className="user_modal_place" onClick={(e) => e.stopPropagation()}>
        <div className="header_modal">
          <h3>Hodim qo'shish</h3>
          <img
            src={exit}
            alt="exit_icnon"
            className="exit_user_icnon"
            onClick={() => setIsOpenModal(false)}
          />
        </div>
        <div className="form_user_modal">
          <form>
            <div className="col ">
              <label className="form-label label_text">Ism</label>
              <input
                type="text"
                className="form-control user_input_field"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Ismni kiriting"
              />
            </div>
            <div className="col ">
              <label className="form-label label_text">Familiya</label>
              <input
                type="text"
                className="form-control user_input_field"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Familiyani kiriting"
              />
            </div>
            {/* <div className="col ">
              <label className="form-label label_text">Asosiy filial</label>
              <select
                className="form-control user_input_field"
                onChange={(e) => setMainBrach(e.target.value)}
              >
              
                {branches?.map((item, idx) => {
                  return (
                    <SoloSelect
                      key={idx}
                      name={item.branch_name}
                      value={item.branch_id}
                    />
                  );
                })}
              </select>
            </div> */}
            {/* <div className="col ">
              <label className="form-label label_text">
                Ruxsat etilgan filial
              </label>
              <MultiSelect
                allowedBranches={allowedBranches}
                setAllowedBranches={setAllowedBranches}
              />
            </div> */}
            <div className="col ">
              <label className="form-label label_text">Kasbi</label>
              <select
                className="form-control user_input_field"
                onChange={(e) => setJob(e.target.value)}
              >
                {roles?.map((item, idx) => {
                  return (
                    <SoloSelect
                      key={idx}
                      name={item.role_name}
                      value={item.role_id}
                    />
                  );
                })}
              </select>
            </div>
            <div className="col ">
              <label className="form-label label_text">Email</label>
              <input
                type="email"
                className="form-control user_input_field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@gmail.com"
              />
            </div>
            <div className="col ">
              <label className="form-label label_text">Parol</label>
              <input
                type="password"
                className="form-control user_input_field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="*****"
              />
            </div>
            <div className="col img_field">
              <div>
                <label className="form-label label_text">Rasm</label>
                <input
                  type="file"
                  className="form-control user_input_field "
                  onChange={(e) => setAvatar(e.target.files[0])}
                />
              </div>
              <img
                src={avatar ? URL.createObjectURL(avatar) : img}
                className="user_input_field_avatar "
                alt="avatar"
              />
            </div>
          </form>
          <div className="user_post_btns_group">
            <div className="user_btns_box">
              <button
                className="red"
                onClick={() => setIsOpenModal(false)}
              >
                Bekor qilish
              </button>
              <button
                className="green"
                onClick={getUsersave}
                disabled={notAllowedButton()}
                style={{
                  opacity: notAllowedButton() && "0.5",
                  cursor: notAllowedButton() && "not-allowed",
                }}
              >
                Saqlash
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User_Modal;
