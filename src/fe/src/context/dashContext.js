import React, { useReducer, createContext, useState } from "react";

const initialState = {
  city: null,
  state: null,
  users: null,
  messageBoardId: null,
  cityPortalId: null,
};

const DashContext = createContext({
  city: null,
  state: null,
  users: [],
  messageBoardId: null,
  cityPortalId: null,
  getPortalData: (portalData) => {},
});


function dashReducer(state, action) {
  console.log("This is state: ", action)
  switch (action.type) {
    case "PORTAL_DATA":
      return {
        ...state,
        city: action.payload.city,
        state: action.payload.state,
        users: action.payload.users,
        messageBoardId: action.payload.messageBoard._id,
      };
    default:
      return state;
  }
}

function DashContextProvider(props) {
  const [state, dispatch] = useReducer(dashReducer, initialState);

  const getPortalData = (portalData) => {
    dispatch({
      type: "PORTAL_DATA",
      payload: portalData,
    });
  };

  const value = {
    city: state.city,
    state: state.state,
    users: state.users,
    messageBoardId: state.messageBoardId,
    getPortalData,
  }


  return (
    <DashContext.Provider
      value={value}
    >
      {props.children}
    </DashContext.Provider>
  );
}

export { DashContext, DashContextProvider };
