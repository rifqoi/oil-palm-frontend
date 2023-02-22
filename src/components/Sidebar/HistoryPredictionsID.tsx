import React from "react";
import { useParams } from "react-router-dom";

const HistoryPredictionsID = () => {
  const { id } = useParams();
  return <div>ID {id}</div>;
};

export default HistoryPredictionsID;
