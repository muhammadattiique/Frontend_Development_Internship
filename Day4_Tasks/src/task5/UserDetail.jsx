import React from "react";
import { useParams, Link } from "react-router-dom";

const usersData = {
  101: {
    name: "Alice Johnson",
    role: "Frontend Developer",
    email: "alice@example.com",
  },
  102: {
    name: "Bob Smith",
    role: "Backend Architect",
    email: "bob@example.com",
  },
  103: {
    name: "Charlie Davis",
    role: "UI/UX Designer",
    email: "charlie@example.com",
  },
};

export default function UserDetail() {
  const { id } = useParams();
  const user = usersData[id];

  if (!user) {
    return (
      <div className="text-center py-12 text-slate-500 font-semibold">
        User profile not found.
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
      <Link
        to="/users"
        className="text-indigo-600 text-sm font-semibold hover:underline mb-4 inline-block"
      >
        &larr; Back to Users
      </Link>
      <h1 className="text-3xl font-bold mb-2 text-slate-900">{user.name}</h1>
      <p className="text-slate-700 font-medium mb-2">{user.role}</p>
      <p className="text-slate-500 text-sm mb-4">Email: {user.email}</p>
      <p className="mt-6 text-xs text-slate-400 font-mono">
        Current Route ID Param: {id}
      </p>
    </div>
  );
}
