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
      className="group z-30 bg-gray-700 sticky top-0 text-2xl w-full"
      onClick={() => {
        navigate(path);
      }}
    >
      <div className="flex cursor-pointer items-center text-gray-400 ml-5 my-5">
        <AiOutlineArrowLeft className="group-hover:text-brightRedLight mr-2" />
        <div className="group-hover:text-brightRedLight">{titleHeader}</div>
      </div>
      <hr className="w-full" />
    </div>
  );
};

export default StickyHeaderPrevious;
