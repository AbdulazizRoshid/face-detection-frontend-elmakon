import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Leftbar from "../../components/menu/Leftbar";
import Navbar from "../../components/menu/Navbar";
import AlertModal from "../../components/ui/modals/AlertModal";
import { getAllArreys } from "../../config/loadData";

import { userValidate } from "../../validator/userValidator";
import "./home.css";
import { useGlobalState } from "../../context/globalState";
import Loader from "../../Loader/Loader";
import HomePage from "../main/HomePage";

export default function MainPage() {
  // context
  const { dispatch, value } = useGlobalState();
  const { isLoading } = value;

  // satates
  const [existToken, setExistToken] = useState(false);
  const [text, setText] = useState("");
  const [isError, setIsError] = useState(false);
  // helper-navigator
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  useEffect(() => {
    dispatch({ type: "LOADING_START" });
    loadCheckUser();
    // eslint-disable-next-line
  }, [token]);

  useEffect(() => {
    startLoading("/users/getme", "GET_AUTH");

    // eslint-disable-next-line
  }, [token]);

  // loadData

  async function startLoading(params, type) {
    dispatch({ type, payload: await getAllArreys(params) });
  }

  // loadCheckUser

  function loadCheckUser() {
    axios.defaults.headers.common["Authorization"] = token;
    axios
      .get("/check-user", {
        headers: {
          Authorization: token,
        },
      })
      .then((data) => {
        if (data?.status === 200) {
          if (data?.data.ok) {
            setExistToken(true);
          }
        }
      })
      .catch((err) => {
        setText({
          title: "Xatolik",
          subTitle: userValidate(err?.response?.data?.error),
          existError: true,
        });
        setIsError(!isError);
        navigate("/login");
      });
    dispatch({ type: "LOADING_END" });
  }

  return isLoading ? (
    <Loader />
  ) : existToken ? (
    <div className="home">
      <div className=" shablon">
        <Leftbar />
      </div>
      <div className="shablon_right ">
        <Navbar />
        <Outlet />
      </div>
    </div>
  ) : (
    isError && (
      <AlertModal
        title={text?.title}
        subTitle={text?.subTitle}
        existError={text?.existError}
        setIsError={setIsError}
      />
    )
  );
}
