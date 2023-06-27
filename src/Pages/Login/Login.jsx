import axios from "axios";
import React, { useState } from "react";
import { userValidate } from "../../validator/userValidator";
import { useNavigate } from "react-router-dom";

import "./Login.css";
import AlertModal from "./../../components/ui/modals/AlertModal";
import { useEffect } from "react";
import { useGlobalState } from "../../context/globalState";
import Loader from "../../Loader/Loader";
function Login() {
  // context
  const { value, dispatch } = useGlobalState();
  const { user, isLoading } = value;

  // states

  const [text, setText] = useState("");
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    dispatch({ type: "LOADING_START" });
    loadCheckUser();
  }, [token]);

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
            navigate("/");
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
        // navigate("/login");
      });
    dispatch({ type: "LOADING_END" });
  }

  function submit(e) {
    e.preventDefault();
    axios
      .post("/login", {
        user_email: data.email,
        user_password: data.password,
      })
      .then((data) => {
        if (data?.status === 200) {
          localStorage.setItem("token", data?.data?.token);
          navigate("/");
        }
      })
      .catch((err) => {
        if (err?.message == "Network Error") {
          setText({
            title: "Xatolik",
            subTitle: "Tarmoqqa ulanishda xatolik",
            existError: true,
          });
          setIsError(!isError);
          return;
        }
        setText({
          title: "Xatolik",
          subTitle: userValidate(err?.response?.data?.error),
          existError: true,
        });
        setIsError(!isError);
      });
  }

  function handle(e) {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
  }

  return (
    <div className="container_login">
      {isError && (
        <AlertModal
          title={text?.title}
          subTitle={text?.subTitle}
          existError={text?.existError}
          setIsError={setIsError}
        />
      )}
      {isLoading ? (
        <Loader />
      ) : (
        <center>
          <div className="login">
            <h1>Login</h1>
            <p>Tizimga kirish uchun login parolingizni kiriting!</p>
            <form onSubmit={submit}>
              <label htmlFor="Email">Login</label>
              <input
                onChange={(e) => handle(e)}
                id="email"
                value={data.email}
                type="email"
                className="form-control input_login"
                placeholder="Email"
              />
              <label htmlFor="Password">Parol</label>
              <input
                onChange={(e) => handle(e)}
                id="password"
                value={data.password}
                type="password"
                placeholder="********"
                className="form-control input_password"
              />
              <center>
                <button type="submit" className="button" onClick={submit}>
                  Tizimga Kirish
                </button>
              </center>
            </form>
          </div>
        </center>
      )}
    </div>
  );
}

export default Login;


