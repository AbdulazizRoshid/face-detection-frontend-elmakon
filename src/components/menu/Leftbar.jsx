import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../../utils/logo.png";
// import Logo from "../../utils/Elmakon_logo.png";

function Leftbar() {
  const navigate = useNavigate();
  function logOut() {
    localStorage.removeItem("token");
    navigate(-1);
  }

  let btsMass = [
    {
      id: 1,
      icon: "fa-solid fa-house icon_ch",
      title: "Asosiy sahifa",
      link: "/",
    },
    {
      id: 2,
      icon: "fa-solid fa-user-group  icon_ch",
      title: "Xodimlar",
      link: "/users",
    },
    {
      id: 3,
      icon: "fa-sharp fa-solid fa-location-dot  icon_ch",
      title: "Filiallar",
      link: "/branches",
    },
    // {
    //   id: 4,
    //   icon: "fa-solid fa-tablet-screen-button icon_ch",
    //   title: "Kontrollerlar",
    //   link: "/controllers",
    // },
    {
      id: 5,
      icon: "fa-solid fa-briefcase icon_ch",

      title: "Kasblar",
      link: "/roles",
    },
    {
      id: 6,
      icon: "fa-solid fa-square-poll-vertical  icon_ch",
      title: "Hisobot",
      link: "/report",
    },
  ];
  return (
    <div className="left_bar">
      <div className="logo">
        <img src={Logo} alt="" className="ElmakonLogo" />
      </div>
      <div className="btns">
        {btsMass?.map((s) => {
          return (
            <NavLink className="btn_navigate btn " to={s.link} key={s.id}>
              <span className="icon_part">
                <i className={s.icon}></i>
              </span>
              <span>{s.title}</span>
            </NavLink>
          );
        })}
        <button className="btn_navigate btn " onClick={logOut}>
          <span className="icon_part">
            <i className="fa-solid fa-arrow-right-from-bracket  icon_ch last-child"></i>
          </span>
          <span>Chiqish</span>
        </button>
      </div>
    </div>
  );
}

export default Leftbar;
