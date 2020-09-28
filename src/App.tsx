import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [welcomeMessage, setWelcomeMessage] = useState<string>("");

  useEffect(() => {
    fetch("/hello").then(async (response) => {
      try {
        const data = await response.json();
        setWelcomeMessage(data.message);
      } catch {
        setWelcomeMessage("");
      }
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{welcomeMessage}</p>
      </header>
    </div>
  );
}

export default App;
