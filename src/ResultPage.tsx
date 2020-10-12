import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import Perspective from "./Perspective";

import "./index.scss";
import { StoreState } from "./store";

const ResultPage = () => {
  const result = useSelector((store: StoreState) => store.reducer.result);
  const resultData: any = result.data || {};

  useEffect(() => {
    console.log(resultData);
  });
  const perspectives = [
    { dimension: "EI", left: "Introversion (I)", right: "Extroversion (E)" },
    { dimension: "SN", left: "Sensing (S)", right: "Intuition (N)" },
    { dimension: "TF", left: "Thinking (T)", right: "Feeling (F)" },
    { dimension: "JP", left: "Judging (J)", right: "Perceiving (P)" },
  ];
  return (
    <div className="result-page">
      <div className="result-title">
        <div>Your Perspective</div>
        <span>Your Perspective type is {resultData.summary}</span>
      </div>
      <div className="perspectives">
        {perspectives.map((perspective) => (
          <Perspective
            left={perspective.left}
            right={perspective.right}
            result={resultData[perspective.dimension.toLowerCase()]}
          />
        ))}
      </div>
    </div>
  );
};

export default ResultPage;
