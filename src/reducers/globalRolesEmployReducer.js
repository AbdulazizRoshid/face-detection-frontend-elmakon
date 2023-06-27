import React from "react";

function GlobalRolesEmployReducer(state, { type, payload }) {
  switch (type) {
    case "GET_ROLES_EMPLOY":
      return {
        ...state,
        rolesEmploy: payload,
      };
    default:
      return state;
  }
}

export default GlobalRolesEmployReducer;
