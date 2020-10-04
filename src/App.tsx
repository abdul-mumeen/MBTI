import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import QuestionsPage from "./QuestionsPage";
import ResultPage from "./ResultPage";

import "./index.scss";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/result">
            <ResultPage />
          </Route>
          <Route path="/">
            <QuestionsPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
