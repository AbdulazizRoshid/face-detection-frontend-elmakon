import React, { useEffect } from "react";
import { Select } from "antd";
import { useGlobalState } from "../../context/globalState";

function MultiSelect({ setAllowedBranches, allowedBranches }) {

  const {value} = useGlobalState();
  const {branches} = value;
  const getFilter = () => {
    return branches?.map((s, idx) => {
      return {
        value: s.branch_id,
        label: s.branch_name,
      };
    });
  };

  const handleChange = (value) => {
    setAllowedBranches(value);
  };
  return (
    <label className="user_input_field" id="multi_select">
      <Select
        bordered={allowedBranches?.length}
        // onFocus={}
        className="multi_selection"
        mode="multiple"
        value={allowedBranches}
        placeholder="Ruhsat etilgan filiallar"
        onChange={handleChange}
        options={getFilter()}
      />
    </label>
  );
}

export default MultiSelect;
