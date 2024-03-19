import { setPopupDelete } from "@/app/redux/slices/reduxPopupDeleteSlices";
import { usePathname } from "next/navigation";
import { MdOutlineDeleteForever } from "react-icons/md";
import { useDispatch } from "react-redux";

interface ButtonDeleteProps {
  id: number;
  name?: string;
}

const ButtonDelete = ({ id, name }: ButtonDeleteProps) => {
  const dispatch = useDispatch();
  const location = usePathname();

  const handleClicked = () => {
    dispatch(setPopupDelete({ 
      show: true,
      id: id,
      name: name,
    }));
  };

  return (
    <button
      onClick={handleClicked}
      className="flex gap-1 items-center bg-red-500 hover:bg-red-400 text-white ps-2 pe-3 py-1 rounded-md"
    >
      <MdOutlineDeleteForever className="text-2xl" />
      Delete
    </button>
  );
};

export default ButtonDelete;
