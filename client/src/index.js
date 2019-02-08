import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import history from "./history/history";
import App from "./App";
import "./index.css";

ReactDOM.render(
 
    <Router history={history}>
      <App />
    </Router>,
    document.getElementById("root")
   
  );
