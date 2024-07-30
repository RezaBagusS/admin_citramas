import { useState } from "react";
import { useSelector } from "react-redux";

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

const FormImageUpload = ({ register, dataActivityList }: FormImageUploadProps) => {

  const select = useSelector((state: any) => state.select.data.select);

  console.log(dataActivityList.filter((item) => item.name.toLowerCase() === select.toLowerCase()));
  let dataActivityListHandle = dataActivityList.filter((item) => item.name.toLowerCase() === select.toLowerCase()).length === 0 ? [] : dataActivityList.filter((item) => item.name.toLowerCase() === select.toLowerCase())[0].id;

  const [dataActivityListSelection, setDataActivityListSelection] =
    useState(dataActivityListHandle);

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
