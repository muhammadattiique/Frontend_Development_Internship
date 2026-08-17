import React from "react";

const Badge = ({ children, variant = "brand" }) => {
  const variants = {
    brand: "bg-brand-500/10 text-brand-500 border border-brand-500/20",
    success: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    warning: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
    neutral: "bg-slate-800 text-slate-300 border border-slate-700",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]}`}
    >
      {children}
    </span>
  );
};

export default Badge;
