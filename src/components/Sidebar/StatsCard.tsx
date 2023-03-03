import React from "react";

type StatsCardProps = {
  title: string;
  value: string | number | undefined;
  className?: string;
};

const StatsCard: React.FC<StatsCardProps> = ({ title, value, className }) => {
  return (
    <div
      className={`rounded-r-xl border-t-2 border-r-2 border-sky-400 bg-slate-600 py-5 px-5 ${
        className ? className : null
      }`}
    >
      <div className="ml-5 text-right text-lg text-gray-200 underline underline-offset-8 opacity-70">
        {title}
      </div>
      <div className="ml-5 pt-3 text-right text-3xl text-gray-200">{value}</div>
    </div>
  );
};

export default StatsCard;
