import React, { useContext } from "react";
import { MapContext, MapContextProps } from "../../pages/MapPage";
import { Tree } from "../../types/Tree";
import StickyHeaderPrevious from "./StickyHeaderPrevious";
import TreeCard from "./TreeCard";

type PredictedTreesProps = {
  trees?: Tree[] | null;
};

const PredictedTrees: React.FC<PredictedTreesProps> = ({}) => {
  const { trees, rectRefs, mapRef } = useContext(MapContext) as MapContextProps;
  return (
    <>
      <StickyHeaderPrevious path="/" titleHeader="Previous" />
      <div className="mt-5 flex w-full flex-col">
        {trees ? (
          trees.map((tree) => {
            return (
              <TreeCard
                id={tree.tree_id}
                latitude={tree.lat}
                longitude={tree.long}
                mapRef={mapRef}
                rectRefs={rectRefs}
                pemupukan_terakhir={tree.pemupukan_terakhir}
                status={tree.status}
                tanggal_penanaman={tree.planting_date}
                tanggal_prediksi={tree.created_at}
              />
            );
          })
        ) : (
          <h1 className="mx-auto my-5 text-xl text-gray-400">
            There are no predicted trees...
          </h1>
        )}
        {/* <TreeCard
          id="1"
          latitude="-6.472635010415303"
          longitude="103.5102599193628"
        />
        <TreeCard
          id="2"
          latitude="-6.472635010415303"
          longitude="103.5102599193628"
        />
        <TreeCard
          id="3"
          latitude="-6.472635010415303"
          longitude="103.5102599193628"
        /> */}
      </div>
    </>
  );
};

export default PredictedTrees;
