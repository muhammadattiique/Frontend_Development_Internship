import React, { useState, lazy, Suspense } from "react";
import Layout from "./components/task2/Layout";

// Task 8: Lightweight Loading Fallback UI for Suspense boundaries
import PageLoader from "./components/task8/PageLoader";

// Task 9: Route/Page-Level Error Boundary Component
import ErrorBoundary from "./components/task9/ErrorBoundary";

// Task 3 UI Components (Core layout/static elements kept eager for instant mount)
import Button from "./components/task3/Button";
import { Card, CardHeader, CardContent } from "./components/task3/Card";
import Badge from "./components/task3/Badge";
import Input from "./components/task3/Input";
import EmptyState from "./components/task3/EmptyState";

// Task 4 StatCard Component (Kept eager for smooth initial overview render)
import StatCard from "./components/task4/StatCard";

// Task 10: Application States Demonstration Container
import StatesContainer from "./components/task10/StatesContainer";

// Task 5, 6, & 7 Components converted to Lazy-Loaded Chunks
const AdvancedTable = lazy(() => import("./components/task5/AdvancedTable"));
const TrendChart = lazy(() => import("./components/task6/TrendChart"));
const CategoryBreakdown = lazy(
  () => import("./components/task6/CategoryBreakdown"),
);
const OptimizedTableParent = lazy(
  () => import("./components/task7/OptimizedTableParent"),
);

function App() {
  const [activeTab, setActiveTab] = useState("overview");

  // Loading state toggle for testing Task 4 skeleton states
  const [isLoadingStats, setIsLoadingStats] = useState(false);

  return (
    <Layout activeTab={activeTab} onSelectTab={setActiveTab}>
      {/* OVERVIEW VIEW (Wrapped with ErrorBoundary for full protection) */}
      {activeTab === "overview" && (
        <ErrorBoundary>
          <div className="space-y-8 pb-10 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-white tracking-tight">
                  Dashboard Overview
                </h1>
                <p className="text-slate-400 mt-1">
                  Welcome back! Here is your system summary with metrics and
                  live data states.
                </p>
              </div>
              <Button
                variant="secondary"
                onClick={() => setIsLoadingStats(!isLoadingStats)}
              >
                {isLoadingStats
                  ? "Show Loaded State"
                  : "Simulate Skeleton Loading"}
              </Button>
            </div>

            {/* Task 4: Stat Cards Grid with Labels, Values, Deltas & Skeletons */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Revenue"
                value="$48,250.89"
                delta="+12.3%"
                deltaType="increase"
                description="Compared to last month"
                loading={isLoadingStats}
                icon={
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                }
              />

              <StatCard
                title="Active Users"
                value="2,415"
                delta="+5.4%"
                deltaType="increase"
                description="Past 24 hours activity"
                loading={isLoadingStats}
                icon={
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                }
              />

              <StatCard
                title="System Latency"
                value="142ms"
                delta="-2.1%"
                deltaType="decrease"
                description="Optimized performance"
                loading={isLoadingStats}
                icon={
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                }
              />

              <StatCard
                title="Bounce Rate"
                value="42.4%"
                delta="+1.8%"
                deltaType="increase"
                description="Slight upward trend"
                loading={isLoadingStats}
                icon={
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                }
              />
            </div>
          </div>
        </ErrorBoundary>
      )}

      {/* ANALYTICS VIEW (Protected with ErrorBoundary + Suspense) */}
      {activeTab === "analytics" && (
        <ErrorBoundary>
          <Suspense fallback={<PageLoader />}>
            <div className="space-y-6 pb-10 animate-fade-in">
              <div>
                <h1 className="text-3xl font-bold text-white tracking-tight">
                  Analytics & Trends
                </h1>
                <p className="text-slate-400 mt-1">
                  Performance telemetry, revenue trends, and category
                  distribution breakdowns.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <TrendChart />
                <CategoryBreakdown />
              </div>
            </div>
          </Suspense>
        </ErrorBoundary>
      )}

      {/* PROJECTS VIEW (Protected with ErrorBoundary + Suspense) */}
      {activeTab === "projects" && (
        <ErrorBoundary>
          <Suspense fallback={<PageLoader />}>
            <div className="space-y-6 pb-10 animate-fade-in">
              <div>
                <h1 className="text-3xl font-bold text-white tracking-tight">
                  Projects
                </h1>
                <p className="text-slate-400 mt-1">
                  Manage your team deliverables, track execution states, and
                  filter records.
                </p>
              </div>

              <AdvancedTable />
            </div>
          </Suspense>
        </ErrorBoundary>
      )}

      {/* SETTINGS VIEW (Protected with ErrorBoundary + Suspense) */}
      {activeTab === "settings" && (
        <ErrorBoundary>
          <Suspense fallback={<PageLoader />}>
            <div className="space-y-6 pb-10 animate-fade-in">
              <div>
                <h1 className="text-3xl font-bold text-white tracking-tight">
                  Settings & System States
                </h1>
                <p className="text-slate-400 mt-1">
                  Inspect performance audits and test various UI state patterns.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-8">
                {/* Task 10: Skeletons, Empty, No-Results, Unauthorized, and Retry States */}
                <StatesContainer />

                {/* Task 7: Optimized Component Tree Inspection */}
                <OptimizedTableParent />
              </div>
            </div>
          </Suspense>
        </ErrorBoundary>
      )}
    </Layout>
  );
}

export default App;
