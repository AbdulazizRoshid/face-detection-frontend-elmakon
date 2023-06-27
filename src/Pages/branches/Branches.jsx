import axios from "axios";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { useGlobalState } from "../../context/globalState";
// import BranchModal from "../../components/ui/modals/BranchModal";
import DeleteModal from "../../components/ui/modals/DeleteModal";
import AlertModal from "../../components/ui/modals/AlertModal";
import "./Branches.css";
import EditBranch from "../../components/NewBranchModals/EditBranch";
import Loader from "../../Loader/Loader";
import AddBranch from "../../components/NewBranchModals/AddBranch";
import { getAllArreys } from "../../config/loadData";

function Branches() {
  // context
  const { value, dispatch } = useGlobalState();
  const { branches, isLoading } = value;
  // states
  const [isModal, setIsModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [alertModal, setAlertModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [text, setText] = useState({
    title: "",
    subTitle: "",
    existError: false,
  });
  const [name, setName] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    startLoading("/branches", "GET_BRANCHES");
}, []);

async function startLoading(params, type) {
dispatch({ type, payload: await getAllArreys(params) });
}


  function Delete() {
    // tasdiqlash modalka =si ham o'chib qolyapti, qachonki loading chiqganida
    // dispatch({ type: "LOADING_START" });

    axios
      .delete("/branches/" + id)
      .then((data) => {
        if (data.data.status == 200) {
          setDeleteModal(false);
          setText({
            title: "Muvaffaqiyatli o`chirildi",
            subTitle: "Filial muvaffaqiyatli o`chirildi",
            existError: false,
          });
          dispatch({ type: "DELETE_NEW_BRANCH", payload: id });
          // dispatch({ type: "LOADING_END" });
          setAlertModal(true);
        }
      })
      .catch((err) => {
        if (err.response.data.status == 400) {
          // setDeleteModal(false);
          setText({
            title: "Xatolik",
            subTitle:
              "Siz o`chirmoqchi bo`lgan filialda xodimlar bor",
            existError: true,
          });
          // dispatch({ type: "LOADING_END" });
          setAlertModal(true);
        } else if (err.response.data.error == "BRANCH_NAME_NOT_FOUND") {
          setDeleteModal(false);
          setText({
            title: "Xatolik",
            subTitle: "Bunday filial topilmadi",
            existError: true,
          });
          // dispatch({ type: "LOADING_END" });

          setAlertModal(true);
        }
      });
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="branches">

          <div className="title_page">
            <h4>Filiallar</h4>
            <div>
              {/* App css ga qo`yilgan */}
              <button className="custom_add_btn" onClick={() => setIsModal(true)}>
              {/* <i className="fa-solid fa-circle-plus"></i> Qo'shish */}
                <i className="fas fa-plus"></i>  Qo'shish
              </button>
            </div>
          </div>

          <div className="branch_table">
            <div className="branch_table_head">
              <p>ID</p>
              <p>Nomi</p>
              <p>Xodimlar soni</p>
              <p>Sana</p>
              <p>Tahrirlash</p>
            </div>
            <div className="branch_table_body">
              {branches?.map((item, idx) => {
                return (
                  <div className="branch_table_tbody" key={idx}>
                    <span className="span_table_item">{idx + 1}</span>
                    <span className="span_table_item_name">
                      {item?.branch_name}
                    </span>
                    <span className="span_table_item">{item.users.length} ta</span>
                    <span className="span_table_item">
                      {moment(item?.branch_createdat).format("DD. MM. YYYY")}
                    </span>
                    <span className="span_table_item_btns">
                      <button
                        className="custom_btn"
                        onClick={() => {
                          setEditModal(true);
                          setName(item.branch_name);
                          setId(item.branch_id);
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
                          setDeleteModal(true);
                          setId(item.branch_id);
                          setName(item.branch_name);
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
      )}
      {isModal ? (
        <AddBranch
          id={id}
          setIsModal={setIsModal}
          setAlertModal={setAlertModal}
          setText={setText}
        />
      ) : (
        ""
      )}
      {deleteModal ? (
        <DeleteModal
          setDeleteModal={setDeleteModal}
          deleteItem={Delete}
          name={name}
          subject="Filialni"
        />
      ) : (
        ""
      )}
      {alertModal ? (
        <AlertModal
          title={text.title}
          subTitle={text.subTitle}
          setIsError={setAlertModal}
          setIsModal={setIsModal}
          refresh={branches}
          existError={text.existError}
        />
      ) : (
        ""
      )}
      {editModal ? (
        <EditBranch
          name={name}
          id={id}
          setEditModal={setEditModal}
          setAlertModal={setAlertModal}
          setText={setText}
        />
      ) : (
        ""
      )}
    </>
  );
}

export default Branches;
