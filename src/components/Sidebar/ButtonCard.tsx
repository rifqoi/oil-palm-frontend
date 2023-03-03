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
      className={`cursor-pointer rounded-r-xl border-t-2 border-r-2
      border-red-400 bg-slate-600 py-5 px-5 hover:bg-slate-800 ${
        className ? className : null
      }`}
    >
      <div className="ml-5 text-right text-lg text-gray-200 underline underline-offset-8 opacity-70">
        {title}
      </div>
      <div className="ml-5 flex justify-end pt-3 text-right text-3xl text-gray-200">
        <AiOutlineArrowRight className="text-right" />
      </div>
    </div>
  );
};

export default ButtonCard;
