import React from "react";

function AlertModal({ title, subTitle, existError, setIsError , setIsModal}) {
  function closeModal() {
    setIsError(false);
    if(existError == true){
      setIsModal(true)
    }else{
      setIsModal(false)
    }
  }

  return (
    <div className="wrapper-modal">
      <center>
        <div className="alert-modal">
          <center>
            <h1>{title}</h1>
            <h4>{subTitle}</h4>
            <button
              className="green"
              onClick={() => {
                closeModal();
              }}
            >
              OK
            </button>
          </center>
        </div>
      </center>
    </div>
  );
}

export default AlertModal;
