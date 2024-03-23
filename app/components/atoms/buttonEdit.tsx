import { setPopup } from "@/app/redux/slices/reduxPopupUpdateSlices";
import { usePathname } from "next/navigation";
import { FiEdit } from "react-icons/fi";
import { useDispatch } from "react-redux";

interface dataNews {
  id: number;
  title: string;
  description: string;
  date: Date;
  note: string | null;
  path: string;
}

interface ButtonEditProps {
  show?: boolean;
  id_activity?: number;
  id_activityList?: number;
  id_image?: number;
  url_image?: string;
  activityList?: string;
  activity?: string;
  dataNews?: dataNews;
  description?: string;
}

const ButtonEdit = ({
  id_activity,
  id_activityList,
  id_image,
  activity,
  activityList,
  url_image,
  dataNews,
  description,
}: ButtonEditProps) => {
  const dispatch = useDispatch();

  const handleClicked = () => {
    dispatch(
      setPopup({
        id_activity: id_activity,
        id_activityList: id_activityList,
        id_image: id_image,
        url_image: url_image,
        activityList: activityList,
        activity: activity,
        description: description,
        show: true,
        dataNews: dataNews,
      })
    );
  };

  return (
    <button
      onClick={handleClicked}
      className="flex gap-1 items-center bg-blue-500 hover:bg-blue-400 text-white ps-2 pe-3 py-1 rounded-md"
    >
      <FiEdit className="text-lg" />
      Edit
    </button>
  );
};

export default ButtonEdit;
