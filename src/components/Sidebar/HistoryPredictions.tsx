import React, { useEffect, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { getPredictionsHistory } from "../../libs/api";
import { Prediction } from "../../types/Tree";
import StickyHeaderPrevious from "./StickyHeaderPrevious";

type HistoryPredictionsProps = {
  predictions?: Prediction[];
};

const HistoryPredictions: React.FC<HistoryPredictionsProps> = ({}) => {
  const [predictions, setPredictions] = useState<Prediction[]>();

  useEffect(() => {
    getPredictionsHistory().then((preds) => {
      setPredictions(preds);
    });
  }, []);

  return (
    <>
      <StickyHeaderPrevious path="/" titleHeader="Previous" />
      <div className="mt-2 flex w-full flex-col">
        {predictions ? (
          predictions.map((pred) => {
            return (
              <div
                // onClick={onClick}
                className={`mx-10 my-2 w-[80%] cursor-pointer rounded-r-xl border-t-2 border-r-2
      border-red-400 bg-slate-600 py-5 px-5 hover:bg-slate-800 `}
              >
                <div className="ml-5 text-left text-2xl text-gray-200 underline underline-offset-8 opacity-70">
                  Prediksi {pred.prediction_id}
                </div>
                <div className="my-5 mx-5 text-lg text-gray-300">
                  <table>
                    <tbody>
                      <tr>
                        <td className="w-1/2">Predicted at</td>
                        <td className="">{pred.created_at}</td>
                      </tr>
                      <tr>
                        <td className="w-1/2">Latitude</td>
                        <td>
                          : {pred.center_coords ? pred.center_coords[0] : null}
                        </td>
                      </tr>
                      <tr>
                        <td className="w-1/2">Longitude</td>
                        <td>
                          : {pred.center_coords ? pred.center_coords[1] : null}
                        </td>
                      </tr>
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
            <div className="mx-auto my-5 text-gray-400">
              Please predict something....
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default HistoryPredictions;
