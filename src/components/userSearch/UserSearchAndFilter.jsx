import React, { useEffect, useState } from "react";
import "./user_search_and_filter.css";
import SoloSelect from "../selection/SoloSelect";
import { useGlobalState } from "../../context/globalState";
import { getApiFunction } from "../../config/loadData";
import axios from "axios";
function UserSearchAndFilter() {
  const { value } = useGlobalState();
  const { roles } = value;

  const [search, setSearch] = useState({
    name: "",
    email: "",
    job: "",
  });

  useEffect(() => {
    setSearch({ ...search, job: roles[0]?.role_id });
  }, []);

  async function getSearch() {
    // getApiFunction('/users/search',search)
    await axios
    .post('/users/search',)
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err?.response?.data?.error);
    });

  }

  return (
    <div className="user_search_and_filter">
      <div className="user_filter_inputs">
        <label
          // for="exampleInputEmail1"
          className="form-label label_text_filter"
        >
          Ism
        </label>
        <input
          value={search.name}
          onChange={(e) => setSearch({ ...search, name: e.target.value })}
          type="email"
          className="form-control user_input_field"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
      </div>
      <div className="user_filter_inputs">
        <label
          // for="exampleInputEmail1"
          className="form-label label_text_filter"
        >
          Email
        </label>
        <input
          value={search.email}
          onChange={(e) => setSearch({ ...search, email: e.target.value })}
          type="email"
          className="form-control user_input_field"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
      </div>
      <div className="user_filter_inputs">
        <label
          // for="exampleInputEmail1"
          className="form-label label_text_filter"
        >
          Kasbi
        </label>
        <select
          className="form-control user_input_field"
          value={search.job}
          onChange={(e) => setSearch({ ...search, job: e.target.value })}
        >
          {roles?.map((item, idx) => {
            return (
              <SoloSelect
                name={item.role_name}
                value={item.role_id}
                key={idx}
              />
            );
          })}
        </select>
      </div>
      <div className="filter_search_btn">
        <div style={{ cursor: "pointer" }} onClick={getSearch}>
          <p style={{ margin: "0px" }}>Qidirish</p>
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
      </div>
    </div>
  );
}

export default UserSearchAndFilter;
