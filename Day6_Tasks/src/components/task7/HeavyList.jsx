import React, { useRef } from "react";

// Memoized individual row using React.memo
const TableRowItem = React.memo(({ item, onSelect }) => {
  const renderCount = useRef(0);
  renderCount.current += 1;

  return (
    <tr className="border-b border-slate-800 hover:bg-slate-900/50 transition-colors">
      <td className="py-3 px-4 font-medium text-slate-200">
        {item.name}
        <span className="ml-2 text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded">
          Renders: {renderCount.current}
        </span>
      </td>
      <td className="py-3 px-4 text-slate-400">{item.role}</td>
      <td className="py-3 px-4 text-right">
        <button
          onClick={() => onSelect(item.id)}
          className="text-xs bg-brand-600 hover:bg-brand-500 text-white px-3 py-1.5 rounded transition"
        >
          Inspect
        </button>
      </td>
    </tr>
  );
});

export default function HeavyList({ items, onSelectItem }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-slate-700 text-slate-400">
            <th className="py-3 px-4">Name</th>
            <th className="py-3 px-4">Role</th>
            <th className="py-3 px-4 text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <TableRowItem key={item.id} item={item} onSelect={onSelectItem} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
