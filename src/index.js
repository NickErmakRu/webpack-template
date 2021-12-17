import React from "react";
import ReactDOM from "react-dom";

import * as _ from "lodash";

import "./styles/main.scss";
import unmatched from "./assets/unmatched.png";

import CustomComponent from "./components/component.jsx";

const App = () => {
  const lodashExample = _.partition([1, 2, 3, 4], (n) => n % 2);

  const testText = (text) => console.log(text);

  testText("osfkokos");

  return (
    <div>
      <p className="title">Template settings in progress</p>
      <img src={unmatched} alt="unmatched-logo" />
      <CustomComponent />
      <div style={{ display: "flex" }}>
        <div className="digit">{lodashExample[0][0]}</div>
        <div className="digit1">{lodashExample[0][1]}</div>
        <div className="digit1">7</div>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
