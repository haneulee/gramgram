import React from "react";
import "./App.scss";

fetch("/notifications/");

function App() {
  return (
    <div className="App">
      <header className="App__header">
        <img className="App__logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App__link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
