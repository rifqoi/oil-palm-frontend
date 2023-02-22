import React, { SyntheticEvent } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

type ButtonCardProps = {
  title: string;
  className?: string;
  path: string;
};

const ButtonCard: React.FC<ButtonCardProps> = ({ title, className, path }) => {
  const navigate = useNavigate();
  const onClick = (e: SyntheticEvent) => {
    navigate(path);
  };

  return (
    <div
      onClick={onClick}
      className={`rounded-r-xl bg-slate-600 py-5 px-5
      cursor-pointer border-t-2 border-r-2 border-red-400 hover:bg-slate-800 ${
        className ? className : null
      }`}
    >
      <div className="ml-5 text-lg text-right text-gray-200 opacity-70 underline underline-offset-8">
        {title}
      </div>
      <div className="flex justify-end ml-5 text-3xl text-right text-gray-200 pt-3">
        <AiOutlineArrowRight className="text-right" />
      </div>
    </div>
  );
};

export default ButtonCard;
