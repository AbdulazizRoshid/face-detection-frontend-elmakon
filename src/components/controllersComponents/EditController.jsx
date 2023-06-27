import React, { useEffect, useState } from "react";
import "./controller_components.css";
import exit from "../../utils/icons/exit.png";
import axios from "axios";
import SoloSelect from "../selection/SoloSelect";
import AlertModal from "../ui/modals/AlertModal";

import { useGlobalState } from "../../context/globalState";
function EditController({ setUpdateController , id}) {
  // context
  const {value, dispatch} = useGlobalState();
  const {branches} = value;


  // states


  const [ControllerName , setControlName] = useState('')
  const [url , setUrl] = useState('')
  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')
  const [mainBranch, setMainBrach] = useState("");
  const [alertModal, setAlertModal] = useState(false);
  const [text, setText] = useState({
    title: "",
    subTitle: "",
    existError: false,
  });


  

  useEffect(()=>{
    setMainBrach(branches[0].branch_id)
    LoadControllerData();
  },[]);
  // controllerni nomini va linkni o`zgartirgan xolda filial nomini ham o'zgartirmoqchi bo'linsa hech narsa o'zgarmayapti



  function LoadControllerData() {
    axios
      .get("/controller/" + id) 
      .then((data) => {
        setControlName(data.data.controller_name);
        setUrl(data.data.controller_url);
        setEmail(data.data.controller_username);
        setPassword(data.data.controller_password);
        setMainBrach(data.data.branch?.branch_id);
      })
      .catch((err) => console.log(err));
  }
  function patchController(){
    axios.patch('/controllers/' + id , {
      controller_name: ControllerName,
      controller_url: url,
      controller_username: email,
      controller_password: password,
      branch_id: mainBranch,
    }).then(data => {
      if (data.data.status == 200) {
        setText({
          title: "Muvaffaqiyatli tahrirlandi",
          subTitle: "Controller muvaffaqiyatli tahrirlandi",
          existError:false      
        });
        dispatch({type:'UPDATE_CONTROLLERS', payload:data?.data?.data})
        // setUpdateController(false)
        setAlertModal(true)
      }
    }).catch(err => {
      if(err.response.data.error == 'CONTROLLER_ALREADY_EXISTS'){
        setText({
          title: "Xatolik",
          subTitle: "Bu controller mavjud!",
          existError:true
        });
        setAlertModal(true)
        setUpdateController(true)
      }
      else if(err.response.data.error == 'CONTROLLER_BRANCHID_ALREADY_EXISTS'){
        setText({
          title: "Xatolik",
          subTitle: "Bu controller mavjud!",
          existError:true
        });
        setAlertModal(true)
        setUpdateController(true)
      }
    })
  }
  return (
    <div className="controller_post_modal" onClick={()=>setUpdateController(false)}>
      <div className="controller_post_field" onClick={(w)=>w.stopPropagation()}>
        <div className="controller_post_header">
          <h3>Controllerni tahrirlash</h3>
          <img
            src={exit}
            alt="exit_icnon"
            className="exit_user_icnon"
            onClick={() => setUpdateController(false)}
          />
        </div>
        <div className="controller_post_body">
          <form>
            <div className="col ">
              <label className="form-label label_text">Controller nomi</label>
              <input
                type="text"
                className="form-control user_input_field"
                value={ControllerName}
                onChange={(e) => setControlName(e.target.value)}
                placeholder="Nom kiriting..."
              />
            </div>
            <div className="col ">
              <label className="form-label label_text">URL</label>
              <input
                type="text"
                className="form-control user_input_field"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                placeholder="URL kiriting..."
              />
            </div>
            <div className="col ">
              <label className="form-label label_text">Username</label>
              <input
                type="email"
                className="form-control user_input_field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="@Username..."
              />
            </div>
            <div className="col ">
              <label className="form-label label_text">Parol</label>
              <input
                type="password"
                className="form-control user_input_field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Parol..."
              />
            </div>
            <div className="col">
            <label className="form-label label_text">Filial tanlash</label>
              <select
                className="form-control user_input_field"
                value={mainBranch}
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
            </div>
          </form>
        </div>
        <div className="controller_post_footer">
          <div className="controller_bts_group d-flex align-items-center justify-content-end gap-3 me-3">
            <button className="red" onClick={() => setUpdateController(false)}>Bekor qilish</button>
            <button onClick={()=>patchController()} className="green">Saqlash</button>
          </div>
        </div>
      </div>
      {alertModal ? (
        <AlertModal
          title={text.title}
          subTitle={text.subTitle}
          setIsError={setAlertModal}
          setIsModal={setUpdateController}
          refresh={null}
          existError={text.existError}
        />
      ) : (
        ""
      )}
      
    </div>
  );
}


export default EditController;
