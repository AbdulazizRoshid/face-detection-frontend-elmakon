import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./setting_page.css";

function SettingsPage() {
  let options = [
    { id: 1, title: "Kasblar", route: "/settings/roles", isDisabled: false },
    {
      id: 2,
      title: "Filiallar",
      route: "/settings/branches",
      isDisabled: true,
    },
    { id: 3, title: "Xodimlar", route: "/settings/users", isDisabled: true },
  ];

  return (
    <>
      <div className="seeting_main_class">
        <div className="settings_options_bar" style={{borderLeft: '1px solid white'}}>
          {options?.map((s, idx) => {
            return (
              <Link
                to={s.route}
                className=" option_bar_text"
                id="settings_anime"
                key={idx}
              >
                <div
                  className="option_bar"
                  style={{
                    opacity: s.isDisabled && 0.8,
                    background: s.isDisabled && "red",
                    cursor:s.isDisabled && "not-allowed"
                  }}
                >
                  {s.title}
                </div>
              </Link>
            );
          })}
        </div>
        <div className="settings_pages">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default SettingsPage;
