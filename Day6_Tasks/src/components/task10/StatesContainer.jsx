import React, { useState } from "react";
import { Card, CardHeader, CardContent } from "../task3/Card";
import Button from "../task3/Button";
import Input from "../task3/Input";
import Badge from "../task3/Badge";
import {
  TableSkeleton,
  EmptyState,
  NoResultsState,
  UnauthorizedState,
  RetryState,
} from "./StateComponents";

export default function StatesContainer() {
  // Simulator states for testing each view criteria
  const [currentMode, setCurrentMode] = useState("normal");
  // Modes: 'normal', 'loading', 'empty', 'no-results', 'unauthorized', 'error'

  const [searchQuery, setSearchQuery] = useState("");

  const sampleItems = [
    { id: 1, name: "Telemetry Collector", status: "Active" },
    { id: 2, name: "Auth Gateway", status: "Pending" },
  ];

  return (
    <Card>
      <CardHeader
        title="Application State Controls"
        description="Test and verify skeletons, empty lists, search misses, access blocks, and retries."
      />
      <CardContent className="space-y-6">
        {/* State Toggle Toolbar */}
        <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-slate-800">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-2">
            Simulate State:
          </span>
          <Button
            variant={currentMode === "normal" ? "primary" : "secondary"}
            onClick={() => setCurrentMode("normal")}
          >
            Normal
          </Button>
          <Button
            variant={currentMode === "loading" ? "primary" : "secondary"}
            onClick={() => setCurrentMode("loading")}
          >
            Skeleton
          </Button>
          <Button
            variant={currentMode === "empty" ? "primary" : "secondary"}
            onClick={() => setCurrentMode("empty")}
          >
            Empty
          </Button>
          <Button
            variant={currentMode === "no-results" ? "primary" : "secondary"}
            onClick={() => {
              setCurrentMode("no-results");
              setSearchQuery("Unknown Key");
            }}
          >
            No Results
          </Button>
          <Button
            variant={currentMode === "unauthorized" ? "primary" : "secondary"}
            onClick={() => setCurrentMode("unauthorized")}
          >
            Unauthorized
          </Button>
          <Button
            variant={currentMode === "error" ? "primary" : "secondary"}
            onClick={() => setCurrentMode("error")}
          >
            Retry / Error
          </Button>
        </div>

        {/* Dynamic Display Area */}
        <div className="min-h-[250px]">
          {currentMode === "loading" && <TableSkeleton />}

          {currentMode === "error" && (
            <RetryState onRetry={() => setCurrentMode("normal")} />
          )}

          {currentMode === "unauthorized" && (
            <UnauthorizedState onGoBack={() => setCurrentMode("normal")} />
          )}

          {currentMode === "empty" && (
            <EmptyState
              title="No System Logs"
              description="There are currently no active system telemetry logs registered in the database."
              onAction={() => setCurrentMode("normal")}
            />
          )}

          {currentMode === "no-results" && (
            <NoResultsState
              searchQuery={searchQuery}
              onClear={() => {
                setCurrentMode("normal");
                setSearchQuery("");
              }}
            />
          )}

          {currentMode === "normal" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Input
                  placeholder="Filter active records..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="overflow-x-auto border border-slate-800 rounded-lg">
                <table className="w-full text-left text-sm text-slate-300">
                  <thead className="bg-slate-900/60 text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="py-3 px-4">Identifier</th>
                      <th className="py-3 px-4">Operational Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sampleItems.map((row) => (
                      <tr
                        key={row.id}
                        className="border-b border-slate-800 hover:bg-slate-900/40"
                      >
                        <td className="py-3 px-4 font-medium text-white">
                          {row.name}
                        </td>
                        <td className="py-3 px-4">
                          <Badge
                            variant={
                              row.status === "Active" ? "success" : "warning"
                            }
                          >
                            {row.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
