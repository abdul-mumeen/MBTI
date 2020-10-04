import React from "react";
import Perspective from "./Perspective";

import "./index.scss";

const ResultPage = () => {
  const perspectives = [
    { name: "EI", left: "Introversion (I)", right: "Extroversion (E)" },
    { name: "SN", left: "Sensing (S)", right: "Intuition (N)" },
    { name: "TF", left: "Thinking (T)", right: "Feeling (F)" },
    { name: "JP", left: "Judging (J)", right: "Perceiving (P)" },
  ];
  return (
    <div className="result-page">
      <div className="result-title">
        <div>Your Perspective</div>
        <span>Your Perspective type is ENTI</span>
      </div>
      <div className="perspectives">
        {perspectives.map((perspective) => (
          <Perspective
            left={perspective.left}
            right={perspective.right}
            result={1}
          />
        ))}
      </div>
    </div>
  );
};

export default ResultPage;
