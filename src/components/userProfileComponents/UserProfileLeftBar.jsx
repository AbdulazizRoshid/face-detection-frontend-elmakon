import React from "react";

function UserProfileLeftBar({user}) {
  return (
    <div className="user_profile_left_bar">
      <div className="user_profile_settings_avatar">
        <img src={`http://${user?.user_img}`} alt="avatar" className="mb-2" />
        <div>
          <h3 className="user_profile_name">
            {user?.user_firstname} {user?.user_lastname}
          </h3>
        </div>
        <div className="d-flex justify-content-between px-4">
          <h5>Profil</h5>
          {/* <span>
            <i className="fa-solid fa-pen-to-square mx-2"></i>
            Tahrirlash
          </span> */}
        </div>
      </div>
      {/*  */}

      <div className="user_profile_settings">
        <div className="user_profile_settings_div">
          <i className="fa-solid fa-user-tie" style={{ marginRight: "5px" }}></i>
          <span>
            Hodim haqida
            <div>
              {user?.user_firstname} {user?.user_lastname}
            </div>
            <div>{user?.role?.role_name}</div>
          </span>
        </div>
        <div className="user_profile_settings_div">
          {/* <i class="fa-solid fa-user-tie"></i> */}
          <i
            className="fa-solid fa-address-book"
            style={{ marginRight: "5px" }}
          ></i>
          <span>
            Kontakt
            <div> {user?.user_email}</div>
            <div> +998 90 854 18 17</div>
          </span>
        </div>
        <div className="user_profile_settings_div">
          <i
            className="fa-sharp fa-solid fa-location-dot"
            style={{ marginRight: "5px" }}
          ></i>
          <span>
            Manzil
            <div> Noyabrda qo'shilgan</div>
            <div>O'zbekiston farg'ona v.</div>
            <div>Lutfiy ko'chasi 12</div>
          </span>
        </div>
      </div>
    </div>
  );
}

export default UserProfileLeftBar;
