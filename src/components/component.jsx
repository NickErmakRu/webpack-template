import React from "react";
import "./component.scss";

const CustomComponent = () => {
  console.log("JSX component is here");
  console.log([1, 2, [2, 3]].flat());

  return (
    <div className="componentStyle">
      <div>Первый блок</div>
      <div>Второй блок</div>
      <div className="thirdBlock">Третий блок</div>
    </div>
  );
};

export default CustomComponent;
