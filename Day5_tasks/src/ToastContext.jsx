import { createContext, useContext, useState, useCallback } from "react";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  // Function to add a toast
  const addToast = useCallback((message, type = "info", duration = 4000) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);

    // Automatically remove toast after duration
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, []);

  // Function to remove a toast by ID
  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
}

// Custom hook to consume the toast context easily
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

// Toast Container & UI Component
function ToastContainer({ toasts, removeToast }) {
  const getToastStyles = (type) => {
    switch (type) {
      case "success":
        return { background: "#d4edda", color: "#155724", border: "#c3e6cb" };
      case "error":
        return { background: "#f8d7da", color: "#721c24", border: "#f5c6cb" };
      case "warning":
        return { background: "#fff3cd", color: "#856404", border: "#ffeeba" };
      case "info":
      default:
        return { background: "#d1ecf1", color: "#0c5460", border: "#bee5eb" };
    }
  };

  const icons = {
    success: "✔️",
    error: "❌",
    warning: "⚠️",
    info: "ℹ️",
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        maxWidth: "350px",
        width: "100%",
      }}
    >
      {toasts.map((toast) => {
        const styles = getToastStyles(toast.type);
        return (
          <div
            key={toast.id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 16px",
              borderRadius: "6px",
              border: `1px solid ${styles.border}`,
              backgroundColor: styles.background,
              color: styles.color,
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              fontSize: "14px",
              fontFamily: "sans-serif",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span>{icons[toast.type]}</span>
              <span>{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              style={{
                background: "transparent",
                border: "none",
                color: styles.color,
                fontSize: "16px",
                cursor: "pointer",
                padding: "0 4px",
                fontWeight: "bold",
              }}
            >
              &times;
            </button>
          </div>
        );
      })}
    </div>
  );
}
