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
        className={`my-1 mx-auto w-[90%] items-center rounded-lg bg-slate-400 ${
          clickCard ? "overflow-auto" : null
        }`}
      >
        <div
          className="flex w-full cursor-pointer items-center justify-between rounded-t-lg bg-slate-500 px-5"
          onClick={() => {
            setClickCard(!clickCard);
          }}
        >
          <div className="px-5 pt-5 pb-5 text-xl text-gray-200">Tree {id}</div>
          {clickCard ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </div>
        {clickCard ? (
          <>
            <table className="text-md my-3 w-full table-fixed text-left">
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
            <div className="my-3 mr-5 flex cursor-pointer justify-end border-none">
              <div className="rounded-md border-2 border-emerald-900 bg-green-300 py-3 px-3 hover:bg-green-400">
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
