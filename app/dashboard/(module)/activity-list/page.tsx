"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import ButtonEdit from "@/app/components/atoms/buttonEdit";
import { getAllDataListActivity } from "@/app/helpers/listActivityHelpers";
import SearchField from "@/app/components/molecules/searchField";
import { useSelector } from "react-redux";
import { getAllDataActivity } from "@/app/helpers/activityHelpers";
import SelectActivity from "@/app/components/molecules/selectActivity";
import ButtonAdd from "@/app/components/atoms/buttonAdd";
import ButtonDelete from "@/app/components/atoms/buttonDelete";

interface ActivityList {
  id: number;
  activity: string;
  name: string;
  description: string;
}

interface Activity {
  id: number;
  name: string;
}

export default function Page() {
  const location = usePathname();
  const keyword = useSelector((state: any) => state.keyword.data.keyword);
  const select = useSelector((state: any) => state.select.data.select);
  const [filteredData, setFilteredData] = useState<ActivityList[]>([]);
  const [dataActivity, setDataActivity] = useState<Activity[]>([]);
  const [dataListActivity, setDataListActivity] = useState<ActivityList[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  
  const handleNextPage = () => setCurrentPage(prevPage => prevPage + 1);
  const handlePrevPage = () => setCurrentPage(prevPage => Math.max(prevPage - 1, 1));

  const fetchData = async () => {
    try {
      const res = await getAllDataListActivity();
      const resActivity = await getAllDataActivity();
      setDataActivity(resActivity);
      setFilteredData(res);
      setDataListActivity(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const filterData = () => {
      if (dataListActivity.length === 0) return;

      const filtered = dataListActivity.filter(
        (item) =>
          (keyword === "" ||
            item.name.toLowerCase().includes(keyword.toLowerCase())) &&
          (select === "" ||
            item.activity.toLowerCase().includes(select.toLowerCase()))
      );

      console.log("DATA FILTER : ", filtered);

      setCurrentPage(1);
      setFilteredData(filtered);
    };

    filterData();
  }, [keyword, select]);

  const paginatedData = filteredData.length > pageSize ? filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize) : filteredData;

  return (
    <div className="w-full bg-white rounded-md drop-shadow-md">
      <div className="p-5 flex justify-between items-center">
        <h2 className="text-xl">Table List Activity</h2>
        <ButtonAdd location={location} />
      </div>
      <div className="py-3 px-5 flex gap-3">
        <SearchField placeholder="Search by List Activity Name" />
        <SelectActivity data={dataActivity} />
      </div>
      <div className="border-t p-5">
        <div className="text-sm flex flex-col gap-1 text-custBlack font-semibold">
          <p>
            Search : <span className="italic font-normal">{keyword}</span>
          </p>
          <p>
            Tag : <span className="italic font-normal">{select}</span>
          </p>
        </div>
        <table className="w-full">
          <thead className="border-b-4 border-opacity-100">
            <tr>
              <th className="py-2 px-3">No</th>
              <th className="py-2 px-3">Activity</th>
              <th className="py-2 px-3">List Activity Name</th>
              <th className="py-2 px-3">Description</th>
              <th className="py-2 px-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr className="bg-slate-100">
                <td
                  colSpan={5}
                  className="py-5 px-3 text-center text-custBlack/70 animate-pulse"
                >
                  Loading . . .
                </td>
              </tr>
            ) : paginatedData.length === 0 ? (
              <tr className="bg-slate-100">
                <td
                  colSpan={5}
                  className="py-5 px-3 text-center text-custBlack/70"
                >
                  No Data Found
                </td>
              </tr>
            ) : (
              paginatedData.map((item, index) => {
                return (
                  <tr
                    key={index}
                    className={`
                      ${index % 2 == 0 ? "bg-slate-100" : "bg-white"}
                      text-sm
                    `}
                  >
                    <td className="py-2 px-3 text-center">{
                      (currentPage - 1) * pageSize + index + 1
                    }</td>
                    <td className="py-2 px-3 text-center">{item.activity}</td>
                    <td className="py-2 px-3">{item.name}</td>
                    <td className="py-2 px-3">{item.description}</td>
                    <td className="py-2 px-3 flex gap-4 h-full justify-center items-center">
                      <ButtonEdit
                        id_activityList={item.id}
                        activity={item.activity}
                        activityList={item.name}
                        description={item.description}
                      />
                      <ButtonDelete id={item.id} name={item.name} />
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
        {
          filteredData.length > pageSize && (
            <div className="flex justify-center gap-5 mt-5">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="w-[100px] py-1 bg-custPrimary disabled:bg-gray-400 text-white rounded-md"
              >
                Prev
              </button>
              <button
                onClick={handleNextPage}
                disabled={currentPage * pageSize >= filteredData.length}
                className="w-[100px] py-1 bg-custPrimary disabled:bg-gray-400 text-white rounded-md"
              >
                Next
              </button>
            </div>
          )
        }
      </div>
    </div>
  );
}
