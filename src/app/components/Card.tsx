import React, { JSX, ReactNode } from "react";

const Card = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={
        " bg-white shadow-md rounded-lg p-6 flex flex-col" +
        (className ? " " + className : "")
      }
    >
      {children}
    </div>
  );
};

export default Card;
