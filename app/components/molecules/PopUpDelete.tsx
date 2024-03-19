import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { setToaster } from "@/app/redux/slices/reduxToasterSlices";
import { deleteDataListActivity } from "@/app/helpers/listActivityHelpers";
import { setPopupDelete } from "@/app/redux/slices/reduxPopupDeleteSlices";
import { usePathname } from "next/navigation";
import { deleteDataImage } from "@/app/helpers/imageHelper";
import { deleteNewsData } from "@/app/helpers/newsHelper";
import { FaSpinner } from "react-icons/fa";

interface stateProps {
  id: number;
  name: string;
  createdAt: Date;
}

const PopUpDelete = () => {
  const [whileSubmit, setWhileSubmit] = useState(false);
  const dispatch = useDispatch();
  const location = usePathname();
  const dataPopup = useSelector((state: any) => state.popupDelete.data);
  const { handleSubmit } = useForm();

  const handleCancel = () => {
    dispatch(setPopupDelete({ show: false }));
  };

  const handlePath = async (id: number) => {
    switch (location) {
      case "/dashboard/activity-list":
        return await deleteDataListActivity(id);
      case "/dashboard/storage-image":
        return await deleteDataImage(id);
      case "/dashboard/news":
        return await deleteNewsData(id);
      default:
        return "";
    }
  };

  const handleConfirm = async () => {
    handleWhileSubmit();

    const res = handlePath(dataPopup.id);

    res
      .then((res) => {
        console.log(res);
        dispatch(setPopupDelete({ show: false }));
        dispatch(
          setToaster({
            message: `Data deleted successfully`,
            show: true,
          })
        );
        setTimeout(() => {
          window.location.reload();
        }, 600);
      })
      .catch((err) => {
        console.log(err);
        dispatch(
          setToaster({
            message: "Failed to delete data from Database",
            show: true,
          })
        );
      })
      .finally(() => {
        handleWhileSubmit();
      });
  };

  const handleWhileSubmit = () => {
    setWhileSubmit((prev) => !prev);
  };

  return (
    dataPopup.show && (
      <div className="w-screen h-screen fixed overflow-hidden flex justify-center items-center bg-black/70 z-50">
        <motion.form
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ duration: 0.3 }}
          className="w-auto h-fit relative rounded-lg flex flex-col gap-5 items-start justify-start text-custBlack p-10 bg-custWhite"
        >
          <p className="border-b w-full pb-2">
            <span className="text-custPrimary font-semibold text-lg">
              Delete Data
            </span>
          </p>

          <p className="text-custBlack/70 text-base">
            Data <span className="font-semibold">{
              location === "/dashboard/activity-list" && dataPopup.name
            }</span> will be
            deleted
          </p>
          <p className="text-custBlack/70 text-base text-center">
            Are you sure to delete this data?
          </p>

          {/* CONFIRM BUTTON */}
          {
            <div className="w-full flex justify-center items-center gap-5">
              <button
                onClick={handleCancel}
                className="border-2 border-custBackground whitespace-nowrap text-custBackground hover:text-gray-400 text-base font-semibold px-4 sm:px-6 py-2 text-center rounded-lg transition-all duration-150"
              >
                cancel
              </button>
              <button
                onClick={handleSubmit(handleConfirm)}
                disabled={whileSubmit}
                className="text-white flex items-center gap-2 bg-custPrimary cursor-pointer hover:bg-custPrimary/80 text-lg font-semibold px-8 sm:px-6 py-2 rounded-lg transition-all duration-150"
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

export default PopUpDelete;
