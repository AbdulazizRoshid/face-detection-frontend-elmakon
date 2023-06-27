import React from "react";

function GlobalUserReducer(state, { type, payload }) {
  switch (type) {
    case "GET_USERS":
      return {
        ...state,
        users: payload,
      };
    case "ADD_NEW_USER":
      return {
        ...state,
        users: [...state.users, payload],
      };
    case "EDIT_USER":
      return {
        ...state,
        users: state.users.map((s)=>{
          if(s?.user_id == payload?.user_id){
            return{
              ...s,
              user_firstname:payload?.user_firstname,
              user_lastname:payload?.user_lastname,
              user_email:payload?.user_email,
              user_password:payload?.user_password,
              user_img:payload?.user_img,
              role:payload?.role,
              branch:payload?.branch,
              user_createdat:payload?.user_createdat,
            }
          }else{
            return s
          }
        }),
      };
    case "DELETE_FROM_USERS":
      return {
        ...state,
        users: state.users.filter(s=>s.user_id !== payload),
      };

    default:
      return state;
  }
}

export default GlobalUserReducer;
