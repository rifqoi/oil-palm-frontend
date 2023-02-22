import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

type TreeCardProps = {
  id: number;
  latitude: number;
  longitude: number;
};

const TreeCard: React.FC<TreeCardProps> = ({ id, latitude, longitude }) => {
  const [clickCard, setClickCard] = useState<boolean>(false);
  return (
    <>
      <div
        className={`rounded-lg items-center bg-slate-400 my-1 w-[90%] mx-auto ${
          clickCard ? "overflow-auto" : null
        }`}
      >
        <div
          className="flex w-full justify-between px-5 rounded-t-lg bg-slate-500 items-center cursor-pointer"
          onClick={() => {
            setClickCard(!clickCard);
          }}
        >
          <div className="px-5 pt-5 pb-5 text-xl text-gray-200">Tree {id}</div>
          {clickCard ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </div>
        {clickCard ? (
          <>
            <table className="table-fixed text-md w-full my-3 text-left">
              <tbody className="mx-2">
                <tr className="">
                  <td className="w-[40%] px-3 py-3">Latitude</td>
                  <td>{latitude}</td>
                </tr>
                <tr className="">
                  <td className="px-3 py-3">Longitude</td>
                  <td>{longitude}</td>
                </tr>
                <tr className="">
                  <td className="px-3 py-3">Status</td>
                  <td>Oil Palm Tree</td>
                </tr>
              </tbody>
            </table>
            <div className="flex justify-end mr-5 my-3 border-none cursor-pointer">
              <div className="py-3 px-3 bg-green-300 rounded-md border-2 border-emerald-900 hover:bg-green-400">
                Locate
              </div>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};

export default TreeCard;
