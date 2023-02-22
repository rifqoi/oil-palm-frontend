import React from "react";

type StatsCardProps = {
  title: string;
  value: string | number | undefined;
  className?: string;
};

const StatsCard: React.FC<StatsCardProps> = ({ title, value, className }) => {
  return (
    <div
      className={`rounded-r-xl bg-slate-600 py-5 px-5 border-t-2 border-r-2 border-sky-400 ${
        className ? className : null
      }`}
    >
      <div className="ml-5 text-lg text-right text-gray-200 opacity-70 underline underline-offset-8">
        {title}
      </div>
      <div className="ml-5 text-3xl text-right text-gray-200 pt-3">{value}</div>
    </div>
  );
};

export default StatsCard;
