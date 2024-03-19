import { IoIosAdd } from "react-icons/io";
import { useDispatch } from "react-redux";
import { setPopupAdd } from "@/app/redux/slices/reduxPopupAddSlices";

interface ButtonAddProps {
  location: string;
}

const ButtonAdd = ({location}:ButtonAddProps) => {

  const dispatch = useDispatch();

  const handleClicked = () => {
    dispatch(
      setPopupAdd({
        show: true,
        type: location,
      })
    )
  }

    return (
        <button onClick={handleClicked} className="flex gap-1 items-center bg-green-700 hover:bg-green-600 text-white ps-2 pe-3 py-1 rounded-md">
          <IoIosAdd className="text-2xl" />
          Add
        </button>
    )
}

export default ButtonAdd;