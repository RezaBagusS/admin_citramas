import ModuleSidaBar from "../atoms/moduleSideBar";

const dataModule = [
  {
    id: 1,
    text: "Activity",
    path: "/dashboard",
  },
  {
    id: 2,
    text: "Activity List",
    path: "/dashboard/activity-list",
  },
  {
    id: 3,
    text: "News",
    path: "/dashboard/news",
  },
  {
    id: 4,
    text: "Storage Image",
    path: "/dashboard/storage-image",
  },
];

const LeftSideBar = () => {
  return (
    <div className="w-80 bg-white h-screen flex flex-col items-center drop-shadow-md">
      <div className="py-5 w-full border-2 flex justify-center items-center">
        <h2 className="text-custPrimary font-bold text-xl">
          Citramas Foundation
        </h2>
      </div>
      <div className="w-full flex flex-col gap-3 py-7 p-5">
        {dataModule.map((item, index) => (
          <ModuleSidaBar key={index} id={item.id} text={item.text} path={item.path} />
        ))}
      </div>
    </div>
  );
};

export default LeftSideBar;
