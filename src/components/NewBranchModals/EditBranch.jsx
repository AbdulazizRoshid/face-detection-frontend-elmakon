import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../../Loader/Loader";
// import { useGlobalState } from "../../../context/globalState";
import "./NewBranches.css";
import { useGlobalState } from "../../context/globalState";

function EditBranch({ setEditModal, setAlertModal, setText, id, name }) {
  // context
  const { value, dispatch } = useGlobalState();
  const { users, branches } = value;
  // states
  const [loading, setLoading] = useState(false);
  const [BranchName, setBranchName] = useState("");
  const [branchUsers, setBranchUsers] = useState([]);
  // const [searchTerm , setSearchTerm] = useState('');   //qidirish
  const [users1, setUsers1] = useState([]);
  const [users2, setUsers2] = useState([]);

  // state
  const [usersInBranch, setUsersInBranch] = useState([]);

  // functions
  function Patch() {
    patchBranch();
    setAlertModal(true);
  }


  useEffect(() => {
    // har safar yangi userlarni qo'shib yuborayapti
    axios.get("/users").then((data) => {
      const branchById = branches.find((item) => item.branch_id == id);
      const result = removeCommonObjects(branchById.users, data?.data);
      setUsers1(result);
      setUsersInBranch(branchById.users);
      setUsers2(result);
    });
  }, [id]);

  function removeCommonObjects(arr1, arr2) {
    for (let i = 0; i < arr1.length; i++) {
      for (let j = 0; j < arr2.length; j++) {
        if (arr1[i].user_id === arr2[j].user_id) {
          arr2.splice(j, 1);
        }
      }
    }
    return arr2;
  }

  const searchByName = (searchTerm) => {
    const searchTermLower = searchTerm.toLowerCase();

    const filteredResults = users2.filter((obj) =>{
      const fullName = `${obj.user_firstname} ${obj.user_lastname}`.toLowerCase();
      return fullName.includes(searchTermLower)
    });
    setUsers1(!searchTerm?.length ? users2 : filteredResults);

  };


  function patchBranch(e) {
    const extractedIds = usersInBranch.map((obj) => obj.user_id);
    const idString = extractedIds.join(",");
    const data = { ids: idString };

    // setLoading(true);
    axios
      .patch("/branches/" + id, { branch_name: BranchName, users: data.ids })
      .then((data) => {
        if (data.data.status == 200) {
          
          setText({
            title: "Muvaffaqiyatli o`zgartirildi",
            subTitle: "Filial nomi muvaffaqiyatli o`zgartirildi",
            existError: false,
          });
          dispatch({ type: "EDIT_NEW_BRANCH", payload: data?.data?.data });
        }
      })
      .catch((err) => {
        if (err.response.data.error == "BRANCH_NAME_ALREADY_EXIST") {
          setText({
            title: "Xatolik",
            subTitle: "Bu filial nomi mavjud !",
            existError: true,
          });
        } else if (
          err.response.data.error == "VALIDATION_ERROR_BRANCHNAME_LENGTH"
        ) {
          setText({
            title: "Xatolik",
            subTitle: "Filial nomi 30ta belgidan kam bo'lishi kerak!",
            existError: true,
          });
        } else if (
          err.response.data.error == "VALIDATION_ERROR_BRANCH_STRING"
        ) {
          setText({
            title: "Xatolik",
            subTitle: "Filial nomini kiritish shart!",
            existError: true,
          });
        } else if (
          err.response.data.error == "VALIDATION_ERROR_BRANCHNAME_REQUIRED"
        ) {
          setText({
            title: "Muvaffaqiyatli o`zgartirildi",
            subTitle: "Filial nomi muvaffaqiyatli o`zgartirildi",
            existError: false,
          });
        } else if (err.message == "Network Error") {
          setText({
            title: "Xatolik",
            subTitle: "Tarmoqqa ulanishda xatolik",
            existError: true,
          });
        }
        setEditModal(true);
      });
    // BRANCH_NAME_ALREADY_EXIST
    // VALIDATION_ERROR_BRANCHNAME_LENGTH
    // VALIDATION_ERROR_BRANCHNAME_REQUIRED
  }
  function branchUserId(id) {
    let added = users1.filter((s) => s.user_id == id);
    setUsersInBranch([...usersInBranch, added[0]]);
    // 
    let mass = users2.filter((s) => s?.user_id != id);
    setUsers1(mass);
    setUsers2(mass);
  }

  function removeUserFromBranch(id) {
    let mass = usersInBranch.filter((s) => s?.user_id != id);
    let added = usersInBranch.filter((s) => s.user_id == id)[0];
    // setUsers1([...users1, added[0]]);
    // setUsers2([...users2, added[0]]);
    setUsers1([...users1, added])
    setUsers2([...users2, added])
    setUsersInBranch(mass);
  }

  return (
    <>
      {loading && <Loader />}
      <div className="new_wrapper-modal">
        <center>
          <div className="new_add_branch">
            <div className="title_new_modal">
              <h1>Filialni tahrirlash</h1>
            </div>
            <hr />

            <div className="new_modal_body">
              <div className="left_side">
                <h4>Filial nomini kiriting</h4>
                <input
                  className="input"
                  type="text"
                  placeholder="Filial nomini kiriting..."
                  defaultValue={name}
                  onChange={(e) => {
                    setBranchName(e.target.value);
                  }}
                  name={BranchName}
                />
                <div className="users_in_branch">
                  {usersInBranch.map((item, idx) => {
                    return (
                      <div className="every_user" key={idx}>
                        <span>{item?.user_firstname}</span>
                        <span>{item?.user_lastname}</span>
                        <input
                          type="checkbox"
                          className="check"
                          checked={item.user_id && true}
                          onChange={() => removeUserFromBranch(item?.user_id)}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="right_side">
                <h4>Xodimni kiriting</h4>
                <input
                  className="input"
                  type="text"
                  placeholder="Ism yoki Familiya kiriting"
                  onChange={(e) => {
                    searchByName(e.target.value);
                  }}
                />
                <div className="all_users_list">
                  {users1?.map((item, idx) => {
                    return (
                      <div className="every_user" key={idx}>
                        <span>{item?.user_firstname}</span>
                        <span>{item?.user_lastname}</span>
                        <input
                          type="checkbox"
                          className="check"
                          checked={false}
                          onChange={() => branchUserId(item?.user_id)}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <hr />

            <div className="buttons-group d-flex align-items-center justify-content-end gap-3">
              <button className="red" onClick={() => setEditModal(false)}>
                Bekor qilish
              </button>
              <button type="submit" className="green" onClick={() =>{
                 Patch();
                 setEditModal(false)
              }}>
                Saqlash
              </button>
            </div>
          </div>
        </center>
      </div>
    </>
  );
}

export default EditBranch;
