import React from "react";
import OptimizedTableParent from "./OptimizedTableParent";

export default function Task7Preview() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10">
      <div className="max-w-4xl mx-auto space-y-8 pb-10">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Task 7: Performance Optimization Audit
          </h1>
          <p className="text-slate-400 mt-1">
            Applying `React.memo`, `useMemo`, and `useCallback` to eliminate
            unnecessary re-renders.
          </p>
        </div>

        <OptimizedTableParent />
      </div>
    </div>
  );
}
