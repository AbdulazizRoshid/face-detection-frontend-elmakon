import React from "react";

function GlobalBranchReducer(state, { type, payload }) {
  switch (type) {
    case "GET_BRANCHES":
      return {
        ...state,
        branches: payload,
      };
    case "ADD_NEW_BRANCH":
      return {
        ...state,
        branches: [...state.branches, payload],
      };
    case "DELETE_NEW_BRANCH":
      return {
        ...state,
        branches: state.branches.filter((s) => s?.branch_id !== payload),
      };
    case "EDIT_NEW_BRANCH":
      return {
        ...state,
        branches: state.branches.map((s) => {
          if (s?.branch_id == payload?.branch_id) {
            return {
              ...s,
              branch_name:payload?.branch_name,
              createdat:payload?.createdat,
              branch_delete:payload?.branch_delete,
              users:payload?.users
            };
          } else {
            return s;
          }
        }),
      };
    default:
      return state;
  }
}

export default GlobalBranchReducer;
