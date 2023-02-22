import React, { useContext, useEffect } from "react";
import { getTotalTrees } from "../../libs/api";
import { MapContext, MapContextProps } from "../../pages/MapPage";
import { Tree } from "../../types/Tree";
import StatsCard from "./StatsCard";
import StickyHeaderPrevious from "./StickyHeaderPrevious";
import TreeCard from "./TreeCard";

type PredictionResultProps = {
  trees?: Tree[] | null;
};

const PredictionResult: React.FC<PredictionResultProps> = () => {
  const { trees, setTotalTrees, totalTrees } = useContext(
    MapContext
  ) as MapContextProps;

  const predictedTrees = trees?.length;

  useEffect(() => {
    getTotalTrees().then((data) => {
      setTotalTrees(data.total_trees);
    });
  }, []);

  return (
    <>
      <StickyHeaderPrevious path="/" titleHeader="Previous" />
      <StatsCard
        title="Total pohon yang diprediksi"
        value={predictedTrees}
        className="mt-5 ml-8"
      />

      <span className="mt-3 w-3/4 p-0.5 ml-5 bg-gray-200 "></span>
      <div className="flex flex-col w-full mt-5">
        {trees
          ? trees.map((tree) => {
              return (
                <TreeCard
                  id={tree.tree_id}
                  latitude={tree.lat}
                  longitude={tree.long}
                />
              );
            })
          : null}
      </div>
    </>
  );
};

export default PredictionResult;
