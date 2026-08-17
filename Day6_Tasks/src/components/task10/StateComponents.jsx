import React from "react";
import Button from "../task3/Button";

// 1. Skeleton Loading State
export function TableSkeleton() {
  return (
    <div className="space-y-3 animate-pulse">
      <div className="h-10 bg-slate-800 rounded-lg w-full"></div>
      <div className="h-12 bg-slate-900/80 rounded-lg w-full"></div>
      <div className="h-12 bg-slate-900/80 rounded-lg w-full"></div>
      <div className="h-12 bg-slate-900/80 rounded-lg w-full"></div>
    </div>
  );
}

// 2. Empty State (Zero initial records)
export function EmptyState({
  title = "No records found",
  description = "Get started by adding your first item.",
  onAction,
}) {
  return (
    <div className="flex flex-col items-center justify-center p-10 text-center border border-dashed border-slate-700 rounded-lg bg-slate-900/20">
      <svg
        className="w-12 h-12 text-slate-500 mb-3"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
        />
      </svg>
      <h3 className="text-lg font-medium text-white">{title}</h3>
      <p className="text-sm text-slate-400 mt-1 max-w-sm">{description}</p>
      {onAction && (
        <div className="mt-4">
          <Button variant="primary" onClick={onAction}>
            Add First Record
          </Button>
        </div>
      )}
    </div>
  );
}

// 3. No-Results State (Search or filter yields nothing)
export function NoResultsState({ searchQuery, onClear }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-slate-900/10 rounded-lg border border-slate-800">
      <svg
        className="w-10 h-10 text-slate-500 mb-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <h4 className="text-base font-medium text-slate-200">
        No matching search results
      </h4>
      <p className="text-sm text-slate-400 mt-1">
        We couldn't find anything matching{" "}
        <span className="text-white font-semibold">"{searchQuery}"</span>.
      </p>
      {onClear && (
        <div className="mt-4">
          <Button variant="secondary" onClick={onClear}>
            Clear Search
          </Button>
        </div>
      )}
    </div>
  );
}

// 4. Unauthorized State (Restricted view)
export function UnauthorizedState({ onGoBack }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center px-4">
      <div className="w-14 h-14 bg-red-500/10 text-red-400 rounded-full flex items-center justify-center mb-4 border border-red-500/20">
        <svg
          className="w-7 h-7"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>
      <h2 className="text-xl font-bold text-white">Access Restricted</h2>
      <p className="text-sm text-slate-400 mt-1 max-w-md">
        You do not possess the clearance level required to inspect secure
        telemetry blocks.
      </p>
      {onGoBack && (
        <div className="mt-6">
          <Button variant="primary" onClick={onGoBack}>
            Switch to Standard View
          </Button>
        </div>
      )}
    </div>
  );
}

// 5. Retry State (Network or server failure)
export function RetryState({
  message = "Failed to sync data stream.",
  onRetry,
}) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center border border-red-500/30 bg-red-950/10 rounded-lg">
      <svg
        className="w-10 h-10 text-red-400 mb-3"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <h3 className="text-base font-medium text-white">Connection Error</h3>
      <p className="text-sm text-slate-400 mt-1">{message}</p>
      {onRetry && (
        <div className="mt-4">
          <Button variant="primary" onClick={onRetry}>
            Retry Connection
          </Button>
        </div>
      )}
    </div>
  );
}
