import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserProfileLeftBar from "../../components/userProfileComponents/UserProfileLeftBar";
import "./user_profile.css";

import UserProfileRightBar from "./../../components/userProfileComponents/UserProfileRightBar";
import UserProfileAllowedBranchesBar from "../../components/userProfileComponents/UserProfileAllowedBranchesBar";

function UserProfile() {
  // params
  const { userId } = useParams();
  // states
  const [user, setUser] = useState("");
  const [report, setReport] = useState([
    {
      id: 1,
      user_firstname: "Bahodrijon",
      user_lastname: "Qurbonov",
      user_createdat: Date.now(),
      icon: <i class="fa-solid fa-clock"></i>,
      come: Date.now(),
      go: Date.now(),
    },
    {
      id: 2,
      user_firstname: "Bahodrijon",
      user_lastname: "Qurbonov",
      user_createdat: Date.now(),
      icon: <i class="fa-solid fa-clock"></i>,
      come: Date.now(),
      go: Date.now(),
    },
    {
      id: 3,
      user_firstname: "Bahodrijon",
      user_lastname: "Qurbonov",
      user_createdat: Date.now(),
      icon: <i class="fa-solid fa-clock"></i>,
      come: Date.now(),
      go: Date.now(),
    },
    {
      id: 4,
      user_firstname: "Bahodrijon",
      user_lastname: "Qurbonov",
      user_createdat: Date.now(),
      icon: <i class="fa-solid fa-clock"></i>,
      come: Date.now(),
      go: Date.now(),
    },
    {
      id: 4,
      user_firstname: "Bahodrijon",
      user_lastname: "Qurbonov",
      user_createdat: Date.now(),
      icon: <i class="fa-solid fa-clock"></i>,
      come: Date.now(),
      go: Date.now(),
    },
    {
      id: 4,
      user_firstname: "Bahodrijon",
      user_lastname: "Qurbonov",
      user_createdat: Date.now(),
      icon: <i class="fa-solid fa-clock"></i>,
      come: Date.now(),
      go: Date.now(),
    },
    {
      id: 4,
      user_firstname: "Bahodrijon",
      user_lastname: "Qurbonov",
      user_createdat: Date.now(),
      icon: <i class="fa-solid fa-clock"></i>,
      come: Date.now(),
      go: Date.now(),
    },
    {
      id: 4,
      user_firstname: "Bahodrijon",
      user_lastname: "Qurbonov",
      user_createdat: Date.now(),
      icon: <i class="fa-solid fa-clock"></i>,
      come: Date.now(),
      go: Date.now(),
    },
    {
      id: 4,
      user_firstname: "Bahodrijon",
      user_lastname: "Qurbonov",
      user_createdat: Date.now(),
      icon: <i class="fa-solid fa-clock"></i>,
      come: Date.now(),
      go: Date.now(),
    },
  ]);

  useEffect(() => {
    getOne();
  }, [userId]);

  const getOne = () => {
    axios
      .get("/users/" + userId)
      .then((data) => {
        console.log(userId);
        console.log(data);
        setUser(data.data);
      })
      .catch((err) => {
        console.log("xatolik", err);
      });
  };



  return (
    <div className="user_profile_page">
      {/* left */}
      <UserProfileLeftBar user={user} />
      {/* right */}
      <UserProfileRightBar report={report} />
      {/* Allowed branches */}
      {/* <UserProfileAllowedBranchesBar branches={user?.allowed_branches} /> */}
    </div>
  );
}

export default UserProfile;
