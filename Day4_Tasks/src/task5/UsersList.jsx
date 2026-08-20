import React from "react";
import { Link } from "react-router-dom";

const users = [
  { id: 101, name: "Alice Johnson", role: "Frontend Developer" },
  { id: 102, name: "Bob Smith", role: "Backend Architect" },
  { id: 103, name: "Charlie Davis", role: "UI/UX Designer" },
];

export default function UsersList() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-slate-900">User Directory</h1>
      <div className="grid gap-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex justify-between items-center"
          >
            <div>
              <h3 className="font-bold text-lg text-slate-800">{user.name}</h3>
              <p className="text-slate-500">{user.role}</p>
            </div>
            <Link
              to={`/users/${user.id}`}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors"
            >
              View Profile
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
