import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../../Loader/Loader";
import "./NewBranches.css";
import { useGlobalState } from "../../context/globalState";

function AddBranch({ setIsModal, setAlertModal, setText, id }) {
  // context
  const { value, dispatch } = useGlobalState();
  // const { users } = value;
  // states
  const [loading, setLoading] = useState(false);
  const [BranchName, setBranchName] = useState("");
  const [branchUsers, setBranchUsers] = useState([]);
  // const [searchTerm , setSearchTerm] = useState('');   //qidirish
  const [users1, setUsers1] = useState([]);
  const [users2, setUsers2] = useState([]);
  const [users , setUsers] = useState([])

  // functions
  function Post() {
    postBranch();
    setAlertModal(true);
  }
  function getUsers(){
    axios.get('/users').then(data => {
      setUsers(data.data)
      setUsers1(data.data)
      setUsers2(data.data)
    }
      )

  }

  function branchUserId(id) {
    let added = users1.filter((s) => s.user_id == id);
    setBranchUsers([...branchUsers, added[0]]);
    // 
    let mass = users2.filter((s) => s?.user_id != id);
    setUsers1(mass);
    setUsers2(mass);
  }

  function removeUserFromBranch(id) {
    let mass = branchUsers.filter((s) => s?.user_id != id);
    let selected = branchUsers.filter((s) => s?.user_id == id)[0]
    setUsers1([...users1, selected])
    setBranchUsers(mass);
  }
  
  const extractedIds = branchUsers.map((obj) => obj.user_id);
  const idString = extractedIds.join(",");
  const data = { ids: idString };

  useEffect(() => {
    getUsers()
    
  }, []);

  const searchByName = (searchTerm) => {
    const searchTermLower = searchTerm.toLowerCase();

    const filteredResults = users1.filter((obj) =>{
      const fullName = `${obj.user_firstname} ${obj.user_lastname}`.toLowerCase();
      return fullName.includes(searchTermLower)
    });
    setUsers1(!searchTerm?.length ? users2 : filteredResults);

  };
 

  function postBranch(e) {
    setLoading(true);
    axios
      .post("/branches", { branch_name: BranchName, users: data.ids })
      .then((data) => {
        if (data.data.status == 201) {
          setText({
            title: "Muvaffaqiyatli qo`shildi",
            subTitle: "Filial muvaffaqiyatli qo`shildi",
            existError: false,
          });
          dispatch({ type: "ADD_NEW_BRANCH", payload: data.data.data });
          setIsModal(false);
        }
        setLoading(false);
      })
      .catch((err) => {
        if (err.response.data.error == "BRANCH_NAME_ALREADY_EXIST") {
          setText({
            title: "Xatolik",
            subTitle: "Bu filial nomi mavjud !",
            existError: true,
          });
          setIsModal(true);
        } else if (
          err.response.data.error == "VALIDATION_ERROR_BRANCHNAME_LENGTH"
        ) {
          setText({
            title: "Xatolik",
            subTitle: "Filial nomi 30ta belgidan kam bo'lishi kerak!",
            existError: true,
          });
          setIsModal(true);
        } else if (
          err.response.data.error == "VALIDATION_ERROR_BRANCHNAME_REQUIRED"
        ) {
          setText({
            title: "Xatolik",
            subTitle: "Filial nomini kiritish shart!",
            existError: true,
          });
          setIsModal(true);
        }
        setLoading(false);
      });
    // BRANCH_NAME_ALREADY_EXIST
    // VALIDATION_ERROR_BRANCHNAME_LENGTH
    // VALIDATION_ERROR_BRANCHNAME_REQUIRED
  }
 

  return (
    <>
      {loading && <Loader />}
      <div className="new_wrapper-modal">
        <center>
          <div className="new_add_branch">
            <div className="title_new_modal">
              <h1>Filial qo'shish</h1>
            </div>
            <hr />

            <div className="new_modal_body">
              <div className="left_side">
                <h4>Filial nomini kiriting</h4>
                <input
                  className="input"
                  type="text"
                  placeholder="Filial nomini kiriting..."
                  onChange={(e) => {
                    setBranchName(e.target.value);
                  }}
                  name={BranchName}
                />
                <div className="users_in_branch">
                  {branchUsers.map((item, idx) => {
                    return (
                      <div className="every_user">
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
                <h4>Xodimni qidirish</h4>
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

export default AddBranch;
