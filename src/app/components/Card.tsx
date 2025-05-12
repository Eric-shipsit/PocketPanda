import React, { JSX } from "react";

const Card = ({ children, className }: { children: JSX.Element, className?: string }) => {
  return (
    <div className={" bg-white shadow-md rounded-lg p-6" + (className ? " " + className : "")}>
      {children}
    </div>
  );
};

export default Card;
