import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

type StickyHeaderPreviousProps = {
  titleHeader: string;
  path: string;
};

const StickyHeaderPrevious: React.FC<StickyHeaderPreviousProps> = ({
  titleHeader,
  path,
}) => {
  const navigate = useNavigate();
  return (
    <div
      className="group sticky top-0 z-30 h-screen w-full bg-gray-700 text-2xl"
      onClick={() => {
        navigate(path);
      }}
    >
      <div className="my-5 ml-5 flex cursor-pointer items-center text-gray-400">
        <AiOutlineArrowLeft className="mr-2 group-hover:text-brightRedLight" />
        <div className="group-hover:text-brightRedLight">{titleHeader}</div>
      </div>
      <hr className="w-full" />
    </div>
  );
};

export default StickyHeaderPrevious;
