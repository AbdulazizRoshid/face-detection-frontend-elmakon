import React, { useEffect, useState } from "react";
import "./controllers.css";
import DeleteModal from "../../components/ui/modals/DeleteModal";
import ControllerPostComponent from "../../components/controllersComponents/ControllerPostComponent";
import moment from "moment";
import AlertModal from "../../components/ui/modals/AlertModal";
import axios from "axios";
import EditController from "../../components/controllersComponents/EditController";
import { useGlobalState } from "../../context/globalState";
import { getAllArreys } from "../../config/loadData";

function ControllersPaga({ isopenFilter }) {
  // context
  const { value, dispatch } = useGlobalState();
  const { controllers } = value;

  const [isOpenControllerModal, setIsOpenControllerModal] = useState(false);
  const [updateController, setUpdateController] = useState(false);

  // states
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [alertModal, setAlertModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [text, setText] = useState({
    title: "",
    subTitle: "",
    existError: false,
  });
  const [ControllerName, setControlName] = useState("");
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mainBranch, setMainBrach] = useState("");
  useEffect(() => {
        startLoading("/controllers", "GET_CONTROLLERS");
        startLoading("/branches", "GET_BRANCHES");
  }, []);

  async function startLoading(params, type) {
    dispatch({ type, payload: await getAllArreys(params) });
  }

  // states

  function DeleteController() {
    axios
      .delete("/controllers/" + id)
      .then((data) => {
        if (data.data.status == 200) {
          dispatch({ type: "DELETE_CONTROLLERS", payload: id });
          setText({
            title: "Muvaffaqiyatli o`chirildi",
            subTitle: "Controller muvaffaqiyatli o`chirildi",
            existError: false,
          });
          setAlertModal(true);
        }
      })
      .catch((err) => {
        if (err.response.data.error == "CONTROLLER_NOT_FOUND") {
          setText({
            title: "Xatolik",
            subTitle: "Bunday controller topilmadi",
            existError: true,
          });
          setAlertModal(true);
        }
      });
  }

  return (
    <div className="user_page">
      {/* Modal ochadigan oyna */}

      {isOpenControllerModal && (
        <ControllerPostComponent
          setIsOpenControllerModal={setIsOpenControllerModal}
          ss={isOpenControllerModal}
        />
      )}
      {updateController && (
        <EditController
          oldControllerName={ControllerName}
          oldurl={url}
          oldemail={email}
          id={id}
          oldpassword={password}
          mainBranchID={mainBranch}
          setUpdateController={setUpdateController}
        />
      )}

      <div className="title_page">
        <h4>Kontrollerlar</h4>
        <div>
          {/* App css ga qo`yilgan */}
          <button
            className="custom_add_btn"
            onClick={() => setIsOpenControllerModal(true)}
          >
            {/* <i className="fa-solid fa-circle-plus"></i> Qo'shish */}
            <i className="fas fa-plus"></i> Qo'shish
          </button>
        </div>
      </div>
      {/* {isopenFilter && <UserSearchAndFilter />} */}
      {/* table uchun maxsus */}
      {controllers.length ? (
        // UI ga olish zarur
        <div
          className="controller_table"
          style={{ height: isopenFilter ? "350px" : "400px" }}
        >
          <div className="controller_table_head">
            <p>ID</p>
            <p>Nomi</p>
            <p>Url</p>
            <p>Filial nomi</p>
            <p>Sana</p>
            <p>Tahrirlash</p>
          </div>
          <div className="controller_table_body">
            {controllers?.map((item, idx) => {
              return (
                <div className="controller_table_tbody" key={idx}>
                  <span className="span_table_item">{idx + 1}</span>
                  {/* <span className="non_decoration"> */}
                  <span className="span_table_item_name">
                    {item?.controller_name}
                    {/* </span> */}
                  </span>

                  <span className="span_table_item">
                    {item?.controller_url}
                  </span>
                  <span className="span_table_item">
                    {item?.branch.branch_name}
                  </span>
                  <span className="span_table_item">
                    {moment(item?.controller_createdat).format("DD. MM. YYYY")}
                  </span>
                  <span className="span_table_item_btns">
                    <button
                      className="custom_btn"
                      onClick={() => {
                        setId(item.controller_id);
                        setUpdateController(true);
                        setControlName(item.controller_name);
                        setUrl(item.controller_url);
                        setEmail(item.controller_username);
                        setPassword(item.controller_password);
                        setMainBrach(item.branch.branch_id);
                      }}
                    >
                      <div className="customicon">
                        <i className="fa-regular fa-pen-to-square"></i>
                      </div>
                      Tahrirlash
                    </button>
                  </span>
                 
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <h3 className="text-center">Ma'lumotlar topilmadi</h3>
      )}
      {deleteModal ? (
        <DeleteModal
          setDeleteModal={setDeleteModal}
          deleteItem={DeleteController}
          name={name}
          subject="Controllerni"
        />
      ) : (
        ""
      )}
      {alertModal ? (
        <AlertModal
          title={text.title}
          subTitle={text.subTitle}
          setIsError={setAlertModal}
          setIsModal={setDeleteModal}
          refresh={null}
          existError={text.existError}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default ControllersPaga;
