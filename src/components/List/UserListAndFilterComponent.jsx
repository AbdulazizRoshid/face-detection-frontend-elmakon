import moment from "moment";
import React, { useEffect, useState } from "react";
import {useGlobalState} from '../../context/globalState'

import { Link } from "react-router-dom";

function UserListComponent({
  setIsOpenModal,
  setIsOpenUpdate,
  getUserId,
  setIsDelete,
  setIsUserName,
}) {
  // context

  // const { value } = UserSearchAndFilter();
  const { value } = useGlobalState();
  const {users} = value;
  // const [users,setUsers] = useState([])
  // useEffect(()=>{
  // },[users])

  // states
  const [userImage , setUserImage] = useState(false)
  const [getUserImage , setGetUserImage] = useState(false)

  return (
    <>
      {userImage && <div className="wrapper-modal">
          <div className="close_image_modal">
            <i className="fas fa-close" onClick={()=>{setUserImage(false)}}></i>
          </div>
          <center>
            <div className="image-modal">
              <img src={`http://128.199.177.90:5002/api/users/img/${getUserImage}`} alt="" />
            </div>
          </center>
        </div>}


      <div className="user_page">
      {/* Modal ochadigan oyna */}

      <div className="title_page">
        <h4>Hodimlar</h4>
        <div>
          {/* App css ga qo`yilgan */}
          <button
            className="custom_add_btn"
            onClick={() => setIsOpenModal(true)}
          >
            {/* <i className="fa-solid fa-circle-plus"></i> Qo'shish */}
            <i className="fas fa-plus"></i> Qo'shish
          </button>
        </div>
      </div>
      {/* {isopenFilter && <UserSearchAndFilter />} */}
      {/* table uchun maxsus */}
      {users?.length ? (
        // UI ga olish zarur
        <div className="div_table">
          <div className="div_table_head">
            <p>ID</p>
            <p>Nomi</p>
            <p>Email</p>
            <p>Kasbi</p>
            <p>Sana</p>
            <p>Tahrirlash</p>
          </div>
          <div className="div_table_body">
            {users?.map((item, idx) => {
              return (
                <div className="div_table_tbody" key={idx}>
                  <span className="span_table_item">{idx + 1}</span>
                  <Link
                    // to={`/get-one-user/${item?.user_id}`}
                    className="non_decoration"
                    style={{ cursor: "default" }}
                  >
                    <span
                      className="span_table_item_name"
                      id="user_list_avatar_and_name"
                    >
                      <div className=" image-container">
                        <img
                          src={`http://128.199.177.90:5002/api/users/img/${item?.user_id}`}
                          alt="avatar_picture"
                          onClick={()=>{
                            setGetUserImage(item?.user_id);
                            setUserImage(true)
                          }}
                        />
                      </div>

                      <span
                        className="span_table_item"
                      >
                        {item.user_firstname}
                      </span>
                    </span>
                  </Link>
                  <Link
                    // to={`/get-one-user/${item?.user_id}`}
                    className="non_decoration"
                  >
                    <span className="span_table_item">
                      {item?.user_email ? item.user_email : "Email mavjud emas"}
                    </span>
                  </Link>
                  <span className="span_table_item">
                    {item?.role?.role_name}
                  </span>
                  <span className="span_table_item">
                    {moment(item?.user_createdat).format("DD. MM. YYYY")}
                  </span>

                  <span className="span_table_item_btns">
                    <button
                      className="custom_btn"
                      onClick={() => {
                        setIsOpenUpdate(true);
                        getUserId(item?.user_id);
                      }}
                    >
                      <div className="customicon">
                        <i className="fa-regular fa-pen-to-square"></i>
                      </div>
                      Tahrirlash
                    </button>
                    <button
                      className="custom_btn"
                      onClick={() => {
                        setIsDelete(true);
                        setIsUserName(item);
                      }}
                    >
                      <div className="customicon">
                        <i className="fa-regular fa-trash-can"></i>
                      </div>
                      O'chirish
                    </button>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <h3 className="text-center mt-4">Xodimlar topilmadi</h3>
      )}
      </div>
    </>
    

  );
}

export default UserListComponent;
