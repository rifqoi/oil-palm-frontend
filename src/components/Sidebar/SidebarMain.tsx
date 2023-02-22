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
      <div className="text-3xl ml-10 mt-6 text-gray-200">Statistics</div>
      <span className="mt-3 w-3/4 p-0.5 ml-5 bg-gray-200 "></span>
      <StatsCard
        title="Total Pohon Kelapa Sawit"
        value={totalTrees}
        className="ml-6 mt-5"
      />
      <span className="mt-10 w-3/4 p-0.5 ml-5 bg-gray-200 "></span>

      <div className="flex flex-col xl:flex-row justify-between">
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
    </>
  );
};

export default SidebarMain;
