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
      <div className="flex flex-col w-full mt-2">
        {predictions ? (
          predictions.map((pred) => {
            return (
              <div
                // onClick={onClick}
                className={`rounded-r-xl bg-slate-600 py-5 px-5 w-[80%] mx-10 my-2
      cursor-pointer border-t-2 border-r-2 border-red-400 hover:bg-slate-800 `}
              >
                <div className="ml-5 text-2xl text-left text-gray-200 opacity-70 underline underline-offset-8">
                  Prediksi {pred.prediction_id}
                </div>
                <div className="my-5 mx-5 text-gray-300 text-lg">
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
                <div className="flex justify-end ml-5 text-2xl text-right text-gray-200 pt-3">
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
