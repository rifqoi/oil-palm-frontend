import React, { SyntheticEvent, useContext, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { MapContext, MapContextProps } from "../../pages/MapPage";

type TreeCardProps = {
  id: number;
  latitude: number;
  longitude: number;
  rectRefs: React.MutableRefObject<Map<number, L.Rectangle<any>> | null>;
  mapRef: React.RefObject<L.Map>;
  status: string | undefined;
  pemupukan_terakhir: string | undefined;
  tanggal_penanaman: string | undefined;
  tanggal_prediksi: string | undefined;
};

const TreeCard: React.FC<TreeCardProps> = ({
  id,
  latitude,
  longitude,
  rectRefs,
  mapRef,
  pemupukan_terakhir,
  status,
  tanggal_penanaman,
  tanggal_prediksi,
}) => {
  const [clickCard, setClickCard] = useState<boolean>(false);
  const { setShowTrees } = useContext(MapContext) as MapContextProps;

  const onLocate = (e: SyntheticEvent) => {
    if (rectRefs.current) {
      setShowTrees(true);
      const rect = rectRefs.current?.get(id);

      const center = [latitude, longitude] as L.LatLngExpression;
      mapRef.current?.flyTo(center, 19, {
        animate: true,
        duration: 1,
      });
      rect?.openPopup(center);
    }
  };

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
              <tbody className="">
                <tr className="w-full">
                  <td className="w-[40%] px-3 py-3">Latitude</td>
                  <td>{latitude}</td>
                </tr>
                <tr className="">
                  <td className="px-3 py-3">Longitude</td>
                  <td>{longitude}</td>
                </tr>
                <tr className="">
                  <td className="px-3 py-3">Status</td>
                  <td>{status}</td>
                </tr>
                <tr className="">
                  <td className="px-3 py-3">Tanggal Penanaman</td>
                  <td>{tanggal_penanaman}</td>
                </tr>
                <tr className="">
                  <td className="px-3 py-3">Pemupukan Terakhir</td>
                  <td>{pemupukan_terakhir}</td>
                </tr>
                <tr className="">
                  <td className="px-3 py-3">Tanggal Prediksi</td>
                  <td>{tanggal_prediksi}</td>
                </tr>
              </tbody>
            </table>
            <div className="my-3 mr-5 flex cursor-pointer justify-end border-none">
              <div
                className="rounded-md border-2 border-emerald-900 bg-green-300 py-3 px-3 hover:bg-green-400"
                onClick={onLocate}
              >
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
