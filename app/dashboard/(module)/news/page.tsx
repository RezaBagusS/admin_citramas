"use client";

import { getAllNewsData } from "@/app/helpers/newsHelper";
import React, { useEffect, useState } from "react";
import ButtonAdd from "@/app/components/atoms/buttonAdd";
import ButtonEdit from "@/app/components/atoms/buttonEdit";
import ButtonDelete from "@/app/components/atoms/buttonDelete";
import { usePathname } from "next/navigation";
import SearchField from "@/app/components/molecules/searchField";
import { useSelector } from "react-redux";

interface PageProps {}

interface News {
  id: number;
  title: string;
  description: string;
  date: Date;
  note: string | null;
  path: string;
}

export default function Page() {
  const [dataNews, setDataNews] = useState<News[]>([]);
  const [filteredData, setFilteredData] = useState<News[]>([]);
  const keyword = useSelector((state: any) => state.keyword.data.keyword);
  const location = usePathname();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const handleNextPage = () => setCurrentPage((prevPage) => prevPage + 1);
  const handlePrevPage = () =>
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllNewsData();
        console.log("DATA NEWS : ", res);
        setDataNews(res);
        setFilteredData(res);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filterData = () => {
      if (dataNews.length === 0) return;

      const filtered = dataNews.filter(
        (item) =>
          keyword === "" ||
          item.title.toLowerCase().includes(keyword.toLowerCase())
      );

      console.log("DATA FILTER : ", filtered);

      setCurrentPage(1);
      setFilteredData(filtered);
    };

    filterData();
  }, [keyword]);

  const formatDate = (dateStr: Date | null) => {
    if (dateStr === null) {
      return "Unknown Date";
    }

    const dateObj = new Date(dateStr);
    dateObj.setDate(dateObj.getDate() - 1);
    return dateObj.toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const paginatedData =
    filteredData.length > pageSize
      ? filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      : filteredData;

  return (
    <div className="w-full bg-white rounded-md drop-shadow-md">
      <div className="p-5 flex justify-between items-center">
        <h2 className="text-xl">Table News</h2>
        <ButtonAdd location={location} />
      </div>
      <div className="py-3 px-5 flex gap-3">
        <SearchField placeholder="Search by News Title" />
      </div>
      <div className="border-t p-5">
        <div className="text-sm flex flex-col gap-1 text-custBlack font-semibold">
          <p>
            Search : <span className="italic font-normal">{keyword}</span>
          </p>
        </div>
        <table className="w-full">
          <thead className="border-b-4 border-opacity-100">
            <tr>
              <th className="py-2 px-3">No</th>
              <th className="py-2 px-3">Title</th>
              <th className="py-2 px-3">Short</th>
              <th className="py-2 px-3">Date</th>
              <th className="py-2 px-3">Note</th>
              <th className="py-2 px-3">Path</th>
              <th className="py-2 px-3">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {filteredData.length === 0 ? (
              <tr className="bg-slate-100">
                <td
                  colSpan={7}
                  className="py-5 px-3 text-center text-custBlack/70 animate-pulse"
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
            ) : (
              paginatedData.map((item, index) => {
                return (
                  <tr
                    key={index}
                    className={`
                      ${index % 2 == 0 ? "bg-slate-100" : "bg-white"}
                    `}
                  >
                    <td className="py-2 px-3 text-center">{(currentPage - 1) * pageSize + index + 1}</td>
                    <td className="py-2 px-3 text-center">{item.title}</td>
                    <td className="py-2 px-3">{item.description}</td>
                    <td className="py-2 px-3">
                      {item.date ? formatDate(item.date) : ""}
                    </td>
                    <td
                      className={`py-2 px-3
                      ${!item.note && "text-center"}
                    `}
                    >
                      {item.note ? item.note : "--"}
                    </td>
                    <td className="py-2 px-3">{item.path}</td>
                    <td className="py-2 px-3 flex gap-4 h-full justify-center items-center">
                      <ButtonEdit dataNews={item} />
                      <ButtonDelete id={item.id} />
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
        {filteredData.length > pageSize && (
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
