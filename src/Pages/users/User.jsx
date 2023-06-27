import React, { useEffect, useState } from "react";
import "./users.css";
import User_Modal from "../../components/modal/User_Modal";
import AlertModal from "../../components/ui/modals/AlertModal";
import UserListComponent from "../../components/List/UserListAndFilterComponent";
import UserUpdateModal from "../../components/modal/UserUpdateModal";
import DeleteModal from "../../components/ui/modals/DeleteModal";
import axios from "axios";
import { userValidate } from "./../../validator/userValidator";
import { useGlobalState } from "../../context/globalState";
import { getAllArreys } from "../../config/loadData";

function User() {
  //context
  const { dispatch } = useGlobalState();


  // states
  const [text, setText] = useState("");
  const [userName, setIsUserName] = useState("");
  const [isError, setIsError] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isopenModal, setIsOpenModal] = useState(false);
  const [isopenUpdate, setIsOpenUpdate] = useState(false);
  const [getUserId, setGetUserId] = useState('undefined');


  useEffect(() => {
    startLoading("/users", "GET_USERS");
  }, []);

  async function startLoading(params, type) {
    dispatch({ type, payload: await getAllArreys(params) });
  }


  // getNotifications and toggleButton
  const getNotifications = (message) => {
    setText(message);
    setIsError(!isError);
  };

  function getDelete() {
    axios
      .delete("/users/" + userName?.user_id)
      .then((data) => {

        getNotifications({
          title: "Muvaffaqiyatli o`chirildi",
          subTitle: "Xodim muvaffaqiyatli o`chirildi",
          existError: false,
        });
        dispatch({ type: 'DELETE_FROM_USERS', payload: userName?.user_id })
        setIsDelete(!isDelete);
      })
      .catch((err) => {
        getNotifications({
          title: "Xatolik",
          subTitle: userValidate(err?.response?.data?.error),
          existError: true,
        });
      });
  }


  return (
    <>
      {isopenModal && (
        // eslint-disable-next-line react/jsx-pascal-case
        <User_Modal
          setIsOpenModal={setIsOpenModal}
          getNotifications={getNotifications}
        />
      )}
      {isDelete && (
        <DeleteModal
          setDeleteModal={setIsDelete}
          subject={"Xodimni"}
          name={userName?.user_firstname}
          deleteItem={getDelete}
        />
      )}
      {isError && (
        <AlertModal
          title={text?.title}
          subTitle={text?.subTitle}
          existError={text?.existError}
          setIsError={setIsError}
        />
      )}
      {isopenUpdate && (
        <UserUpdateModal
          id={getUserId}
          setIsOpenModal={setIsOpenUpdate}
          getNotifications={getNotifications}
        />
      )}
      <UserListComponent
        setIsOpenUpdate={setIsOpenUpdate}
        setIsOpenModal={setIsOpenModal}
        getUserId={setGetUserId}
        setIsDelete={setIsDelete}
        setIsUserName={setIsUserName}
      />
    </>
  );
}

export default User;
