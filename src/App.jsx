import { Route, Routes } from "react-router-dom";
import "./App.css";
import Branches from "./Pages/branches/Branches";
import ControllersPaga from "./Pages/Controllers/ControllersPaga";
import MainPage from "./Pages/home/MainPage";
import Login from "./Pages/Login/Login";
import NotFoundPage from "./Pages/NotFoundPage/NotFoundPage";
import Roles from "./Pages/Roles/Roles";
// import SettingsPage from "./Pages/settings/SettingsPage";
import User from "./Pages/users/User";
// import UserProfile from "./Pages/users/UserProfile";
import Report from "./Pages/Report/Report";
import HomePage from "./Pages/main/HomePage";
// import Loader from "./Loader/Loader";

function App() {
  return (
    <div className="App">
      {/* <Loader /> */}
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<MainPage />}>
          {/* Users uchun path */}
          <Route path="/" element={<HomePage />} />
          <Route path="users" element={<User />} />
          {/* <Route path="get-one-user/:userId" element={<UserProfile />} /> */}
          <Route path="controllers" element={<ControllersPaga />} />

          {/* Branches uchun path */}

          <Route path="branches" element={<Branches />} />
          <Route path="roles" element={<Roles />} />

          <Route path="report" element={<Report />} />
        </Route>
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
