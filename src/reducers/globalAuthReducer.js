import React from 'react'

function GlobalAuthReducer(state, { type, payload }) {

  switch (type) {
    case 'GET_AUTH':
      return {
        ...state,
        user: payload,
      }
    default:
      return state
  }
}

export default GlobalAuthReducer
