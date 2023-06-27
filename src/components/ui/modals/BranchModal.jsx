import axios from "axios";
import React, { useState } from "react";
import Loader from '../../../Loader/Loader'
import { useGlobalState } from "../../../context/globalState";

function BranchModal({ setIsModal, setAlertModal, setText , id}) {

  const {value,dispatch} = useGlobalState();

  const [loading , setLoading] = useState(false)
  const [BranchName, setBranchName] = useState("");
  

  function Post() {
    postBranch();
    setAlertModal(true);
  }

  function postBranch(e) {
    setLoading(true)
    axios
      .post("/branches", { branch_name: BranchName })
      .then((data) => {
        if (data.data.status == 201) {
          setText({
            title: "Muvaffaqiyatli qo`shildi",
            subTitle: "Filial muvaffaqiyatli qo`shildi",
            existError:false  
          });
          dispatch({type:'ADD_NEW_BRANCH', payload:data.data.data})
          setIsModal(false)
        }
        setLoading(false)
      })
      .catch(err => {
        if(err.response.data.error == 'BRANCH_NAME_ALREADY_EXIST'){
          setText({
            title: "Xatolik",
            subTitle: "Bu filial nomi mavjud !",
            existError:true
          });
          setIsModal(true)
        }
        else if(err.response.data.error == 'VALIDATION_ERROR_BRANCHNAME_LENGTH'){
          setText({
            title: "Xatolik",
            subTitle: "Filial nomi 30ta belgidan kam bo'lishi kerak!",
            existError:true
          });
          setIsModal(true)
        }
        else if(err.response.data.error == 'VALIDATION_ERROR_BRANCHNAME_REQUIRED'){
          setText({
            title: "Xatolik",
            subTitle: "Filial nomini kiritish shart!",
            existError:true
          });
          setIsModal(true)
        }
        setLoading(false)
      })
      // BRANCH_NAME_ALREADY_EXIST
      // VALIDATION_ERROR_BRANCHNAME_LENGTH
      // VALIDATION_ERROR_BRANCHNAME_REQUIRED
      
      
  }


  return (
    <>
      {loading && <Loader />}
      <div className="wrapper-modal">
        <center>
          <div className="modal-branch">
            <h1>Filial qo'shish</h1>
            <hr />
            <div className="modal-body">
              <h4>Filial nomini kiriting</h4>
              <input
                type="text"
                placeholder="Filial nomini kiriting..."
                onChange={(e) => {
                  setBranchName(e.target.value);
                }}
                name={BranchName}
              />
            </div>
            <hr />
            <div className="buttons-group d-flex align-items-center justify-content-end gap-3">
              <button className="red" onClick={() => setIsModal(false)}>
                Bekor qilish
              </button>
              <button type="submit" className="green" onClick={() => Post()}>
                Saqlash
              </button>
            </div>
          </div>
        </center>
      </div>
    </>
  );
}

export default BranchModal;
