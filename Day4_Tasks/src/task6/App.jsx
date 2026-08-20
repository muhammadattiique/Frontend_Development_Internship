import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import QueryManager from "./QueryManager";

export default function Task6App() {
  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Task 6: Query Params</h1>
      <QueryManager />
    </div>
  );
}
