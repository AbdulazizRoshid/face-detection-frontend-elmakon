import React from "react";
import PercentageShower from "./PercentageShower";
import moment from "moment";

function UserProfileRightBar({ report }) {
  return (
    <div className="user_profile_right_bar">
      <div className="user_profile_right_bar_down_part">
        <div className="user_profile_right_bar_down_part_header">
          <span className="bar_headlines">Faol</span>
          <div>
            <span className="come_go" >Keldi</span>
            <i
              className="fa-solid fa-arrows-left-right mx-2"
              style={{ color: "#027373" }}
            ></i>
            <span className="come_go" >Ketdi</span>
          </div>
        </div>
        <div className="user_profile_report">
          {report?.map((s, idx) => {
            return (
              <div className="per_report">
                <div className="per_report_first_box">
                  <div>{moment(s.user_createdat).format("MMMM Do")}</div>
                  <div>
                    {s.user_lastname}
                    {s.user_firstname}
                  </div>
                </div>
                <div>
                  {s.icon} {moment(s.come).format("h:mm ")}{"- "}
                  {moment(s.go).format("h:mm")}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default UserProfileRightBar;
