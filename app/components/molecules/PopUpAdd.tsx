"use client";

import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import InputField from "../atoms/inputField";
import { useState, useEffect } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { setToaster } from "@/app/redux/slices/reduxToasterSlices";
import { getAllDataActivity } from "@/app/helpers/activityHelpers";
import { setPopupAdd } from "@/app/redux/slices/reduxPopupAddSlices";
import {
  addDataListActivity,
  getAllDataListActivity,
} from "@/app/helpers/listActivityHelpers";
import { usePathname } from "next/navigation";
import FormImageUpload from "./formImageUpload";
import imageHelper from "@/app/helpers/imageHelper";
import { addNewsData } from "@/app/helpers/newsHelper";
import { FaSpinner } from "react-icons/fa";

interface stateActivity {
  id: number;
  name: string;
  createdAt: Date;
}

interface stateActivityList {
  id: number;
  activity: string;
  name: string;
}

interface dataNews {
  id: number;
  title: string;
  description: string;
  date: Date;
  note: string | null;
  path: string;
}

interface PopupDataProps {
  show: boolean;
  id_activity: number;
  id_activityList: number;
  id_image: number;
  url_image: string;
  activityList: string;
  activity: string;
  dataNews: dataNews;
  title: string;
  description: string;
  date: Date;
  note: string;
  path: string;
}

