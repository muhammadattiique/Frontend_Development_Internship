import React, { useState, useMemo, useCallback, useRef } from "react";
import { Card, CardHeader, CardContent } from "../task3/Card";
import Input from "../task3/Input";
import HeavyList from "./HeavyList";

export default function OptimizedTableParent() {
  const [filterText, setFilterText] = useState("");
  const [counter, setCounter] = useState(0);

  const filterExecutionCount = useRef(0);

  // Raw dataset
  const rawData = useMemo(
    () => [
      { id: 1, name: "Muhammad Attique Tariq", role: "Lead Developer" },
      { id: 2, name: "Talha Ahmed", role: "Backend Engineer" },
      { id: 3, name: "Sarah Jenkins", role: "UI/UX Designer" },
      { id: 4, name: "Alex Rivera", role: "DevOps Specialist" },
      { id: 5, name: "Elena Rostova", role: "QA Automation Engineer" },
    ],
    [],
  );

  // useMemo: Only recalculates when rawData or filterText actually changes
  const filteredItems = useMemo(() => {
    filterExecutionCount.current += 1;
    console.log(
      `[Performance Metrics] Executed heavy filter calculation #${filterExecutionCount.current}`,
    );

    return rawData.filter(
      (item) =>
        item.name.toLowerCase().includes(filterText.toLowerCase()) ||
        item.role.toLowerCase().includes(filterText.toLowerCase()),
    );
  }, [rawData, filterText]);

  // useCallback: Stabilizes function reference so memoized rows aren't invalidated
  const handleSelectItem = useCallback((id) => {
    alert(`Selected item ID: ${id}`);
  }, []);

  return (
    <Card>
      <CardHeader
        title="Measurable Performance Optimization"
        description="Verify render isolation using React.memo, useMemo, and useCallback."
      />
      <CardContent className="space-y-6">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-lg flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <div>
            <span className="text-slate-400">Filter Execution Count: </span>
            <span className="font-bold text-brand-400">
              {filterExecutionCount.current}
            </span>
            <p className="text-xs text-slate-500 mt-0.5">
              Will NOT increase when clicking independent state re-renders.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-slate-400">Independent State: {counter}</span>
            <button
              onClick={() => setCounter((c) => c + 1)}
              className="bg-slate-800 hover:bg-slate-700 text-white text-xs px-3 py-2 rounded border border-slate-700 transition"
            >
              Trigger Sibling Re-render
            </button>
          </div>
        </div>

        <div className="w-full md:w-80">
          <Input
            label="Filter Records"
            placeholder="Search by name or role..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
        </div>

        <HeavyList items={filteredItems} onSelectItem={handleSelectItem} />
      </CardContent>
    </Card>
  );
}
