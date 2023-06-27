import { createContext, useContext, useReducer } from "react";
import GlobalRoleReducer from "../reducers/globalRoleReducer";
import GlobalUserReducer from "../reducers/globalUserReducer";
import GlobalBranchReducer from "./../reducers/globalBranchReducer";
import GlobalControllerReducer from "./../reducers/globalControllerReducer";
import GlobalAuthReducer from "../reducers/globalAuthReducer";
import GlobalLoadingReducer from "../reducers/globalLoadingReducer";
import GlobalBranchesEmployReducer from "../reducers/globalBranchesEmployReducer";
import GlobalRolesEmployReducer from "../reducers/globalRolesEmployReducer";

const GlobalContext = createContext();

const initialState = {
  users: [],
  branches: [],
  branchesEmploy: [],
  roles: [],
  rolesEmploy: [],
  controllers: [],
  user: {},
  isLoading: false,
};

// Combine multiple reducers into a single reducer function
const rootReducer = (state, action) => ({
  globalUser: GlobalUserReducer(state.globalUser, action),
  globalBranch: GlobalBranchReducer(state.globalBranch, action),
  globalRole: GlobalRoleReducer(state.globalRole, action),
  globalController: GlobalControllerReducer(state.globalController, action),
  globalAuth: GlobalAuthReducer(state.globalAuth, action),
  globalLoading: GlobalLoadingReducer(state.globalLoading, action),
  globalBranchesEmploy: GlobalBranchesEmployReducer(
    state.globalBranchesEmploy,
    action
  ),
  globalRolesEmploy: GlobalRolesEmployReducer(state.globalRolesEmploy, action),
});

export default function GlobalContextConfig({ children }) {
  const [value, dispatch] = useReducer(rootReducer, {
    globalUser: initialState,
    globalBranch: initialState,
    globalRole: initialState,
    globalController: initialState,
    globalAuth: initialState,
    globalLoading: initialState,
    globalBranchesEmploy: initialState,
    globalRolesEmploy: initialState,
  });

  const globalStorage = {
    users: value?.globalUser.users,
    branches: value?.globalBranch.branches,
    roles: value?.globalRole.roles,
    controllers: value?.globalController.controllers,
    user: value?.globalAuth.user,
    isLoading: value?.globalLoading.isLoading,
    branchesEmploy: value?.globalBranchesEmploy.branchesEmploy,
    rolesEmploy: value?.globalRolesEmploy.rolesEmploy,
  };

  return (
    <GlobalContext.Provider value={{ value: globalStorage, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
}

const useGlobalState = () => useContext(GlobalContext);

export { useGlobalState };
