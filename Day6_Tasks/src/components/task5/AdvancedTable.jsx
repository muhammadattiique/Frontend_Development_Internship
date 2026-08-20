import React, { useState, useMemo } from "react";
import Button from "../task3/Button";
import Badge from "../task3/Badge";
import Input from "../task3/Input";

export default function AdvancedTable() {
  // Initial Mock Dataset
  const [data, setData] = useState([
    {
      id: 1,
      name: "Frontend Setup",
      category: "Frontend",
      status: "Completed",
      date: "Aug 16, 2026",
      owner: "Attique",
    },
    {
      id: 2,
      name: "Design System UI",
      category: "Design",
      status: "In Progress",
      date: "Aug 17, 2026",
      owner: "Talha",
    },
    {
      id: 3,
      name: "API Gateway Microservice",
      category: "Backend",
      status: "Pending",
      date: "Aug 18, 2026",
      owner: "Attique",
    },
    {
      id: 4,
      name: "Kafka Event Bus",
      category: "Backend",
      status: "Completed",
      date: "Aug 19, 2026",
      owner: "DevOps",
    },
    {
      id: 5,
      name: "React Router Integration",
      category: "Frontend",
      status: "In Progress",
      date: "Aug 20, 2026",
      owner: "Talha",
    },
    {
      id: 6,
      name: "Docker Compose Setup",
      category: "DevOps",
      status: "Pending",
      date: "Aug 21, 2026",
      owner: "Attique",
    },
  ]);

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Filter and Search Logic
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.owner.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [data, searchQuery, statusFilter]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, currentPage]);

  // Row Action Handler
  const handleDelete = (id) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  const handleStatusToggle = (id) => {
    setData((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextStatus =
            item.status === "Completed"
              ? "Pending"
              : item.status === "Pending"
                ? "In Progress"
                : "Completed";
          return { ...item, status: nextStatus };
        }
        return item;
      }),
    );
  };

  // Badge mapping utility
  const getBadgeVariant = (status) => {
    switch (status) {
      case "Completed":
        return "success";
      case "In Progress":
        return "brand";
      case "Pending":
        return "warning";
      default:
        return "neutral";
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-lg overflow-hidden">
      {/* Table Header Controls: Search & Status Filter */}
      <div className="p-6 border-b border-slate-800 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-white">
            Project Deliverables
          </h3>
          <p className="text-sm text-slate-400 mt-0.5">
            Manage, filter, and track project execution states.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Search Input */}
          <div className="w-full sm:w-64">
            <Input
              placeholder="Search by name or owner..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          {/* Status Filter Dropdown */}
          <select
            className="w-full sm:w-auto px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 text-sm focus:outline-none focus:border-brand-500"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="All">All Statuses</option>
            <option value="Completed">Completed</option>
            <option value="In Progress">In Progress</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Responsive Table Container */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-950/50 text-slate-400 border-b border-slate-800">
            <tr>
              <th className="px-6 py-3 font-medium">Project Name</th>
              <th className="px-6 py-3 font-medium">Category</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium">Owner</th>
              <th className="px-6 py-3 font-medium">Due Date</th>
              <th className="px-6 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {paginatedData.length > 0 ? (
              paginatedData.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-slate-800/50 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-white">
                    {row.name}
                  </td>
                  <td className="px-6 py-4 text-slate-400">{row.category}</td>
                  <td className="px-6 py-4">
                    <Badge variant={getBadgeVariant(row.status)}>
                      {row.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">{row.owner}</td>
                  <td className="px-6 py-4 text-slate-400">{row.date}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => handleStatusToggle(row.id)}
                      className="text-xs px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded transition-colors cursor-pointer"
                    >
                      Cycle Status
                    </button>
                    <button
                      onClick={() => handleDelete(row.id)}
                      className="text-xs px-2.5 py-1 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded transition-colors cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="px-6 py-12 text-center text-slate-500"
                >
                  No matching records found. Try clearing your search or
                  filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="px-6 py-4 bg-slate-950/30 border-t border-slate-800 flex items-center justify-between text-sm text-slate-400">
        <div>
          Showing{" "}
          <span className="font-medium text-white">
            {paginatedData.length > 0
              ? (currentPage - 1) * itemsPerPage + 1
              : 0}
          </span>{" "}
          to{" "}
          <span className="font-medium text-white">
            {Math.min(currentPage * itemsPerPage, filteredData.length)}
          </span>{" "}
          of{" "}
          <span className="font-medium text-white">{filteredData.length}</span>{" "}
          results
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="text-xs px-3 py-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </Button>
          <span className="px-2 text-slate-300">
            Page {currentPage} of {totalPages || 1}
          </span>
          <Button
            variant="outline"
            disabled={currentPage >= totalPages}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            className="text-xs px-3 py-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
