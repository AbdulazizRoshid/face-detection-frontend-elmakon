import axios from "axios";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import AlertModal from "../../components/ui/modals/AlertModal";
import DeleteModal from "../../components/ui/modals/DeleteModal";
import { useGlobalState } from "../../context/globalState";
import { roleValidate } from "../../validator/roleValidator";
import RoleCreateModal from "./modal/RoleCreateModal";
import RoleUpdateModal from "./modal/RoleUpdateModal";
import "./roles.css";
import { getAllArreys } from "../../config/loadData";
function Roles() {
  // context
  const { value, dispatch } = useGlobalState();

  const { roles } = value;

  // states
  const [roleId, setIsRoleId] = useState("");
  const [text, setText] = useState();
  const [isOpenUpdate, setIsOpenUpdateRole] = useState(false);
  const [isOpenCreate, setIsOpenCreateRole] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isError, setIsError] = useState(false);
  // effect


  useEffect(() => {
    startLoading("/userRole", "GET_ROLES");
}, []);

async function startLoading(params, type) {
dispatch({ type, payload: await getAllArreys(params) });
}

  // getAlertError
  const getNotifications = (message) => {
    setText(message);
    setIsError(!isError);
  };

  function getDeleteFromRole() {
    axios
      .delete("/userRole/" + roleId?.role_id)
      .then((data) => {
        dispatch({
          type: "DELETE_FROM_ROLE_LIST",
          payload: roleId?.role_id,
        });
        if(data.data.status == 200){
          setText({
            title : "Muvaffaqiyatli o'chirildi",
            subTitle : "Kasb muvaffaqiyatli o'chirildi",
            existError : false
          })

        }
        setIsDelete(!isDelete);
        setIsError(!isError);
      })
      .catch((err) => {
        if(err.response.data.error == 'USERROLE_REFERENCES_WITH_USER'){
          setText({
            title : 'Xatolik',
            subTitle: 'Bu kasbda xodimlar bor!',
            existError : true
          })
        }
        else if(err.response.data.error == 'USERROLE_NOT_FOUND'){
          setText({
            title: 'Xatolik',
            subTitle: 'Bunday kasb topilmadi!',
            existError: true
          })

        }
        setIsError(!isError);
      });
  }

  return (
    <div className="roles_settings_page">
      {isDelete && (
        <DeleteModal
          setDeleteModal={setIsDelete}
          subject={"Kasb"}
          name={roleId?.role_name}
          deleteItem={getDeleteFromRole}
        />
      )}
      {isError && (
        <AlertModal
          title={text?.title}
          subTitle={text?.subTitle}
          setIsError={setIsError}
          existError={text.existError}
          refresh={null}
        />
      )}
      {isOpenUpdate && (
        <RoleUpdateModal
          setIsOpenUpdateRole={setIsOpenUpdateRole}
          getNotifications={getNotifications}
          roleId={roleId}
        />
      )}
      {isOpenCreate && (
        <RoleCreateModal
          setIsOpenCreateRole={setIsOpenCreateRole}
          getNotifications={getNotifications}
        />
      )}
     
      <div className="title_page">
        <h4>Kasblar</h4>
        <div>
          {/* App css ga qo`yilgan */}
          <button
            className="custom_add_btn"
            onClick={() => setIsOpenCreateRole(true)}
          >
            {/* <i className="fa-solid fa-circle-plus"></i> Qo'shish */}
            <i className="fas fa-plus"></i> Qo'shish
          </button>
        </div>
      </div>
      <div className="role_table">
        <div className="role_table_head">
          <p>ID</p>
          <p>Nomi</p>
          <p>Sana</p>
          <p>Tahrirlash</p>
        </div>
        <div className="role_table_body">
          {roles?.map((item, idx) => {
            return (
              <div className="role_table_tbody" key={idx}>
                <span className="span_table_item">{idx + 1}</span>
                <span className="span_table_item_name">
                  {item?.role_name
                    ? item?.role_name?.length > 50
                      ? item.role_name?.slice(0, 50) + "..."
                      : item.role_name
                    : ""}
                </span>
                <span className="span_table_item">
                  {moment(item?.role_createdat).format("DD. MM. YYYY")}
                </span>
                <span className="span_table_item_btns">
                  <button
                    className="custom_btn"
                    onClick={() => {
                      setIsOpenUpdateRole(true);
                      setIsRoleId(item?.role_id);
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
                      setIsDelete(!isDelete);
                      setIsRoleId(item);
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
    </div>
  );
}

export default Roles;
