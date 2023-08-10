import React, { useContext } from "react";
import { MapContext, MapContextProps } from "../../pages/MapPage";
import ButtonCard from "./ButtonCard";
import SidebarHeader from "./SidebarHeader";
import StatsCard from "./StatsCard";

type SidebarMainProps = {
  profileDropdownOpened: boolean;
  setProfileDropDownOpened: React.Dispatch<React.SetStateAction<boolean>>;
  totalTrees?: number | undefined;
};

const SidebarMain: React.FC<SidebarMainProps> = ({
  profileDropdownOpened,
  setProfileDropDownOpened,
  // totalTrees,
}) => {
  const { trees, totalTrees } = useContext(MapContext) as MapContextProps;
  console.log(totalTrees);
  return (
    <>
      <SidebarHeader
        profileDropdownOpen={profileDropdownOpened}
        setProfileDropdownOpen={setProfileDropDownOpened}
      />
      <div className="ml-10 mt-6 text-3xl text-gray-200">Statistics</div>
      <span className="mt-3 ml-5 w-3/4 bg-gray-200 p-0.5 "></span>
      <StatsCard
        title="Total Pohon Kelapa Sawit"
        value={totalTrees}
        className="ml-6 mt-5"
      />
      <span className="mt-10 ml-5 w-3/4 bg-gray-200 p-0.5 "></span>

      <div className="flex flex-col justify-between xl:flex-row">
        <ButtonCard
          title="Lihat Semua Pohon Kelapa Sawit"
          className="ml-6 mt-5"
          path="/trees"
        />
        <ButtonCard
          title="Lihat Riwayat Prediksi"
          className="ml-6 mt-5"
          path="/predictions"
        />
      </div>
      <div className="">
        <ButtonCard title="Show Areas" className="ml-6 mt-5" path="/areas" />
      </div>
    </>
  );
};

export default SidebarMain;
