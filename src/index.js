import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

import GlobalContextConfig from "./context/globalState";
const token = localStorage.getItem("token");

axios.defaults.headers.common["Authorization"] = token;
axios.defaults.baseURL = process.env.REACT_APP_URI;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
      {/* <BranchesListContext>
        <UserListContext>
          <RoleListContext>
            <ControllerListContext> */}
              <GlobalContextConfig>
                <App />
              </GlobalContextConfig>
            {/* </ControllerListContext>
          </RoleListContext>
        </UserListContext>
      </BranchesListContext> */}
  </BrowserRouter>
);
