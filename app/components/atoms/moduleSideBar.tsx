"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaRunning } from "react-icons/fa";
import { TfiLayoutListThumbAlt } from "react-icons/tfi";
import { IoNewspaperSharp } from "react-icons/io5";
import { TiCloudStorage } from "react-icons/ti";
import { BiLoaderCircle } from "react-icons/bi";

interface ModuleSidaBarProps {
  text: string;
  id: number;
  path: string;
}

const ModuleSidaBar = ({ text, path }: ModuleSidaBarProps) => {
  const location = usePathname();

  const HandleIcon = () => {
    switch (text) {
      case "Activity":
        return <FaRunning className="text-xl" />;
      case "Activity List":
        return <TfiLayoutListThumbAlt className="text-xl" />;
      case "News":
        return <IoNewspaperSharp className="text-xl" />;
      case "Storage Image":
        return <TiCloudStorage className="text-2xl" />;
      default:
        return <BiLoaderCircle className="text-xl" />;
    }
  }

  const checkActive = () => {
    return location == path && "text-custPrimary font-medium";
  };

  return (
    <Link
      href={path}
      className={`w-full flex items-center gap-3 text-custBlack hover:bg-slate-100 py-4 px-2 rounded-md cursor-pointer
        ${checkActive()}
        `}
    >
      <HandleIcon />
      <h3 className="text-lg">{text}</h3>
    </Link>
  );
};

export default ModuleSidaBar;
