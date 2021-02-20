import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { GlobalStyles } from "twin.macro";
import store from "./features/store";
import { Provider } from "react-redux";

ReactDOM.render(
  <Router>
    <React.StrictMode>
      <Provider store={store}>
        <GlobalStyles />
        <App />
      </Provider>
    </React.StrictMode>
  </Router>,
  document.getElementById("root")
);
