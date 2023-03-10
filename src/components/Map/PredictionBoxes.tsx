import React from "react";
import { Popup, Rectangle } from "react-leaflet";
import { Prediction } from "../../types/Tree";

import L from "leaflet";

type PredictionBoxesProps = {
  predictions: Prediction[];
  rectRefs: React.MutableRefObject<Map<number, L.Rectangle> | null>;
  setPredictionTreeID: React.Dispatch<React.SetStateAction<number | null>>;
  setCancelPopupID: React.Dispatch<React.SetStateAction<number | null>>;
};

const PredictionBoxes: React.FC<PredictionBoxesProps> = ({
  predictions,
  rectRefs,
  setPredictionTreeID,
  setCancelPopupID,
}) => {
  const getRectMap = () => {
    if (!rectRefs.current) {
      rectRefs.current = new Map();
    }

    return rectRefs.current;
  };

  return (
    <>
      {predictions?.map((pred, id) => {
        return (
          <Rectangle
            key={`prediction-${id}`}
            color="green"
            ref={(props) => {
              const map = getRectMap();
              if (props) {
                map.set(pred.id, props);
              } else {
                map.delete(pred.id);
              }
            }}
            bounds={[
              pred.nw_bounds as L.LatLngTuple,
              pred.se_bounds as L.LatLngTuple,
            ]}
          >
            <Popup>
              <div>
                <div className="my-2 ml-1 mr-3 w-full rounded-md text-xl">
                  Show the predicted trees?
                </div>
                <div className="relative flex justify-end py-2 px-2">
                  <button
                    className="mx-2 rounded-md border-2 border-black bg-green-400 py-2 px-4"
                    onClick={() => setPredictionTreeID(pred.id)}
                  >
                    Yes
                  </button>
                  <button
                    className="rounded-md border-2 border-black bg-red-400 py-2 px-4"
                    onClick={() => {
                      setCancelPopupID(pred.id);
                    }}
                  >
                    No
                  </button>
                </div>
              </div>
            </Popup>
          </Rectangle>
        );
      })}
    </>
  );
};

export default PredictionBoxes;
