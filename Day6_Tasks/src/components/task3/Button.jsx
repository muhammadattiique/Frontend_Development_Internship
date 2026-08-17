import React from "react";

const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface-dark cursor-pointer";

  const variants = {
    primary: "bg-brand-500 text-white hover:bg-green-600 focus:ring-brand-500",
    secondary:
      "bg-slate-800 text-slate-200 hover:bg-slate-700 focus:ring-slate-500",
    outline:
      "border border-slate-700 text-slate-300 hover:bg-slate-800 focus:ring-slate-500 bg-transparent",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
