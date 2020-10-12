import React from "react";

import "./index.scss";

interface PerspectiveProps {
  dimension: string;
  left: string;
  right: string;
  result: number;
}

const Perspective = ({ dimension, left, right, result }: PerspectiveProps) => {
  let newResult: number = result;
  if (dimension === "EI") {
    newResult = result === 0 ? 1 : 0;
  }
  return (
    <div className="perspective">
      <span>{left}</span>
      <div className="perpective-image">
        <div className={newResult === 0 ? "purple" : "gray"}></div>
        <div className={newResult === 0 ? "gray" : "purple"}></div>
      </div>
      <span>{right}</span>
    </div>
  );
};

export default Perspective;
