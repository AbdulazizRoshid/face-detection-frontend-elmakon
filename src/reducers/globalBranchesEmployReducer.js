import React from "react";

function GlobalBranchesEmployReducer(state, { type, payload }) {
  switch (type) {
    case "GET_BRANCHES_EMPLOY":
      return {
        ...state,
        branchesEmploy: payload,
      };
    default:
      return state;
  }
}

export default GlobalBranchesEmployReducer;
