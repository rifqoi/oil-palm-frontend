import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPredictionByID } from "../../libs/api";
import { MapContext, MapContextProps } from "../../pages/MapPage";
import { Prediction, Tree } from "../../types/Tree";
import StatsCard from "./StatsCard";
import StickyHeaderPrevious from "./StickyHeaderPrevious";
import TreeCard from "./TreeCard";

type HistoryPredictionsIDProps = {
  trees?: Tree[] | null;
};

const HistoryPredictionsID: React.FC<HistoryPredictionsIDProps> = () => {
  const { rectRefs, mapRef } = useContext(MapContext) as MapContextProps;

  const { id } = useParams();
  const navigate = useNavigate();
  let idInt: number;
  try {
    idInt = parseInt(id as string);
  } catch {
    navigate("/predictions");
  }

  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [trees, setTrees] = useState<Tree[]>();
  const [totalPredictedTrees, setTotalPredictedTrees] = useState<number>();
  // const predictedTrees = trees?.length;
  // console.log(trees);

  useEffect(() => {
    getPredictionByID(parseInt(id as string)).then((pred) => {
      setPrediction(pred);
      setTrees(pred?.trees);
      setTotalPredictedTrees(pred?.trees.length);
    });
  }, []);

  return (
    <>
      <StickyHeaderPrevious path="/predictions" titleHeader="Previous" />
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
                  mapRef={mapRef}
                  rectRefs={rectRefs}
                  pemupukan_terakhir={tree.pemupukan_terakhir}
                  status={tree.status}
                  tanggal_penanaman={tree.planting_date}
                  tanggal_prediksi={tree.created_at}
                />
              );
            })
          : null}
      </div>
    </>
  );
};

export default HistoryPredictionsID;
