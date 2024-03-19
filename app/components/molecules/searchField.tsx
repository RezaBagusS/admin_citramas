'use client'

import Image from "next/image";
import { IoSearch } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { setKeyword } from "@/app/redux/slices/reduxKeywordSearchSlices";

const SearchField = ({
    placeholder = "Search"
}) => {

    const dispatch = useDispatch();

    const handleSearch = (e: any) => {
        setTimeout(() => {
            dispatch(setKeyword({ keyword: e.target.value }));
        }, 1000);
    }

    return (
        <div className="w-full flex items-center relative rounded-full overflow-hidden border">
            <IoSearch className="absolute left-5 top-1/2 -translate-y-1/2" />
            <input type="text" onChange={
                handleSearch
            } className="w-full ps-14 text-sm pe-4 py-3 active:outline-none focus:outline-none" placeholder={placeholder} />
        </div>
    );
}

export default SearchField;