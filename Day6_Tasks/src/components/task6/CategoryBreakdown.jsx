import React from "react";
import { Card, CardHeader, CardContent } from "../task3/Card";

export default function CategoryBreakdown() {
  const categories = [
    {
      name: "Frontend Engineering",
      percentage: 45,
      count: "12 tasks",
      color: "bg-brand-500",
    },
    {
      name: "Backend Microservices",
      percentage: 30,
      count: "8 tasks",
      color: "bg-emerald-500",
    },
    {
      name: "DevOps & Containers",
      percentage: 15,
      count: "4 tasks",
      color: "bg-amber-500",
    },
    {
      name: "UI/UX System Design",
      percentage: 10,
      count: "3 tasks",
      color: "bg-purple-500",
    },
  ];

  return (
    <Card>
      <CardHeader
        title="Category Breakdown"
        description="Distribution of active project domains."
      />
      <CardContent className="space-y-5">
        {categories.map((cat, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-slate-200">{cat.name}</span>
              <span className="text-slate-400">
                {cat.count} ({cat.percentage}%)
              </span>
            </div>
            <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
              <div
                style={{ width: `${cat.percentage}%` }}
                className={`h-full rounded-full ${cat.color} transition-all duration-500`}
              ></div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
