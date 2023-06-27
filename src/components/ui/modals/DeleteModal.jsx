import React from 'react'

function DeleteModal({setDeleteModal,name,subject,deleteItem,}) {
  return (
    <div className="wrapper-modal">
      <center>
        <div className="delete-modal">
          <h1>{subject} o'chirish</h1> <br />
          <h4>
            <span className="text-danger">{name}</span>{' '}
            ni o'chirishni istaysizmi ?
          </h4>{" "}
          <br />
          <div className="buttons-group d-flex align-items-center justify-content-center gap-3">
            <button className="green pt-1 pb-1" onClick={deleteItem}>O'chirish</button>
            <button className="green-border ps-5 pe-5 pt-1 pb-1" onClick={()=>setDeleteModal(false)}>
              Bekor qilish
            </button>
          </div>
        </div>
      </center>
    </div>
  );
}

export default DeleteModal
