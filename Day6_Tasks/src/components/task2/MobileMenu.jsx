import React from "react";

const MobileMenu = ({
  isOpen,
  onClose,
  activeTab = "overview",
  onSelectTab,
}) => {
  if (!isOpen) return null;

  const menuItems = [
    { id: "overview", label: "Overview" },
    { id: "analytics", label: "Analytics" },
    { id: "projects", label: "Projects" },
    { id: "settings", label: "Settings" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex md:hidden">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div className="relative w-64 bg-surface-dark border-r border-slate-800 p-6 flex flex-col z-10 text-slate-300">
        <div className="flex items-center justify-between mb-8">
          <span className="text-xl font-bold text-brand-500">Dashboard</span>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white focus:outline-none"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <nav className="space-y-2 flex-1">
          {menuItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (onSelectTab) onSelectTab(item.id);
                  onClose();
                }}
                className={`w-full text-left px-4 py-2.5 rounded-lg font-medium transition-colors ${
                  isActive
                    ? "bg-brand-500/10 text-brand-500"
                    : "hover:bg-slate-800 hover:text-white text-slate-400"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;
