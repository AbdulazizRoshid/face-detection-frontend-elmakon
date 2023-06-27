import React, { useEffect, useState } from "react";
import { Chart as ChartJs, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJs.register(ArcElement, Tooltip, Legend);


const options = {
  responsive: true,
  cutout: "50%",
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "My Pie Chart",
    },
  },
};
const MyPieChart = ({ data}) => {
  return (
    <div className="real_pie">
      <Pie data={data} options={options} />
    </div>
  );
};

export default MyPieChart;
