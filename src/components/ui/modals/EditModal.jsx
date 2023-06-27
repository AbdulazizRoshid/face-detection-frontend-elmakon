import axios from "axios";
import React, { useState } from "react";
import { useGlobalState } from "../../../context/globalState";

function EditModal({ setEditModal, setAlertModal, setText, id , name}) {

  const {dispatch} = useGlobalState(); 

  const [BranchName, setBranchName] = useState("");

  function Patch() {
    editBranch();
    setEditModal(false)
    setAlertModal(true)
  }

  function editBranch() {
    axios
      .patch(`/branches/` + id, { branch_name: BranchName })
      .then((data) => {
        if (data.data.status == 200) {
          setText({
            title: "Muvaffaqiyatli o`zgartirildi",
            subTitle: "Filial nomi muvaffaqiyatli o`zgartirildi",
            existError: false,
          });
         
          dispatch({type:'EDIT_NEW_BRANCH', payload:data?.data?.data});
        }
        
      })
      .catch((err) =>{
        if(err.response.data.error == 'BRANCH_NAME_ALREADY_EXIST'){
          setText({
            title: "Xatolik",
            subTitle: "Bu filial nomi mavjud !",
            existError:true
          });
        }
        else if(err.response.data.error == 'VALIDATION_ERROR_BRANCHNAME_LENGTH'){
          setText({
            title: "Xatolik",
            subTitle: "Filial nomi 30ta belgidan kam bo'lishi kerak!",
            existError:true
          });
        }
        else if(err.response.data.error == 'VALIDATION_ERROR_BRANCH_STRING'){
          setText({
            title: "Xatolik",
            subTitle: "Filial nomini kiritish shart!",
            existError:true
          });
        }
        else if(err.response.data.error == 'VALIDATION_ERROR_BRANCHNAME_REQUIRED'){
          setText({
            title: "Muvaffaqiyatli o`zgartirildi",
            subTitle: "Filial nomi muvaffaqiyatli o`zgartirildi",
            existError: false,
          });
        }
      });
      // VALIDATION_ERROR_BRANCHNAME_REQUIRED
      // VALIDATION_ERROR_BRANCHNAME_LENGTH
      // VALIDATION_ERROR_BRANCH_STRING
      
  }

  const postData = (e) => {
    setBranchName(e.target.value);
  };

  return (
    <>
      <div className="wrapper-modal">
        <center>
          <div className="modal-branch">
            <h1>Filialni tahrirlash</h1>
            <hr />
            <div className="modal-body">
              <h4>Filial nomini kiriting</h4>
              <input
                type="text"
                placeholder="Filial nomini kiriting..."
                onChange={postData}
                name={BranchName}
                defaultValue={name}
              />
            </div>
            <hr />
            <div className="buttons-group d-flex align-items-center justify-content-end gap-3">
              <button className="red" onClick={() => setEditModal(false)}>
                Bekor qilish
              </button>
              <button type="submit" className="green" onClick={() => Patch()}>
                Saqlash
              </button>
            </div>
          </div>
        </center>
      </div>
    </>
  );
}

export default EditModal;