const PopUpAdd = () => {
  const [whileSubmit, setWhileSubmit] = useState(false);
  const [dataActivity, setDataActivity] = useState<stateActivity[]>([]);
  const [dataActivityList, setDataActivityList] = useState<stateActivityList[]>(
    []
  );
  const dispatch = useDispatch();
  const location = usePathname();
  const dataPopup = useSelector((state: any) => state.popupAdd.data);
  const { handleSubmit, register, reset } = useForm();
  const [dataUrl, setDataUrl] = useState("");

  const handleCancel = () => {
    dispatch(setPopupAdd({ show: false }));
  };

  const handlePath = async (data: PopupDataProps) => {
    switch (location) {
      case "/dashboard/activity-list":
        return await addDataListActivity(data.id_activity, data.activityList);
      case "/dashboard/storage-image":
        return await imageHelper(data.id_activityList, dataUrl);
      case "/dashboard/news":
        const newNewsData = { 
          title: data.title,
          description: data.description,
          date: data.date,
          note: data.note,
          path: data.path,
        };
        console.log("NEWS DATA : ", newNewsData);
        
        return await addNewsData(newNewsData);
      default:
        return "";
    }
  };

  const handleConfirm = async (data: any) => {
    handleWhileSubmit();

    console.log("Send Data : ", data);

    const res = await handlePath(data);

    console.log("response : ",res);

    if (res) {
      dispatch(setPopupAdd({ show: false }));
      dispatch(
        setToaster({
          message: `Data added successfully`,
          show: true,
        })
      );
      handleWhileSubmit();
      reset();
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }

    if (!res) {
      dispatch(
        setToaster({ message: "Failed to add data to Database", show: true })
      );
      handleWhileSubmit();
    }
  };

  const handleWhileSubmit = () => {
    setWhileSubmit((prev) => !prev);
  };

  const handleUpload = (e: any) => {
    console.log("Data : ", e.target.files[0]);

    const file = e.target.files[0];

    const reader = new FileReader();

    if (file) {
      if (
        !file.type.startsWith("image/png") &&
        !file.type.startsWith("image/jpeg")
      ) {
        alert("Hanya file PNG, JPG atau JPEG yang diizinkan.");
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        alert("Ukuran berkas terlalu besar. Maksimum 10MB diizinkan.");
        return;
      }

      reader.readAsDataURL(file);
      reader.onloadend = () => {
        console.log("Data URL : ", reader.result);

        setDataUrl(reader.result as string);
      };
    }
  };

  const handletitle = () => {
    switch (location) {
      case "/dashboard/activity-list":
        return "Add List Activity";
      case "/dashboard/news":
        return "Add News";
      case "/dashboard/storage-image":
        return "Add Image";
      default:
        return "";
    }
  };

  useEffect(() => {
    if (dataPopup.type === "/dashboard/activity-list") {
      const getDataActivity = async () => {
        const res = await getAllDataActivity();
        // console.log("Data Activity : ", res);

        if (res) {
          setDataActivity(res);
        }
      };

      getDataActivity();
    }

    if (location === "/dashboard/storage-image") {
      const getDataListActivity = async () => {
        const res = await getAllDataListActivity();

        if (res) {
          setDataActivityList(res);
          setDataUrl(dataPopup.url_image);
        }
      };

      getDataListActivity();
    }
  }, [dataPopup]);

  const handleInputForm = () => {
    switch (location) {
      case "/dashboard":
        return (
          <>
            <InputField
              label="Name"
              placeholder={dataPopup.activity}
              type="text"
              regist={register("activity")}
            />
          </>
        );
      case "/dashboard/activity-list":
        return (
          <>
            <div className="flex flex-col gap-0">
              <label className="font-semibold text-sm md:text-base mb-1">
                Type of activity
              </label>
              <select
                required
                {...register("id_activity")}
                className="text-xs w-full md:text-sm px-3 py-2 bg-white text-custBlack/70 rounded-md border active:outline-none focus:outline-none focus:border-custBlack/70 font-normal"
              >
                <option disabled>--Activity--</option>
                {dataActivity.map((item: stateActivity, index) => {
                  return (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <InputField
              label="Name"
              type="text"
              placeholder="Input activity list name"
              regist={register("activityList")}
            />
            <p className="text-xs text-gray-400">
              &#42;Note: This activity name will be used for the activity list
            </p>
          </>
        );

      case "/dashboard/storage-image":
        return (
          <>
            <FormImageUpload
              register={register}
              dataActivityList={dataActivityList}
            />
            <div className="flex flex-col gap-3 items-center justify-center w-full mt-2">
              {dataUrl ? (
                <div className="w-fit">
                  <img src={dataUrl} className="w-full h-40" alt="MissingIMG" />
                </div>
              ) : (
                <div className="w-full flex flex-col justify-center items-center mt-3">
                  <FiUploadCloud className="text-custPrimary size-10" />
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Only PNG, JPG or JPEG, max 10MB
                  </p>
                </div>
              )}

              <input
                id="dropzone-file"
                {...register("file_image")}
                onChange={handleUpload}
                type="file"
                name="file"
                accept=".png, .jpg, .jpeg"
              />
            </div>
          </>
        );

      case "/dashboard/news":
        return (
          <>
            <InputField
              label="Title"
              placeholder="Your News Title"
              type="text"
              regist={register("title")}
            />
            <InputField
              label="Description"
              placeholder="Short Description"
              type="message"
              regist={register("description")}
            />
            <InputField label="Date" type="date" regist={register("date")} />
            <InputField
              label="Note (Opsional)"
              placeholder="Give some information"
              type="text"
              regist={register("note")}
            />
            <InputField
              label="Path"
              placeholder="https://"
              type="text"
              regist={register("path")}
            />
          </>
        );

      default:
        break;
    }
  };

  return (
    dataPopup.show && (
      <div className="w-screen h-screen fixed overflow-hidden flex justify-center items-center bg-black/70 z-50">
        <motion.form
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ duration: 0.3 }}
          className="w-8/12 h-fit relative rounded-lg flex flex-col gap-5 items-start justify-start text-custBlack p-10 bg-custWhite"
        >
          <div className="flex flex-col items-start gap-1 w-full">
            <p className="border-b w-full pb-2">
              <span className="text-custPrimary font-semibold text-lg">
                {handletitle()}
              </span>
            </p>
            {handleInputForm()}
          </div>

          {/* CONFIRM BUTTON */}
          {
            <div className="w-full flex justify-center items-center gap-5 mt-10">
              <button
                onClick={handleCancel}
                className="border-2 border-custBackground whitespace-nowrap text-custBackground hover:text-gray-400 text-base font-semibold px-4 sm:px-6 py-2 text-center rounded-lg transition-all duration-150"
              >
                cancel
              </button>
              <button
                onClick={handleSubmit(handleConfirm)}
                disabled={whileSubmit}
                className="flex items-center gap-2 text-white bg-custPrimary cursor-pointer hover:bg-custPrimary/80 text-lg font-semibold px-8 sm:px-6 py-2 rounded-lg transition-all duration-150"
              >
                {whileSubmit && (
                  <FaSpinner className="animate-spin size-3" />
                )}
                confirm
              </button>
            </div>
          }
        </motion.form>
      </div>
    )
  );
};

export default PopUpAdd;
