// GlobalControllerReducer
import React from "react";

function GlobalLoadingReducer(state, { type, payload }) {
  switch (type) {
    // bajarilgan
    case "LOADING_START":
      return {
        ...state,
        isLoading: true,
      };
    case "LOADING_END":
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}

export default GlobalLoadingReducer;
