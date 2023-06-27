import React, { useState } from "react";
import "./Report.css";
import AlertModal from "../../components/ui/modals/AlertModal";
import axios from "axios";

function Report() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const [alertModal, setAlertModal] = useState(false);
  const [text, setText] = useState({
    title: "",
    subTitle: "",
    existError: false,
  });

  
 


  
  const GetReport = () => {
    const fromPart = from.split('-');
    const formatterFrom = `${fromPart[2]}-${fromPart[1]}-${fromPart[0]}`;
    const toPart = to.split('-');
    const formatterTo = `${toPart[2]}-${toPart[1]}-${toPart[0]}`;

    axios.post('/uploadexcell', { from : formatterFrom, to : formatterTo }, { responseType: 'arraybuffer' })
    .then(response => {
      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Report.xlsx');
      document.body.appendChild(link);
      link.click();
  })
    .catch(err => {
      if(err.response.status == 402){
        setText({
          title: "Xatolik",
          subTitle:"Hisobot sanasi noto'g'ri belgilangan !",
          existError: true,
        })
      }
      setAlertModal(true)
    });

  }
  
  
  

  const fromReport = (e) => {
    setFrom(e.target.value);
  };
  const toReport = (e) => {
    setTo(e.target.value);
  };

  function notAllowedButton() {
    if (
      !from.length ||
      !to.length 
    ) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <>
    <div className="form d-flex align-items-center justify-content-around">
      <input onChange={fromReport} type="date" className="form-control" />
      <input onChange={toReport} type="date" className="form-control" />
      <button onClick={GetReport} className="btn report-btn" disabled={notAllowedButton()} style={{
                  opacity: notAllowedButton() && "0.7",
                  cursor: notAllowedButton() && "not-allowed",
                }}>
        Hisobotni olish
      </button>
    </div>
    {alertModal ? (
      <AlertModal
        title={text.title}
        subTitle={text.subTitle}
        setIsError={setAlertModal}
        existError={text.existError}
      />
    ) : (
      ""
    )}
    </>
  );
}

export default Report;
