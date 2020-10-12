import React from "react";

import "./index.scss";

interface QuestionContainerProps {}

const QuestionContainer = (
  props: React.PropsWithChildren<QuestionContainerProps>
) => {
  return <div className="container">{props.children}</div>;
};

export default QuestionContainer;
