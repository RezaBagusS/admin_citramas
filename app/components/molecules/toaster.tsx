import { IoClose } from "react-icons/io5";
import { useDispatch ,useSelector } from "react-redux";
import { setToaster } from "@/app/redux/slices/reduxToasterSlices";
import { useEffect } from "react";
import { motion } from "framer-motion";

const Toaster = () => {

    const toast = useSelector((state: any) => state.toaster.data);

    const dispatch = useDispatch();

    const onClose = () => {
        dispatch(setToaster({ message: "", show: false }));
    };

    useEffect(() => {
        if (toast.show) {
            setTimeout(() => {
                onClose();
            }, 5000);
        }
    }, [toast.show]);

  return toast.show && (
    <motion.div 
    initial={{ x: 100, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    exit={{ x: 100, opacity: 0 }}
    transition={{ duration: 0.5, type: "tween"}}
    className="h-screen w-full fixed overflow-hidden z-50">
      <div className="absolute right-5 bottom-7 flex items-center gap-10 bg-custPrimary rounded-md px-5 py-2">
        <p className="text-custWhite text-base">{toast.message}</p>
        <span onClick={onClose} className="p-1 bg-sky-700 hover:bg-sky-500 cursor-pointer rounded-full">
            <IoClose className="text-custWhite" />
        </span>
      </div>
    </motion.div>
  );
};

export default Toaster;