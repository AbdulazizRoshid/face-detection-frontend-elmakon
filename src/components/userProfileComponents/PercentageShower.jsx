import React from "react";

function PercentageShower(props) {
  const barStyle = {
    width: `${props.value}%`,
    backgroundColor: "#027373",
    height: "10px",
    borderRadius: "10px",
  };

  const labelStyle = {
    fontSize: "16px",
    fontWeight: "bold",
  };

  return (
    <div className="py-2">
      <div style={barStyle}></div>
      <div style={labelStyle}>{props.value}%</div>
    </div>
  );
}

export default PercentageShower;
