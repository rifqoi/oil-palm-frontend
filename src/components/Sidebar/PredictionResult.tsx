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
  const { trees, setTotalTrees, totalTrees, predictedTrees } = useContext(
    MapContext
  ) as MapContextProps;

  // const predictedTrees = trees?.length;
  // console.log(trees);

  const totalPredictedTrees = predictedTrees?.length;

  useEffect(() => {
    getTotalTrees().then((data) => {
      console.log("total", data);
      setTotalTrees(data.total_trees);
    });
  }, []);

  return (
    <>
      <StickyHeaderPrevious path="/" titleHeader="Previous" />
      <StatsCard
        title="Total pohon yang diprediksi"
        value={totalPredictedTrees}
        className="mt-5 ml-8"
      />

      <span className="mt-3 ml-5 w-3/4 bg-gray-200 p-0.5 "></span>
      <div className="mt-5 flex w-full flex-col">
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
