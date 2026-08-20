import React from "react";

const Topbar = ({ onOpenMobileMenu }) => {
  return (
    <header className="h-16 bg-surface-dark border-b border-slate-800 px-6 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-4">
        {/* Mobile menu trigger */}
        <button
          onClick={onOpenMobileMenu}
          className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
          aria-label="Open Menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <h2 className="text-lg font-semibold text-white">Dashboard Overview</h2>
      </div>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-brand-500 flex items-center justify-center font-bold text-white text-sm">
          AT
        </div>
      </div>
    </header>
  );
};

export default Topbar;
