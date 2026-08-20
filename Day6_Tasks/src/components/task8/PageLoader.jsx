import React from "react";

export default function PageLoader() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
      <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" />
      <p className="text-sm text-slate-400 font-medium tracking-wide">
        Loading page content...
      </p>
    </div>
  );
}
