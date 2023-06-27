// GlobalControllerReducer
import React from "react";

function GlobalControllerReducer(state, { type, payload }) {
  switch (type) {
    // bajarilgan

    case "GET_CONTROLLERS":
      return {
        ...state,
        controllers: payload,
      };
    // bajarilmagan

    case "ADD_NEW_CTRL":
      return {
        ...state,
        controllers: [...state.controllers, payload],
      };
    // bajarilmagan
    case "UPDATE_CONTROLLERS":
      return {
        ...state,
        controllers: state.controllers.map((s) => {
          if (s.controller_id == payload.controller_id) {
            return payload;
          } else {
            return s;
          }
        }),
      };
    // bajarilgan

    case "DELETE_CONTROLLERS":
      return {
        ...state,
        controllers: state.controllers.filter(
          (s) => s.controller_id != payload
        ),
      };
    default:
      return state;
  }
}

export default GlobalControllerReducer;
