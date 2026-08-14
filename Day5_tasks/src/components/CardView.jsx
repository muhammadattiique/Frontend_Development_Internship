export default function CardView({ users, products, tasks, onEdit, onDelete }) {
  return (
    <div className="space-y-12 text-left animate-fadeIn">
      <div className="border-b border-gray-200 dark:border-[#2e303a] pb-4">
        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          Card Layout{" "}
          <span className="text-sm font-normal text-gray-400">
            (Responsive)
          </span>
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Overview of all system entities organized in visual cards.
        </p>
      </div>

      {/* USERS CARDS */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <span>Users</span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
              {users.length}
            </span>
          </h3>
        </div>

        {users.length === 0 ? (
          <div className="p-10 text-center bg-gray-50/50 dark:bg-[#1f2028]/30 rounded-2xl border border-dashed border-gray-200 dark:border-[#2e303a] flex flex-col items-center justify-center space-y-3">
            <svg
              className="w-10 h-10 text-gray-400 dark:text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
              No users available.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {users.map((user) => (
              <div
                key={user.id}
                className="bg-white dark:bg-[#1f2028] border border-gray-200 dark:border-[#2e303a] p-6 rounded-2xl shadow-sm hover:shadow-md transition duration-200 hover:-translate-y-0.5 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-lg text-gray-900 dark:text-gray-100">
                      {user.name}
                    </h4>
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold ${
                        user.status === "Active"
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800/50"
                          : "bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400 border border-rose-200/50 dark:border-rose-800/50"
                      }`}
                    >
                      {user.status}
                    </span>
                  </div>

                  <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400 pt-1">
                    <p className="truncate">
                      <strong className="text-gray-400 font-medium text-xs uppercase tracking-wider block">
                        Email
                      </strong>
                      {user.email}
                    </p>
                    <p>
                      <strong className="text-gray-400 font-medium text-xs uppercase tracking-wider block">
                        Role
                      </strong>
                      {user.role}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2.5 mt-6 pt-4 border-t border-gray-100 dark:border-[#2e303a]">
                  <button
                    onClick={() => onEdit(user)}
                    className="flex-1 py-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs rounded-xl transition shadow-sm cursor-pointer active:scale-95"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete("user", user)}
                    className="flex-1 py-2 bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs rounded-xl transition shadow-sm cursor-pointer active:scale-95"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* PRODUCTS CARDS */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <span>Products</span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
              {products.length}
            </span>
          </h3>
        </div>

        {products.length === 0 ? (
          <div className="p-10 text-center bg-gray-50/50 dark:bg-[#1f2028]/30 rounded-2xl border border-dashed border-gray-200 dark:border-[#2e303a] flex flex-col items-center justify-center space-y-3">
            <svg
              className="w-10 h-10 text-gray-400 dark:text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
              No products available.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white dark:bg-[#1f2028] border border-gray-200 dark:border-[#2e303a] p-6 rounded-2xl shadow-sm hover:shadow-md transition duration-200 hover:-translate-y-0.5 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-lg text-gray-900 dark:text-gray-100">
                      {product.name}
                    </h4>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-400 border border-purple-200/50 dark:border-purple-800/50">
                      {product.status}
                    </span>
                  </div>

                  <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400 pt-1">
                    <p>
                      <strong className="text-gray-400 font-medium text-xs uppercase tracking-wider block">
                        SKU
                      </strong>
                      <code className="text-xs bg-gray-100 dark:bg-[#16171d] px-1.5 py-0.5 rounded">
                        {product.sku}
                      </code>
                    </p>
                    <p>
                      <strong className="text-gray-400 font-medium text-xs uppercase tracking-wider block">
                        Category
                      </strong>
                      {product.category}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2.5 mt-6 pt-4 border-t border-gray-100 dark:border-[#2e303a]">
                  <button
                    onClick={() => onEdit(product)}
                    className="flex-1 py-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs rounded-xl transition shadow-sm cursor-pointer active:scale-95"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete("product", product)}
                    className="flex-1 py-2 bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs rounded-xl transition shadow-sm cursor-pointer active:scale-95"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* TASKS CARDS */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <span>Tasks</span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
              {tasks.length}
            </span>
          </h3>
        </div>

        {tasks.length === 0 ? (
          <div className="p-10 text-center bg-gray-50/50 dark:bg-[#1f2028]/30 rounded-2xl border border-dashed border-gray-200 dark:border-[#2e303a] flex flex-col items-center justify-center space-y-3">
            <svg
              className="w-10 h-10 text-gray-400 dark:text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              />
            </svg>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
              No tasks available.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="bg-white dark:bg-[#1f2028] border border-gray-200 dark:border-[#2e303a] p-6 rounded-2xl shadow-sm hover:shadow-md transition duration-200 hover:-translate-y-0.5 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start gap-2">
                    <h4 className="font-bold text-lg text-gray-900 dark:text-gray-100">
                      {task.title}
                    </h4>
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap ${
                        task.priority === "High"
                          ? "bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400 border border-rose-200/50"
                          : "bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400 border border-amber-200/50"
                      }`}
                    >
                      {task.priority} Priority
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {task.description}
                  </p>

                  <p className="text-sm text-gray-600 dark:text-gray-400 pt-1">
                    <strong className="text-gray-400 font-medium text-xs uppercase tracking-wider block">
                      Status
                    </strong>
                    {task.status}
                  </p>
                </div>

                <div className="flex gap-2.5 mt-6 pt-4 border-t border-gray-100 dark:border-[#2e303a]">
                  <button
                    onClick={() => onEdit(task)}
                    className="flex-1 py-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs rounded-xl transition shadow-sm cursor-pointer active:scale-95"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete("task", task)}
                    className="flex-1 py-2 bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs rounded-xl transition shadow-sm cursor-pointer active:scale-95"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
