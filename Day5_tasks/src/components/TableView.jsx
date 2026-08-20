export default function TableView({
  users,
  products,
  tasks,
  onEdit,
  onDelete,
}) {
  return (
    <div className="space-y-10 text-left animate-fadeIn">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Admin Table Layout
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Structured tabular view of system records.
        </p>
      </div>

      {/* USERS TABLE */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          Users Management ({users.length})
        </h3>
        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 uppercase text-xs tracking-wider">
                <th className="p-3.5 font-semibold">ID</th>
                <th className="p-3.5 font-semibold">Name</th>
                <th className="p-3.5 font-semibold">Email</th>
                <th className="p-3.5 font-semibold">Role</th>
                <th className="p-3.5 font-semibold">Status</th>
                <th className="p-3.5 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {users.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="p-6 text-center text-slate-400 italic"
                  >
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition"
                  >
                    <td className="p-3.5 font-mono text-xs text-slate-400">
                      {user.id}
                    </td>
                    <td className="p-3.5 font-semibold text-slate-900 dark:text-white">
                      {user.name}
                    </td>
                    <td className="p-3.5">{user.email}</td>
                    <td className="p-3.5">{user.role}</td>
                    <td className="p-3.5">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold ${
                          user.status === "Active"
                            ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400"
                            : "bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-right space-x-2">
                      <button
                        onClick={() => onEdit(user)}
                        className="px-2.5 py-1 bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold rounded-lg transition active:scale-95"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete("user", user)}
                        className="px-2.5 py-1 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-lg transition active:scale-95"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* PRODUCTS TABLE */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          Products Management ({products.length})
        </h3>
        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 uppercase text-xs tracking-wider">
                <th className="p-3.5 font-semibold">ID</th>
                <th className="p-3.5 font-semibold">Name</th>
                <th className="p-3.5 font-semibold">SKU</th>
                <th className="p-3.5 font-semibold">Category</th>
                <th className="p-3.5 font-semibold">Status</th>
                <th className="p-3.5 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {products.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="p-6 text-center text-slate-400 italic"
                  >
                    No products found.
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition"
                  >
                    <td className="p-3.5 font-mono text-xs text-slate-400">
                      {product.id}
                    </td>
                    <td className="p-3.5 font-semibold text-slate-900 dark:text-white">
                      {product.name}
                    </td>
                    <td className="p-3.5 font-mono text-xs">
                      <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                        {product.sku}
                      </code>
                    </td>
                    <td className="p-3.5">{product.category}</td>
                    <td className="p-3.5">{product.status}</td>
                    <td className="p-3.5 text-right space-x-2">
                      <button
                        onClick={() => onEdit(product)}
                        className="px-2.5 py-1 bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold rounded-lg transition active:scale-95"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete("product", product)}
                        className="px-2.5 py-1 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-lg transition active:scale-95"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* TASKS TABLE */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          Tasks Management ({tasks.length})
        </h3>
        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 uppercase text-xs tracking-wider">
                <th className="p-3.5 font-semibold">ID</th>
                <th className="p-3.5 font-semibold">Title</th>
                <th className="p-3.5 font-semibold">Status</th>
                <th className="p-3.5 font-semibold">Priority</th>
                <th className="p-3.5 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {tasks.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="p-6 text-center text-slate-400 italic"
                  >
                    No tasks found.
                  </td>
                </tr>
              ) : (
                tasks.map((task) => (
                  <tr
                    key={task.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition"
                  >
                    <td className="p-3.5 font-mono text-xs text-slate-400">
                      {task.id}
                    </td>
                    <td className="p-3.5 font-semibold text-slate-900 dark:text-white">
                      {task.title}
                    </td>
                    <td className="p-3.5">{task.status}</td>
                    <td className="p-3.5">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold ${
                          task.priority === "High"
                            ? "bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400"
                            : "bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400"
                        }`}
                      >
                        {task.priority}
                      </span>
                    </td>
                    <td className="p-3.5 text-right space-x-2">
                      <button
                        onClick={() => onEdit(task)}
                        className="px-2.5 py-1 bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold rounded-lg transition active:scale-95"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete("task", task)}
                        className="px-2.5 py-1 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-lg transition active:scale-95"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
