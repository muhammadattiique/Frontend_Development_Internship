import { useReducer, useEffect } from "react";
import { initialUsers, initialProducts, initialTasks } from "./data/mockData";
import CardView from "./components/CardView";
import TableView from "./components/TableView";
import AddRecordModal from "./components/AddRecordModal";
import ConfirmDeleteModal from "./components/ConfirmDeleteModal";
import { useToast } from "./ToastContext";
import { useTheme } from "./context/ThemeContext";
import { useAuth } from "./context/AuthContext";
import { dashboardReducer, initialState } from "./reducer/dashboardReducer";
import { fakeApiCall } from "./services/api";

export default function App() {
  const [state, dispatch] = useReducer(dashboardReducer, initialState);

  useEffect(() => {
    if (!localStorage.getItem("dashboard_users")) {
      localStorage.setItem("dashboard_users", JSON.stringify(initialUsers));
      localStorage.setItem(
        "dashboard_products",
        JSON.stringify(initialProducts),
      );
      localStorage.setItem("dashboard_tasks", JSON.stringify(initialTasks));
      dispatch({
        type: "SET_INITIAL_DATA",
        payload: {
          users: initialUsers,
          products: initialProducts,
          tasks: initialTasks,
        },
      });
    }
  }, []);

  const { addToast } = useToast();
  const { theme, toggleTheme } = useTheme();
  const { user, login, logout, isAuthenticated } = useAuth();

  const handleSaveRecord = async (type, recordData, isEditing) => {
    dispatch({
      type: "OPTIMISTIC_SAVE_RECORD",
      payload: { type, recordData, isEditing },
    });
    const actionText = isEditing ? "updated" : "created";
    addToast(`Successfully ${actionText} ${type}!`, "success");

    try {
      await fakeApiCall(false);
    } catch (error) {
      dispatch({ type: "ROLLBACK_STATE" });
      addToast(error.message, "error");
    }
  };

  const handleConfirmDelete = async () => {
    const { type } = state.recordToDelete || {};
    dispatch({ type: "OPTIMISTIC_DELETE" });
    addToast(`Deleted ${type} successfully.`, "info");

    try {
      await fakeApiCall(false);
    } catch (error) {
      dispatch({ type: "ROLLBACK_STATE" });
      addToast(error.message, "error");
    }
  };

  const filteredUsers = state.users.filter((u) =>
    u.name.toLowerCase().includes(state.filterText.toLowerCase()),
  );
  const filteredProducts = state.products.filter((p) =>
    p.name.toLowerCase().includes(state.filterText.toLowerCase()),
  );
  const filteredTasks = state.tasks.filter((t) =>
    t.title.toLowerCase().includes(state.filterText.toLowerCase()),
  );

  return (
    <div className="min-h-screen text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Header Card */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white dark:bg-[#1f2028] p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-[#2e303a] gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Dashboard Overview
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Manage users, track inventory products, and coordinate operational
              tasks.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-slate-100 dark:bg-[#16171d] px-4 py-2 rounded-xl border border-slate-200 dark:border-[#2e303a]">
            <span className="text-sm font-medium">
              {isAuthenticated ? `👤 ${user.name}` : "🔒 Logged out"}
            </span>
            {isAuthenticated ? (
              <button
                onClick={() => {
                  logout();
                  addToast("Logged out successfully", "warning");
                }}
                className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-lg transition shadow-sm cursor-pointer active:scale-95"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => {
                  login({ name: "Muhammad Attique" });
                  addToast("Welcome back, Muhammad!", "success");
                }}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition shadow-sm cursor-pointer active:scale-95"
              >
                Login
              </button>
            )}
          </div>
        </header>

        {/* KPI Summary Metric Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-[#1f2028] p-5 rounded-2xl border border-slate-200 dark:border-[#2e303a] shadow-sm flex items-center justify-between transition hover:-translate-y-0.5">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Total Users
              </p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                {state.users.length}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xl font-bold">
              👥
            </div>
          </div>

          <div className="bg-white dark:bg-[#1f2028] p-5 rounded-2xl border border-slate-200 dark:border-[#2e303a] shadow-sm flex items-center justify-between transition hover:-translate-y-0.5">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Total Products
              </p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                {state.products.length}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center text-xl font-bold">
              📦
            </div>
          </div>

          <div className="bg-white dark:bg-[#1f2028] p-5 rounded-2xl border border-slate-200 dark:border-[#2e303a] shadow-sm flex items-center justify-between transition hover:-translate-y-0.5">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Active Tasks
              </p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                {state.tasks.length}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xl font-bold">
              📋
            </div>
          </div>
        </div>

        {/* Toolbar Bar */}
        <div className="flex flex-wrap justify-between items-center gap-4 bg-white dark:bg-[#1f2028] p-4 rounded-2xl shadow-sm border border-slate-200 dark:border-[#2e303a]">
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            <div className="inline-flex bg-slate-100 dark:bg-[#16171d] p-1 rounded-xl border border-slate-200 dark:border-[#2e303a]">
              <button
                onClick={() =>
                  dispatch({ type: "SET_VIEW_MODE", payload: "cards" })
                }
                className={`px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer ${
                  state.viewMode === "cards"
                    ? "bg-white dark:bg-[#1f2028] text-blue-600 dark:text-blue-400 shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                Card View
              </button>
              <button
                onClick={() =>
                  dispatch({ type: "SET_VIEW_MODE", payload: "table" })
                }
                className={`px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer ${
                  state.viewMode === "table"
                    ? "bg-white dark:bg-[#1f2028] text-blue-600 dark:text-blue-400 shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                Table View
              </button>
            </div>

            <input
              type="text"
              placeholder="🔍 Search records..."
              value={state.filterText}
              onChange={(e) =>
                dispatch({ type: "SET_FILTER_TEXT", payload: e.target.value })
              }
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-[#2e303a] bg-slate-50 dark:bg-[#16171d] text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
            />
          </div>

          <div className="flex items-center gap-3 w-full lg:w-auto justify-end">
            <button
              onClick={toggleTheme}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-[#16171d] dark:hover:bg-[#2e303a] text-slate-700 dark:text-slate-300 text-sm font-medium rounded-xl transition cursor-pointer border border-slate-200 dark:border-[#2e303a] active:scale-95"
            >
              {theme === "dark" ? "🌙 Dark Mode" : "☀️ Light Mode"}
            </button>

            <button
              onClick={() => dispatch({ type: "OPEN_ADD_MODAL" })}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl shadow-md transition cursor-pointer flex items-center gap-1.5 active:scale-95"
            >
              <span>+</span> Add Record
            </button>
          </div>
        </div>

        {/* Main Content Workspace Container */}
        <main className="bg-white dark:bg-[#1f2028] p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-[#2e303a] min-h-[400px]">
          {state.viewMode === "cards" ? (
            <CardView
              users={filteredUsers}
              products={filteredProducts}
              tasks={filteredTasks}
              onEdit={(record) =>
                dispatch({ type: "OPEN_EDIT_MODAL", payload: record })
              }
              onDelete={(type, record) =>
                dispatch({ type: "INITIATE_DELETE", payload: { type, record } })
              }
            />
          ) : (
            <TableView
              users={filteredUsers}
              products={filteredProducts}
              tasks={filteredTasks}
              onEdit={(record) =>
                dispatch({ type: "OPEN_EDIT_MODAL", payload: record })
              }
              onDelete={(type, record) =>
                dispatch({ type: "INITIATE_DELETE", payload: { type, record } })
              }
            />
          )}
        </main>

        {/* Modals */}
        <AddRecordModal
          isOpen={state.isModalOpen}
          onClose={() => dispatch({ type: "CLOSE_MODAL" })}
          onSaveRecord={handleSaveRecord}
          editingRecord={state.editingRecord}
        />

        <ConfirmDeleteModal
          isOpen={!!state.recordToDelete}
          onClose={() => dispatch({ type: "CANCEL_DELETE" })}
          onConfirm={handleConfirmDelete}
          title="Confirm Deletion"
          message={`Are you sure you want to delete "${
            state.recordToDelete?.record?.name ||
            state.recordToDelete?.record?.title ||
            "this item"
          }"? This action cannot be undone.`}
        />
      </div>
    </div>
  );
}
