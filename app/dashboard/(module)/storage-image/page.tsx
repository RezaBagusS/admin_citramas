"use client";

import ButtonAdd from "@/app/components/atoms/buttonAdd";
import ButtonDelete from "@/app/components/atoms/buttonDelete";
import ButtonEdit from "@/app/components/atoms/buttonEdit";
import { getAllDataImage } from "@/app/helpers/imageHelper";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getAllDataListActivity } from "@/app/helpers/listActivityHelpers";
import SelectActivity from "@/app/components/molecules/selectActivity";
import { useSelector } from "react-redux";

interface PageProps {}

interface stateDataImage {
  id: number;
  name_listActivity: string;
  url: string;
}

interface ActivityList {
  id: number;
  activity: string;
  name: string;
}

export default function Page({}: PageProps) {
  const [dataImage, setDataImage] = useState<stateDataImage[]>([]);
  const [filteredData, setFilteredData] = useState<stateDataImage[]>([]);
  const [dataActivityList, setDataActivityList] = useState<ActivityList[]>([]);

  const location = usePathname();
  const select = useSelector((state: any) => state.select.data.select);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const handleNextPage = () => setCurrentPage((prevPage) => prevPage + 1);
  const handlePrevPage = () =>
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));

  useEffect(() => {
    const fetchDataImage = getAllDataImage();
    const fetchDataActivityList = getAllDataListActivity();

    fetchDataActivityList
      .then((res: any) => {
        setDataActivityList(res);
      })
      .catch((err: any) => {
        console.log(err);
      });

    fetchDataImage
      .then((res: any) => {
        setFilteredData(res);
        setDataImage(res);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const filterData = () => {
      if (dataImage.length === 0) return;

      const filtered = dataImage.filter(
        (item) => {
          if (select === "") {
            return item;
          }
          return item.name_listActivity.toLowerCase().includes(select.toLowerCase());
        }
      );

      setCurrentPage(1);
      setFilteredData(filtered);

    };

    filterData();
  },[select, dataImage])

  const paginatedData =
    filteredData.length > pageSize
      ? filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      : filteredData;

  return (
    <div className="w-full bg-white rounded-md drop-shadow-md">
      <div className="p-5 flex justify-between items-center">
        <h2 className="text-xl">Table Storage Image</h2>
        <ButtonAdd location={location} />
      </div>
      <div className="py-3 px-5 flex gap-3">
        <SelectActivity data={dataActivityList} />
      </div>
      <div className="border-t p-5">
        <table className="w-full">
          <thead className="border-b-4 border-opacity-100">
            <tr>
              <th className="py-2 px-3">No</th>
              <th className="py-2 px-3">List Activity</th>
              {/* <th className="py-2 px-3">Url</th> */}
              <th className="py-2 px-3">Preview</th>
              <th className="py-2 px-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {
              filteredData.length === 0 ? (
                <tr className="bg-slate-100">
                <td
                  colSpan={4}
                  className="py-5 px-3 text-center text-custBlack/70"
                >
                  Loading . . .
                </td>
              </tr>
              ) : paginatedData.length === 0 ? (
                <tr className="bg-slate-100">
                  <td
                    colSpan={7}
                    className="py-5 px-3 text-center text-custBlack/70"
                  >
                    No Data Found
                  </td>
                </tr>
              ) : paginatedData.map((item, index) => {
                return (
                  <tr
                    key={index}
                    className={`
                    ${index % 2 == 0 ? "bg-slate-100" : "bg-white"}
                  `}
                  >
                    <td className="py-2 px-3 text-center">{(currentPage - 1) * pageSize + index + 1}</td>
                    <td className="py-2 px-3 text-center">
                      {item.name_listActivity}
                    </td>
                    {/* <td className="py-2 px-3">{item.url}</td> */}
                    <td className="py-2 px-3 text-center">
                      <div className="relative h-32 w-full object-cover">
                        <Image
                          priority
                          src={item.url}
                          alt={item.name_listActivity}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    </td>
                    <td className="py-2 px-3 flex justify-center gap-2">
                      <ButtonEdit
                        id_image={item.id}
                        activityList={item.name_listActivity}
                        url_image={item.url}
                      />
                      <ButtonDelete id={item.id} />
                    </td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
        {dataImage.length > pageSize && (
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
        )}
      </div>
    </div>
  );
}
