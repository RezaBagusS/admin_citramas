"use client";

import { useEffect, useState } from "react";
import { getAllDataActivity } from "../helpers/activityHelpers";
import ButtonEdit from "../components/atoms/buttonEdit";
import { usePathname } from "next/navigation";

interface Activity {
  id: number;
  name: string;
  createdAt: Date;
}

const Page = () => {
  const [dataActivity, setDataActivity] = useState<Activity[]>([]);
  const location = usePathname();

  useEffect(() => {
    const fetchData = getAllDataActivity();

    fetchData.then((res) => {
      setDataActivity(res);
    });
  }, []);

  return (
    <div className="w-full bg-white rounded-md drop-shadow-md">
      <div className="p-5 flex justify-between items-center">
        <h2 className="text-xl">Table Activity</h2>
      </div>
      <div className="border-t p-5">
        <table className="w-full">
          <thead className="border-b-4 border-opacity-100">
            <tr>
              <th className="py-2 px-3">No</th>
              <th className="py-2 px-3">Activity Name</th>
              <th className="py-2 px-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {dataActivity.map((item, index) => {
              return (
                <tr
                  key={index}
                  className={`
                    ${index % 2 == 0 ? "bg-slate-100" : "bg-white"}
                  `}
                >
                  <td className="py-2 px-3 text-center">{index + 1}</td>
                  <td className="py-2 px-3">{item.name}</td>
                  <td className="py-2 px-3 flex gap-4 justify-center items-center">
                    <ButtonEdit
                      id_activity={item.id}
                      activity={item.name}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
