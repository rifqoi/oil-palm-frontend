import { useContext } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { MapContext, MapContextProps } from "../../pages/MapPage";
import { Tree } from "../../types/Tree";
import StickyHeaderPrevious from "./StickyHeaderPrevious";

type PredictedTreesProps = {
  trees?: Tree[] | null;
};

const Areas = ({}) => {
  const { areas, mapRef } = useContext(MapContext) as MapContextProps;
  const navigate = useNavigate();

  return (
    <>
      <StickyHeaderPrevious path="/" titleHeader="Previous" />
      <div className="mt-2 flex w-full flex-wrap">
        {areas ? (
          areas?.map((area) => {
            return (
              <div
                onClick={() => {
                  mapRef.current?.flyTo(area.center, 19, {
                    animate: true,
                    duration: 1,
                  });
                }}
                className={`mx-10 my-3 w-[37%] cursor-pointer rounded-r-xl border-t-2 border-r-2
      border-red-400 bg-slate-600 py-5 px-5 hover:bg-slate-800 `}
              >
                <div className="ml-5 text-left text-xl text-gray-200 underline underline-offset-8 opacity-70">
                  Area {area.id}
                </div>
                <div className="my-5 mx-3 text-lg text-gray-300">
                  <table>
                    <tbody>
                      <tr>
                        <td className="w-1/2">Total Trees</td>
                        <td className="">: {area.totalTrees}</td>
                      </tr>
                      {/* <tr>
                        <td className="w-1/2">Center Latitude</td>
                        <td>: {area.center[0]}</td>
                      </tr>
                      <tr>
                        <td className="w-1/2">Center Longitude</td>
                        <td>: {area.center[1]}</td>
                      </tr> */}
                    </tbody>
                  </table>
                </div>
                <div className="ml-5 flex justify-end pt-3 text-right text-2xl text-gray-200">
                  <AiOutlineArrowRight className="text-right" />
                </div>
              </div>
            );
          })
        ) : (
          <>
            <div className="mx-auto my-5 text-gray-400">No area found!</div>
          </>
        )}
      </div>
    </>
  );
};

export default Areas;
