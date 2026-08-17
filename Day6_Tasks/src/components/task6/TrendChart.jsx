import React from "react";
import { Card, CardHeader, CardContent } from "../task3/Card";

export default function TrendChart() {
  const trendData = [
    { day: "Mon", value: 40, label: "$4.2k" },
    { day: "Tue", value: 65, label: "$6.8k" },
    { day: "Wed", value: 45, label: "$4.9k" },
    { day: "Thu", value: 80, label: "$8.5k" },
    { day: "Fri", value: 95, label: "$10.2k" },
    { day: "Sat", value: 60, label: "$6.1k" },
    { day: "Sun", value: 85, label: "$9.0k" },
  ];

  return (
    <Card>
      <CardHeader
        title="Weekly Revenue Trends"
        description="Performance velocity over the past 7 days."
      />
      <CardContent>
        <div className="h-48 flex items-end justify-between gap-2 pt-6 px-2 border-b border-slate-800">
          {trendData.map((item, index) => (
            <div
              key={index}
              className="flex-1 flex flex-col items-center gap-2 group relative"
            >
              {/* Tooltip on Hover */}
              <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-xs py-1 px-2 rounded shadow pointer-events-none whitespace-nowrap">
                {item.label}
              </div>

              {/* Bar Fill */}
              <div
                style={{ height: `${item.value}%` }}
                className="w-full bg-brand-500/80 group-hover:bg-brand-500 rounded-t transition-all duration-300"
              ></div>
              <span className="text-xs text-slate-400 pb-2">{item.day}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between pt-4 text-xs text-slate-400">
          <span>Target: $8.0k/day</span>
          <span className="text-emerald-400 font-medium">
            ↑ 14.2% vs last week
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
