import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";

import QuestionsPage from "./QuestionsPage";
import ResultPage from "./ResultPage";
import store from "./store";

import "./index.scss";

const App = () => {
  return (
    <Provider store={store}>
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
    </Provider>
  );
};

export default App;
