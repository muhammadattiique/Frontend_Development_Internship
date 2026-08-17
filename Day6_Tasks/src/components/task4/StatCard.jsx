import React from "react";

const StatCard = ({
  title,
  value,
  delta,
  deltaType = "increase",
  icon,
  loading = false,
  description,
}) => {
  if (loading) {
    return (
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl shadow-lg animate-pulse">
        <div className="flex items-center justify-between mb-4">
          <div className="h-4 bg-slate-800 rounded w-24"></div>
          <div className="w-8 h-8 bg-slate-800 rounded-lg"></div>
        </div>
        <div className="h-8 bg-slate-800 rounded w-32 mb-2"></div>
        <div className="h-3 bg-slate-800 rounded w-20"></div>
      </div>
    );
  }

  const isPositive = deltaType === "increase";

  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl shadow-lg hover:border-slate-700 transition-colors">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-slate-400">{title}</h3>
        {icon && (
          <div className="text-brand-500 bg-brand-500/10 p-2 rounded-lg">
            {icon}
          </div>
        )}
      </div>

      <div className="flex items-baseline gap-3 mb-1">
        <span className="text-3xl font-bold text-white tracking-tight">
          {value}
        </span>
        {delta && (
          <span
            className={`inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full ${
              isPositive
                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
            }`}
          >
            {isPositive ? "↑" : "↓"} {delta}
          </span>
        )}
      </div>

      {description && <p className="text-xs text-slate-500">{description}</p>}
    </div>
  );
};

export default StatCard;
