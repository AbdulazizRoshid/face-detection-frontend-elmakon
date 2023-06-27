import React, { useEffect, useState } from "react";
import "./homepage.css";
import MyPieChart from "../../components/diagram/PieChart";
import { useGlobalState } from "../../context/globalState";
import axios from "axios";
import { getAllArreys } from "../../config/loadData";


export default function HomePage() {
  const { value, dispatch } = useGlobalState();
  const { branches, users, roles,  } = value;
  const [branchesEmploy,setBranchesEmploy] = useState([]);
  const [rolesEmploy,setRolesEmploy] = useState([]);

  const [data1, setData] = useState({
    // labels: ["Red", "Blue", "Yellow", "purple",'green'],
    datasets: [
      {
        label: "# of Votes",
        data: [],
        backgroundColor: [
          "#00376B",
          "#1F4E7C",
          "#0054A5",
          "#3585D2",
          "#5E99D2",
        ],
        borderColor: ["white"],
        borderWidth: 1,
      },
    ],
  });
  const [data2, setData2] = useState({
    // labels: ["Red", "Blue", "Yellow", "purple",'green'],
    datasets: [
      {
        label: "# Filiallar",

        data: [],
        backgroundColor: [
          "#00376B",
          "#1F4E7C",
          "#0054A5",
          "#3585D2",
          "#5E99D2",
        ],
        borderColor: ["white"],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    getDiagramInfo();
  }, []);

 

  const getDiagramInfo = () => {
    startLoading("/users", "GET_USERS");
    startLoading("/branches", "GET_BRANCHES");
    startLoading("/userRole", "GET_ROLES");
    axios
      .get("/dashboard/branchUsers")
      .then((data) => {
        setBranchesEmploy(data?.data)
        
        let numLenth = [];
        data?.data.forEach((item, idx) => {
          numLenth.push(item?.num_employees);
        });
        let newObj = {
          // labels: ["Red", "Blue", "Yellow", "purple",'green'],
          datasets: [
            {
              label: ['Filiallar'],

              data: numLenth,
              backgroundColor: [
                /*"#00376B",
                  "#1F4E7C",
                  "#0054A5",
                  "#3585D2",
                  "#5E99D2" */
                "#014B4B",
                "#175656",
                "#027373",
                "#31B9B9",
                "#55B9B9"

              ],
              borderColor: ["white"],
              borderWidth: 1,
            },
          ],
        };
        setData(newObj);
      })
      .catch((err) => console.log(err));
    axios
      .get("/dashboard/roleUsers")
      .then((data) => {
        setRolesEmploy(data?.data)
        let numLenth = [];
        data?.data.forEach((item, idx) => {
          numLenth.push(item?.num_employees);
        });
        let newObj = {
          // labels: ["Red", "Blue", "Yellow", "purple",'green'],
          datasets: [
            {
              label: "# Xodimlar",

              data: numLenth,
              backgroundColor: [
                "#014B4B",
                "#175656",
                "#027373",
                "#31B9B9",
                "#55B9B9"
              ],
              borderColor: ["white"],
              borderWidth: 1,
            },
          ],
        };
        setData2(newObj);
      })
      .catch((err) => console.log(err));
  };
  async function startLoading(params, type) {
    dispatch({ type, payload: await getAllArreys(params) });
  }


  return (
    <div className="mainPage">
      <div className="pie_cards">
        <div className="pie_cards_div">
          <i className=" fa-sharp fa-solid fa-location-dot"></i>
          <div>
            <h6 className="digram_text_style">Filial</h6>
            <h4 className="digram_text_style_number">{branches?.length} ta</h4>
          </div>
        </div>
        <div className="pie_cards_div">
          <i className="fa-solid fa-user-group"></i>
          <div>
            <h6 className="digram_text_style">Xodim</h6>
            <h4 className="digram_text_style_number">{users?.length} ta</h4>
          </div>
        </div>
        <div className="pie_cards_div">
          <i className="fa-solid fa-briefcase"></i>
          <div>
            <h6 className="digram_text_style">Kasb</h6>
            <h4 className="digram_text_style_number">{roles?.length} ta</h4>
          </div>
        </div>

      </div>
      <div className="pie_charts">
        <div className="left_pie_charts">
          <p className="diagram_text_style_box">Filial bo'yicha xodimlar soni</p>

          <div className="left_pie_chart_diagram">
            {/* Diagram */}
            <div className="diagram_pie_box">
              <MyPieChart data={data1} />
            </div>
            <div className="diagram_info_box">
              {branchesEmploy?.map((s, idx) => {

                let colors = [
                  "#014B4B",
                  "#175656",
                  "#027373",
                  "#31B9B9",
                  "#55B9B9"
                ];
                return (
                  <div className="diagram_info" key={idx}>
                    <div className="d-flex align-items-center gap-1">
                      <p
                        style={{
                          background: colors[idx],
                          width: "15px",
                          borderRadius: "50%",
                          height: "15px",
                        }}
                      ></p>
                      <p className="digram_info_text_style">{s.branch_name}</p>
                    </div>
                    <p className="digram_info_text_style">
                      {s.num_employees} ta
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="left_pie_charts">
          <p className="diagram_text_style_box">Kasb bo'yicha xodimlar soni</p>

          <div className="left_pie_chart_diagram">
            {/* Diagram */}
            <div className="diagram_pie_box">
              <MyPieChart data={data2} />
            </div>
            <div className="diagram_info_box">
              {rolesEmploy?.map((s, idx) => {

                let colors = [
                  "#014B4B",
                  "#175656",
                  "#027373",
                  "#31B9B9",
                  "#55B9B9"
                ];
                return (
                  <div className="diagram_info" key={idx}>
                    <div className="d-flex align-items-center gap-1">
                      <p
                        style={{
                          background: colors[idx],
                          width: "15px",
                          borderRadius: "50%",
                          height: "15px",
                        }}
                      ></p>
                      <p className="digram_info_text_style">{s.role_name}</p>
                    </div>
                    <p className="digram_info_text_style">
                      {s.num_employees} ta
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
