import React, { useEffect, useState } from "react";
import { useGlobalState } from "../../context/globalState";

function Navbar() {
  // context
  const { value } = useGlobalState();

  const { user } = value;

  // function logOut() {
  //   localStorage.removeItem("token");
  // }
  return (
    <div className="navbar_top">
      {/* user admin route */}
      <p className="greeting" style={{ padding: "0px" }}>
        Hurmatli {user?.user_firstname} kuningiz xayrli o'tsin!
      </p>
      <div className="avatar" id="profile_avatar">
        <div className="name_of_user">
          <div>
          {user?.user_firstname}
          </div>
          <div>{user?.user_lastname}</div>
        </div>
        <div className="image-container" style={{ marginRight: "10px" }}>
          <img
            src={`http://${user?.user_img}`}
            style={{ background: " rgb(0, 84, 155)" }}
            alt="avatar_picture"
          />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
