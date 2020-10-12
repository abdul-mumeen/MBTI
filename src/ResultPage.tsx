import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import Perspective from "./Perspective";

import "./index.scss";
import { StoreState } from "./store";
import { AsyncActionStatus } from "./types";

const ResultPage = () => {
  const result = useSelector((store: StoreState) => store.reducer.result);
  const history = useHistory();
  const resultData: any = result.data;

  useEffect(() => {
    if (!resultData && result.status !== AsyncActionStatus.Loading) {
      history.push("/");
    }
  });

  const perspectives = [
    { dimension: "EI", left: "Introversion (I)", right: "Extroversion (E)" },
    { dimension: "SN", left: "Sensing (S)", right: "Intuition (N)" },
    { dimension: "TF", left: "Thinking (T)", right: "Feeling (F)" },
    { dimension: "JP", left: "Judging (J)", right: "Perceiving (P)" },
  ];
  return resultData ? (
    <div className="result-page">
      <div className="result-title">
        <div>Your Perspective</div>
        <span>Your Perspective type is {resultData.summary}</span>
      </div>
      <div className="perspectives">
        {perspectives.map((perspective) => (
          <Perspective
            key={perspective.dimension}
            dimension={perspective.dimension}
            left={perspective.left}
            right={perspective.right}
            result={resultData[perspective.dimension.toLowerCase()]}
          />
        ))}
      </div>
    </div>
  ) : null;
};

export default ResultPage;
