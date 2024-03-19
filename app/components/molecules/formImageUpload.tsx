import { useState } from "react";

interface stateActivityList {
  id: number;
  name: string;
  activity: string;
}

interface FormImageUploadProps {
  register: any;
  initValue?: number;
  dataActivityList: stateActivityList[];
}

const FormImageUpload = ({ register, initValue, dataActivityList }: FormImageUploadProps) => {
  const [dataActivityListSelection, setDataActivityListSelection] =
    useState(initValue);

  const handleSelectionChange = (e: any) => {
    setDataActivityListSelection(e.target.value);
  };

  return (
    <div className="flex flex-col gap-0 w-full">
      <label className="font-semibold text-sm md:text-base mb-1">
        Type of activity
      </label>
      <select
        required
        {...register("id_activityList")}
        value={dataActivityListSelection}
        onChange={handleSelectionChange}
        className="text-xs w-full md:text-sm px-3 py-2 bg-white text-custBlack/70 rounded-md border active:outline-none focus:outline-none focus:border-custBlack/70 font-normal"
      >
        <option disabled>--Activity List--</option>
        {dataActivityList.map((item: stateActivityList, index: number) => {
          return (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormImageUpload;
