import React, { useState } from "react";

interface FormDropDownProps {
  register: any;
  initValue?: number;
  dataActivityList?: stateActivityList[];
  dataActivity?: stateActivity[];
}

interface stateActivityList {
  id: number;
  name: string;
  activity: string;
}

interface stateActivity {
  id: number;
  name: string;
  createdAt: Date;
}

const FormDropDown = ({
  register,
  initValue,
  dataActivity,
}: FormDropDownProps) => {
  const [dataActivitySelection, setDataActivitySelection] = useState(initValue);

  const handleSelectionChange = (e: any) => {
    setDataActivitySelection(e.target.value);
  };

  return (
    <select
      required
      {...register("id_activity")}
      value={dataActivitySelection}
      onChange={handleSelectionChange}
      className="text-xs w-full md:text-sm px-3 py-2 bg-white text-custBlack/70 rounded-md border active:outline-none focus:outline-none focus:border-custBlack/70 font-normal"
    >
      <option disabled>--Activity--</option>
      {dataActivity?.map((item, index) => {
        return (
          <option key={index} value={item.id}>
            {item.name}
          </option>
        );
      })}
    </select>
  );
};

export default FormDropDown;
