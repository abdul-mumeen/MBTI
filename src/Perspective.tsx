import React from "react";

import "./index.scss";

interface PerspectiveProps {
  left: string;
  right: string;
  result: number;
}

const Perspective = ({ left, right, result }: PerspectiveProps) => {
  return (
    <div className="perspective">
      <span>{left}</span>
      <div className="perpective-image">
        <div className={result === 0 ? "purple" : "gray"}></div>
        <div className={result === 0 ? "gray" : "purple"}></div>
      </div>
      <span>{right}</span>
    </div>
  );
};

export default Perspective;
