import React, { useEffect, useState } from "react";
import "./controller_components.css";
import exit from "../../utils/icons/exit.png";
import axios from "axios";
import SoloSelect from "../selection/SoloSelect";
import AlertModal from "../ui/modals/AlertModal";
import {useGlobalState} from '../../context/globalState'
function ControllerPostComponent({ setIsOpenControllerModal }) {

  //context

  const {value, dispatch} = useGlobalState()
  const {branches} = value

  //states
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
  },[])


  

  
  
  function postController(){
    axios.post('/controllers' , {
      controller_name: ControllerName,
      controller_url: url,
      controller_username: email,
      controller_password: password,
      branch_id: mainBranch,
    }).then(data => {
      console.log(data);
      if(data.data.message == 'Controller successfully created'){
        console.log('hello');
        setText({
          title: "Muvaffaqiyatli qo`shildi",
          subTitle: "Controller muvaffaqiyatli qo`shildi",
          existError:false
        });
        dispatch({type:'ADD_NEW_CTRL', payload:data?.data?.data[0]})
        setAlertModal(true)
        setIsOpenControllerModal(true)
      }
      else if(data.data.error == 'VALIDATION_ERROR_CONTROLLERUSERNAME_REQUIRED'){
        setText({
          title: "Xatolik",
          subTitle: "Email kiritish shart",
          existError:true
        });
        setAlertModal(true)
        setIsOpenControllerModal(true)
      }
      else if(data.data.error == 'VALIDATION_ERROR_CONTROLLERNAME_STRING'){
        setText({
          title: "Xatolik",
          subTitle: "Kerakli maydonlarni to'ldirishingiz shart!",
          existError:true
        });
        setAlertModal(true)
        setIsOpenControllerModal(true)
      }
      else if(data.data.error == 'VALIDATION_ERROR_CONTROLLERURL_STRING'){
        setText({
          title: "Xatolik",
          subTitle: "Kerakli maydonlarni to'ldirishingiz shart!",
          existError:true
        });
        setAlertModal(true)
        setIsOpenControllerModal(true)
      }
      else if(data.data.error == 'VALIDATION_ERROR_CONTROLLERNAME_REQUIRED'){
        setText({
          title: "Xatolik",
          subTitle: "Controller nomini kiritish shart",
          existError:true
        });
        setAlertModal(true)
        setIsOpenControllerModal(true)
      }
      else if(data.data.error == 'VALIDATION_ERROR_CONTROLLERURL_REQUIRED'){
        setText({
          title: "Xatolik",
          subTitle: "Controller url manzilini kiritish shart",
          existError:true
        });
        setAlertModal(true)
        setIsOpenControllerModal(true)
      }
      else if(data.data.message == 'controller_password kiritish majburiy'){
        setText({
          title: "Xatolik",
          subTitle: "Parol kiritish shart",
          existError:true
        });
        setAlertModal(true)
        setIsOpenControllerModal(true)
      }
    }).catch(err => {
      if(err.response.data.error == 'CONTROLLER_ALREADY_EXISTS'){
        setText({
          title: "Xatolik",
          subTitle: "Bu controller mavjud!",
          existError:true
        });
        setAlertModal(true)
        setIsOpenControllerModal(true)
      }
      else if(err.response.data.error == 'CONTROLLER_BRANCHID_ALREADY_EXISTS'){
        setText({
          title: "Xatolik",
          subTitle: "Bu controller mavjud!",
          existError:true
        });
        setAlertModal(true)
        setIsOpenControllerModal(true)
      }
      else if(err.response.data.error == 'CONTROLLER_URL_ALREADY_EXISTS'){
        setText({
          title: "Xatolik",
          subTitle: "Bu controller mavjud!",
          existError:true
        });
        setAlertModal(true)
        setIsOpenControllerModal(true)
      }
      
    })
  }

  return (
    <div className="controller_post_modal">
      <div className="controller_post_field" onClick={(w)=>w.stopPropagation()}>
        <div className="controller_post_header">
          <h3>Controller qo'shish</h3>
          <img
            src={exit}
            alt="exit_icnon"
            className="exit_user_icnon"
            onClick={() => setIsOpenControllerModal(false)}
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
              <label className="form-label label_text">Email</label>
              <input
                type="email"
                className="form-control user_input_field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@gmail.com"
              />
            </div>
            <div className="col ">
              <label className="form-label label_text">Parol</label>
              <input
                type="password"
                className="form-control user_input_field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="*****"
              />
            </div>
            <div className="col">
            <label className="form-label label_text">Filial tanlash</label>
              <select
                className="form-control user_input_field"
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
            <button onClick={()=>setIsOpenControllerModal(false)} className="red">Bekor qilish</button>
            <button onClick={()=>postController()} className="green">Saqlash</button>
          </div>
        </div>
      </div>
      {alertModal ? (
        <AlertModal
          title={text.title}
          subTitle={text.subTitle}
          setIsError={setAlertModal}
          setIsModal={setIsOpenControllerModal}
          // refresh={LoadBranches}
          existError={text.existError}
        />
      ) : (
        ""
      )}
      
    </div>
  );
}

export default ControllerPostComponent;
