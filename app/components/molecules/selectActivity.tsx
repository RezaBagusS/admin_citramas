'use client'

import { setSelect } from "@/app/redux/slices/reduxSelectSlices";
import { useDispatch, useSelector } from "react-redux";

interface Activity {
    id: number;
    name: string;
}

interface ActivityProps {
    data: Activity[];
}

const SelectActivity = ({data}:ActivityProps) => {

    const dispatch = useDispatch();
    const select = useSelector((state: any) => state.select.data.select);
    
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setSelect({ select: e.target.value }));
    }

    return (
        <div className="rounded-full overflow-hidden border">
            <select onChange={handleChange} value={select} className="bg-white w-full h-full py-2 px-3">
                <option value={""}>--Activity--</option>
                {data.map((activity) => (
                    <option key={activity.id} value={activity.name}>
                        {activity.name}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default SelectActivity;