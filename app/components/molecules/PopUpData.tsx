"use client";

import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import InputField from "../atoms/inputField";
import { setPopup } from "@/app/redux/slices/reduxPopupUpdateSlices";
import { useEffect, useState } from "react";
import { updateDataImage } from "@/app/helpers/imageHelper";
import { FiUploadCloud } from "react-icons/fi";
import {
  getAllDataActivity,
  updateDataActivity,
} from "@/app/helpers/activityHelpers";
import { setToaster } from "@/app/redux/slices/reduxToasterSlices";
import {
  getAllDataListActivity,
  updateDataListActivity,
} from "@/app/helpers/listActivityHelpers";
import { usePathname } from "next/navigation";
import FormImageUpload from "./formImageUpload";
import FormDropDown from "./formDropdown";
import { updateNewsData } from "@/app/helpers/newsHelper";
import { FaSpinner } from "react-icons/fa";

// TYPE: /dashboard, /dashboard/activity-list, /dashboard/news, /dashboard/storage-image

interface stateProps {
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

const PopupData = () => {
  const [whileSubmit, setWhileSubmit] = useState(false);
  const dispatch = useDispatch();
  const [dataActivity, setDataActivity] = useState<stateProps[]>([]);
  const [dataActivityList, setDataActivityList] = useState<stateActivityList[]>(
    []
  );
  const [dataUrl, setDataUrl] = useState<string>("");
  const dataPopup: PopupDataProps = useSelector(
    (state: any) => state.popupUpdate.data
  );
  const { handleSubmit, register, reset } = useForm();
  const location = usePathname();

  const handleCancel = () => {
    dispatch(setPopup({ show: false }));
    reset();
  };

  const handlePath = async (data: PopupDataProps) => {
    switch (location) {
      case "/dashboard":
        return await updateDataActivity(dataPopup.id_activity, data.activity);
      case "/dashboard/activity-list":
        return await updateDataListActivity(
          dataPopup.id_activityList,
          data.id_activity,
          data.activityList
        );
      case "/dashboard/storage-image":
        return await updateDataImage(
          dataPopup.id_image,
          data.id_activityList,
          dataUrl
        );
      case "/dashboard/news":
        const updateDataNews = {
          id: dataPopup.dataNews.id,
          title: data.title,
          description: data.description,
          date: data.date,
          note: data.note,
          path: data.path,
        };
        return await updateNewsData(updateDataNews);
        
      default:
        return "";
    }
  };

  const handleConfirm = async (data: any) => {
    handleWhileSubmit();

    console.log("Data : ", data);

    if (
      data.id_activity == 0 ||
      data.id_activityList == 0 ||
      data.id_image == 0
    ) {
      dispatch(setToaster({ message: "Field can't be empty", show: true }));
      return;
    }

    const res = handlePath(data);

    res
      .then((res) => {
        console.log("Res : ",res);
        dispatch(setPopup({ show: false }));
        dispatch(setToaster({ message: "Data has been updated", show: true }));
        reset();
        setTimeout(() => {
          window.location.reload();
        }, 700);
      })
      .catch((err) => {
        console.log(err);
        dispatch(setToaster({ message: "Failed to update data", show: true }));
      })
      .finally(() => {
        handleWhileSubmit();
      });
  };

  const handleWhileSubmit = () => {
    setWhileSubmit((prev) => !prev);
  };

  useEffect(() => {
    if (location === "/dashboard/activity-list") {
      const getDataActivity = async () => {
        const res = await getAllDataActivity();
        if (res) {
          setDataActivity(res);
        }
      };

      getDataActivity();
    }

    if (location === "/dashboard/storage-image") {
      const getDataActivity = async () => {
        const res = await getAllDataListActivity();

        console.log("Data : ", res);

        if (res) {
          setDataActivityList(res);
          setDataUrl(dataPopup.url_image);
        }
      };

      getDataActivity();
    }
  }, [dataPopup]);

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
        setDataUrl(reader.result as string);
      };
    }
  };

  const handletitle = () => {
    switch (location) {
      case "/dashboard":
        return "Update Activity";
      case "/dashboard/activity-list":
        return "Update List Activity";
      case "/dashboard/news":
        return "Update News";
      case "/dashboard/storage-image":
        return "Update Image";
      default:
        return "";
    }
  };

  function formatDate(date: Date): string {
    const format = new Date(date).toLocaleDateString("en-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    return format;
  }

  const handleInputForm = () => {
    switch (location) {
      case "/dashboard":
        return (
          <>
            <InputField
              label="Name"
              placeholder={dataPopup.activity}
              defaultValue={dataPopup.activity}
              type="text"
              regist={register("activity")}
            />
            <p className="text-xs text-gray-400">
              &#42;Note: This activity name will be used for the activity list
            </p>
          </>
        );
      case "/dashboard/activity-list":
        return (
          <>
            <div className="flex flex-col gap-0">
              <label className="font-semibold text-sm md:text-base mb-1">
                Type of Activity
              </label>
              <FormDropDown
                register={register}
                initValue={
                  dataActivity.find((item) => item.name === dataPopup.activity)
                    ?.id || 0
                }
                dataActivity={dataActivity}
              />
              <p className="text-xs text-gray-400">
                &#42;Note: Choose the type of activity
              </p>
            </div>
            <InputField
              label="Name"
              placeholder={dataPopup.activityList}
              defaultValue={dataPopup.activityList}
              type="text"
              regist={register("activityList")}
            />
          </>
        );

      case "/dashboard/storage-image":
        return (
          <>
            <FormImageUpload
              register={register}
              initValue={
                dataActivityList.find(
                  (item) => item.name === dataPopup.activityList
                )?.id || 0
              }
              dataActivityList={dataActivityList}
            />
            <div className="flex flex-col gap-3 items-center justify-center w-full mt-2">
              {dataPopup.url_image ? (
                <div className="w-fit">
                  <img
                    src={dataUrl ? dataUrl : dataPopup.url_image}
                    className="w-full h-40"
                    alt="MissingIMG"
                  />
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
              placeholder={dataPopup.dataNews.title}
              defaultValue={dataPopup.dataNews.title}
              type="text"
              regist={register("title")}
            />
            <InputField
              label="Description"
              placeholder={dataPopup.dataNews.description}
              defaultValue={dataPopup.dataNews.description}
              type="message"
              regist={register("description")}
            />
            <InputField
              label="Date"
              placeholder={String(dataPopup.dataNews.date)}
              defaultValue={formatDate(dataPopup.dataNews.date)}
              type="date"
              regist={register("date")}
            />
            <InputField
              label="Note"
              placeholder={dataPopup.dataNews.note || ""}
              defaultValue={dataPopup.dataNews.note || ""}
              type="text"
              regist={register("note")}
            />
            <InputField
              label="Path"
              placeholder={dataPopup.dataNews.path}
              defaultValue={dataPopup.dataNews.path}
              type="text"
              regist={register("path")}
            />
          </>
        );

      default:
        return (
          <>
            <p className="text-xs text-gray-400">
              &#42;Refresh the page if the data is not updated
            </p>
          </>
        );
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
          className="w-10/12 sm:w-8/12 md:w-7/12 lg:w-5/12 h-fit relative rounded-lg flex flex-col gap-5 items-start justify-start text-custBlack p-10 bg-custWhite"
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
              <div
                onClick={handleCancel}
                className="cursor-pointer border-2 border-custBackground whitespace-nowrap text-custBackground hover:text-gray-400 text-base font-semibold px-4 sm:px-6 py-2 text-center rounded-lg transition-all duration-150"
              >
                cancel
              </div>
              <button
                onClick={handleSubmit(handleConfirm)}
                disabled={whileSubmit}
                className="flex items-center text-white bg-custPrimary cursor-pointer hover:bg-custPrimary/80 text-lg font-semibold px-8 sm:px-6 py-2 rounded-lg transition-all duration-150"
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

export default PopupData;
