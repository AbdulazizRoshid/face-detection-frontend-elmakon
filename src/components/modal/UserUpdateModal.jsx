import React, { useEffect, useState } from "react";
import "./user_modal.css";
import exit from "../../utils/icons/exit.png";
// import MultiSelect from "../selection/MultiSelect";
import SoloSelect from "../selection/SoloSelect";
import axios from "axios";

import { userValidate } from "../../validator/userValidator";
import { useGlobalState } from "../../context/globalState";

function UserUpdateModal({ setIsOpenModal, getNotifications, id }) {
  // hooks

  const { value, dispatch } = useGlobalState();

  const { branches, roles, users } = value;
  // custom for user image
  const [customImage, setCustomImage] = useState();
  // states
  const [userName, setUserName] = useState("");
  const [lastName, setLastName] = useState("");
  // const [mainBranch, setMainBrach] = useState("");
  // const [allowedBranches, setAllowedBranches] = useState([]);
  const [job, setJob] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(false);
  // const [userImage , setUserImage] = useState(false)
  // const [getUserImage , setGetUserImage] = useState(false)
  // error

  useEffect(() => {
    loadOneUser();
    // userni img kelganida not'g'ri kelgani uchunu
    setCustomImage(users?.filter((s) => s.user_id == id)[0].user_img);
  }, [id]);

  //   loadOneUser
  function loadOneUser() {
    axios
      .get("/user/" + id)
      .then((data) => {
        // setAvatar(data?.data?.user_img);
        setUserName(data?.data?.user_firstname);
        setLastName(data?.data?.user_lastname);
        // setMainBrach(data?.data?.branch.branch_id);
        setJob(data?.data?.role.role_id);
        setEmail(data?.data?.user_email);
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
            subTitle: userValidate(err?.response?.data?.error),
            existError: true,
          });
        }
      });
  }

  const getUsersave = async (e) => {
    e.preventDefault();
    if (password && !email) {
      return getNotifications({
        title: "Ma'lumotda xatolik",
        subTitle: "Password kiritganingizda, Email ham kiritish majburiy",
        existError: true,
      });
    }
    // Emailni o'zgartirganda yoki o'z xolicha qolgan taqdirda o'tib ketish kerak
    // if (email && !password) {
    //   return getNotifications({
    //     title: "Ma'lumotda xatolik",
    //     subTitle: "Email kiritganingizda, Password ham kiritish majburiy",
    //     existError: true,
    //   });
    // }
    let data = new FormData();
    data.append("user_img", avatar);
    data.append("user_firstname", userName);
    data.append("user_lastname", lastName);
    data.append("user_email", email ? email : false);
    data.append(
      "user_password",
      (email && password) || !password ? password : false
    );
    data.append("role_id", job);
    // data.append("branch_id", mainBranch);
    // data.append("allowed_branches", allowedBranches);

    axios
      .patch("/users/" + id, data)
      .then((data) => {
        if (data.data.status == 200) {
          getNotifications({
            title: "Muvaffaqiyatli o'zgartirildi",
            subTitle: "Xodim muvaffaqiyatli o'zgartirildi",
            existError: false,
          });
          dispatch({ type: "EDIT_USER", payload: data?.data?.data});
          setIsOpenModal(false);
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
            subTitle: userValidate(err?.response?.data?.error),
            existError: true,
          });
        }
      });
  };
  return (
    <>
      {/* {userImage && <div className="wrapper-modal">
          <div className="close_image_modal">
            <i className="fas fa-close" onClick={()=>{setUserImage(false)}}></i>
          </div>
          <center>
            <div className="image-modal">
              <img src={`http://128.199.177.90:5002/api/users/img/${avatar}`} alt="" />
            </div>
          </center>
        </div>} */}

      <div
      className="user_modal"
      onClick={() => {
        setIsOpenModal(false);
      }}
    >
      <div className="user_modal_place" onClick={(e) => e.stopPropagation()}>
        <div className="header_modal">
          <h3>Hodimni tahrirlash</h3>
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
                placeholder="Ismni kiriting ..."
              />
            </div>
            <div className="col ">
              <label className="form-label label_text">Familiya</label>
              <input
                type="text"
                className="form-control user_input_field"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Familiyani kiriting ..."
              />
            </div>
            {/* <div className="col ">
              <label className="form-label label_text">Asosiy filial</label>
              <select
                value={mainBranch}
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
                value={job}
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
                autoComplete="new-email"
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
                autoComplete="new-password"
              />
            </div>
            <div className="col img_field">
              <div>
                <label className="form-label label_text">Rasm</label>
                <input
                  type="file"
                  className="form-control user_input_field "
                  onChange={(e) => {
                    setAvatar(e.target.files[0]);
                  }}
                />
              </div>
              {!avatar ? (
                <div className="user_image-container">
                  <img
                    src={`http://${customImage}`}
                    className="user_input_field_avatar "
                    alt="avatar"
                  />
                </div>
              ) : (
                <img
                  src={URL.createObjectURL(avatar)}
                  className="user_input_field_avatar "
                  alt="avatar"
                  // onClick={setUserImage(true)}
                />
              )}
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
              <button className="green" onClick={getUsersave}>
                O`zgartirish
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}

export default UserUpdateModal;
