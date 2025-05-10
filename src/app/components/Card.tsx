import React, { JSX } from "react";

const Card = ({ children, styles }: { children: JSX.Element, styles?: string }) => {
  return (
    <div className={" bg-white shadow-md rounded-lg p-6" + (styles ? " " + styles : "")}>
      {children}
    </div>
  );
};

export default Card;
