export default function ConfirmDeleteModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1100,
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "2rem",
          borderRadius: "8px",
          width: "400px",
          maxWidth: "90%",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        }}
      >
        <h3 style={{ marginTop: 0, color: "#dc3545" }}>
          {title || "Confirm Deletion"}
        </h3>
        <p
          style={{
            margin: "1rem 0",
            color: "#333",
            fontSize: "14px",
            lineHeight: "1.5",
          }}
        >
          {message ||
            "Are you sure you want to delete this record? This action cannot be undone."}
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "1rem",
            marginTop: "1.5rem",
          }}
        >
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: "0.5rem 1rem",
              background: "#f0f0f0",
              border: "1px solid #ccc",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            style={{
              padding: "0.5rem 1rem",
              background: "#dc3545",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Confirm Delete
          </button>
        </div>
      </div>
    </div>
  );
}
