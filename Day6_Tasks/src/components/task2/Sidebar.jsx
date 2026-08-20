import React from "react";

const Sidebar = ({ activeTab = "overview", onSelectTab }) => {
  const menuItems = [
    { id: "overview", label: "Overview" },
    { id: "analytics", label: "Analytics" },
    { id: "projects", label: "Projects" },
    { id: "settings", label: "Settings" },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-surface-dark border-r border-slate-800 text-slate-300 p-6 shrink-0">
      <div className="text-xl font-bold text-brand-500 mb-8 tracking-wide">
        Dashboard
      </div>
      <nav className="space-y-2 flex-1">
        {menuItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                console.log("Switching tab to:", item.id); // Check your browser console (F12) to see if this logs
                if (onSelectTab) onSelectTab(item.id);
              }}
              className={`w-full text-left px-4 py-2.5 rounded-lg font-medium transition-colors cursor-pointer ${
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
      <div className="pt-4 border-t border-slate-800 text-xs text-slate-500">
        Day 6 Task 2
      </div>
    </aside>
  );
};

export default Sidebar;
