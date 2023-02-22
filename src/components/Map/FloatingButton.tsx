import React from "react";
import { FaTree } from "react-icons/fa";

type FloatingButtonProps = {
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  text: string;
  mapLoading?: boolean;
};

const FloatingButton: React.FC<FloatingButtonProps> = ({
  className,
  onClick,
  mapLoading,
  text,
}) => {
  return (
    <>
      <button
        //   className ? "bg-green-400" : "bg-white hover:bg-gray-300 "
        className={`flex my-1 z-20 p-2 rounded-md items-center justify-center select-none ${
          className ? className : "bg-white hover:bg-gray-300"
        }
        } ${mapLoading ? "hover:cursor-wait" : "hover:cursor-pointer"}`}
        onClick={onClick}
        disabled={mapLoading ? true : false}
      >
        <FaTree className="mr-1" />
        <h2 className="">{text}</h2>
      </button>
    </>
  );
};

export default FloatingButton;
