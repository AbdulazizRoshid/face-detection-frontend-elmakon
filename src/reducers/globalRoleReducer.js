import React from "react";

function GlobalRoleReducer(state, { type, payload }) {
  switch (type) {
    case "GET_ROLES":
      return {
        ...state,
        roles: payload,
      };
    case "ADD_ROLE":
      return {
        ...state,
        roles: [...state.roles,payload],
      };
    case "DELETE_FROM_ROLE_LIST":
      return {
        ...state,
        roles: state.roles.filter(s=>s.role_id != payload),
      };
    case "EDIT_ROLE":
      return {
        ...state,
        roles: state.roles.map(s=>{
          if(s.role_id == payload.role_id){
            return{
              ...s,
              role_name:payload.role_name,
              role_createdat:payload.role_createdat
            }
          }else{
            return s
          }
        })
      };
    default:
      return state;
  }
}

export default GlobalRoleReducer;
