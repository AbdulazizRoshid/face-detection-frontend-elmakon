import React from "react";
import { useState } from "react";

function UserProfileAllowedBranchesBar({branches = []}) {


  return (
    <div className="user_profile_right_bar">
      <div className="user_profile_right_bar_down_part">
        <div className="user_profile_right_bar_down_part_header">
          <span className="bar_headlines">Ruxsat etilgan Filiallar</span>
          <div className="edit_icon_div">
            <i
              className="fa-solid fa-edit mx-2"
              style={{ color: "#027373"}}
            ></i>
          </div>
        </div>
        <div className="user_profile_report">
          {
          branches.length ?
          branches?.map((s, idx) => {
            return (
              <div className="per_report_branch">
                <div>
                    <span>{idx+1}</span>
                </div>
                <div className="per_report_box">
                  <div>{s?.branch_name?.slice(0, 16)}...</div>
                  <div>
                    <i
                      className="fa-solid fa-trash mx-2"
                      style={{ color: "#C00303", cursor:"pointer" }}
                    ></i>
                  </div>
                </div>
              </div>
            );
          })
          :
          <p className="text-center">Ma`lumotlar topilmadi</p>
        }
        </div>
      </div>
    </div>
  );
}

export default UserProfileAllowedBranchesBar;
