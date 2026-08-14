// --- USER MODEL ---
export type UserRole = "Admin" | "Manager" | "Contributor" | "Viewer";
export type UserStatus = "Active" | "Inactive" | "Suspended";

export interface User {
  id: string; // e.g., "usr_9f8e7d6c5b"
  name: string; // 2 to 50 characters
  email: string; // Valid, unique email format
  role: UserRole;
  status: UserStatus;
  createdAt: string; // ISO 8601 timestamp
  updatedAt: string; // ISO 8601 timestamp
}

// --- PRODUCT MODEL ---
export type ProductCategory = "Software" | "Hardware" | "Service" | "Internal";
export type ProductStatus =
  | "Planning"
  | "In Development"
  | "Active"
  | "Deprecated";

export interface Product {
  id: string; // e.g., "prd_1a2b3c4d5e"
  name: string; // 3 to 100 characters
  sku: string; // Pattern: ^[A-Z]{3}-[A-Z0-9]{3,}-\d{3}$
  category: ProductCategory;
  status: ProductStatus;
  createdAt: string;
  updatedAt: string;
}

// --- TASK MODEL ---
export type TaskStatus =
  | "Backlog"
  | "Todo"
  | "In Progress"
  | "In Review"
  | "Done";
export type TaskPriority = "Low" | "Medium" | "High" | "Urgent";

export interface Task {
  id: string; // e.g., "tsk_8h7g6f5e4d"
  title: string; // 5 to 150 characters
  description?: string; // Max 1000 characters
  status: TaskStatus;
  priority: TaskPriority;
  assignedToId?: string; // Foreign key -> User.id
  productId?: string; // Foreign key -> Product.id
  dueDate?: string; // ISO 8601 timestamp
  createdAt: string;
  updatedAt: string;
}
