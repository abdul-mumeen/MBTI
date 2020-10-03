import React from "react";

import "./index.scss";

interface EmailProps {
  updateEmail: (value: string) => void;
}

const Email = ({ updateEmail }: EmailProps) => {
  const handleInputChange = (event: any) => {
    updateEmail(event.target.value);
  };
  return (
    <>
      <div className="question-title">
        <span>Your Email</span>
      </div>
      <div className="radios-container">
        <input
          className="text-input"
          type="textbox"
          placeholder="you@example.com"
          onChange={handleInputChange}
        />
      </div>
    </>
  );
};

export default Email;
