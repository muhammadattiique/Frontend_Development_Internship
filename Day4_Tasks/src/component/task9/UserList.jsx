import React, { useEffect, useState } from "react";
import { userService } from "../../services/task9/userService";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await userService.getAllUsers();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading)
    return <div className="p-6 text-slate-500">Loading users...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md border border-slate-200 mt-10">
      <h2 className="text-xl font-bold mb-4 text-slate-800">
        Task 9: Centralized API Service
      </h2>
      <ul className="space-y-2">
        {users.map((user) => (
          <li
            key={user.id}
            className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-sm font-medium"
          >
            {user.firstName} {user.lastName}{" "}
            <span className="text-slate-400">({user.email})</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
