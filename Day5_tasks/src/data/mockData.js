export const initialUsers = [
  {
    id: "usr_9f8e7d6c5b",
    name: "Sarah Jenkins",
    email: "sarah.jenkins@example.com",
    role: "Admin", // Options: "Admin", "Manager", "Contributor", "Viewer"
    status: "Active", // Options: "Active", "Inactive", "Suspended"
    createdAt: "2026-08-01T08:00:00Z",
    updatedAt: "2026-08-10T14:30:00Z",
  },
  {
    id: "usr_1a2b3c4d5e",
    name: "Alex Rivera",
    email: "alex.rivera@example.com",
    role: "Contributor",
    status: "Active",
    createdAt: "2026-08-02T09:15:00Z",
    updatedAt: "2026-08-11T10:00:00Z",
  },
  {
    id: "usr_3f4e5d6c7b",
    name: "Elena Rostova",
    email: "elena.rostova@example.com",
    role: "Manager",
    status: "Inactive",
    createdAt: "2026-08-05T11:20:00Z",
    updatedAt: "2026-08-12T16:00:00Z",
  },
];

export const initialProducts = [
  {
    id: "prd_1a2b3c4d5e",
    name: "Cloud Analytics Dashboard",
    sku: "CAD-V2-001",
    category: "Software", // Options: "Software", "Hardware", "Service", "Internal"
    status: "In Development", // Options: "Planning", "In Development", "Active", "Deprecated"
    createdAt: "2026-07-15T10:00:00Z",
    updatedAt: "2026-08-12T09:15:00Z",
  },
  {
    id: "prd_9z8y7x6w5v",
    name: "Enterprise Gateway Hub",
    sku: "EGH-X1-042",
    category: "Hardware",
    status: "Active",
    createdAt: "2026-06-10T08:30:00Z",
    updatedAt: "2026-08-01T12:00:00Z",
  },
];

export const initialTasks = [
  {
    id: "tsk_8h7g6f5e4d",
    title: "Implement JWT Refresh Token Rotation",
    description:
      "Ensure expired access tokens securely trigger a refresh flow via secure cookies.",
    status: "In Progress", // Options: "Backlog", "Todo", "In Progress", "In Review", "Done"
    priority: "High", // Options: "Low", "Medium", "High", "Urgent"
    assignedToId: "usr_9f8e7d6c5b",
    productId: "prd_1a2b3c4d5e",
    dueDate: "2026-08-20T23:59:59Z",
    createdAt: "2026-08-13T11:00:00Z",
    updatedAt: "2026-08-14T09:00:00Z",
  },
  {
    id: "tsk_2a3b4c5d6e",
    title: "Configure Kafka Message Serializers",
    description:
      "Set up JSON schema registries for event-driven microservices communication.",
    status: "Todo",
    priority: "Urgent",
    assignedToId: "usr_1a2b3c4d5e",
    productId: "prd_1a2b3c4d5e",
    dueDate: "2026-08-25T17:00:00Z",
    createdAt: "2026-08-14T08:00:00Z",
    updatedAt: "2026-08-14T08:00:00Z",
  },
];
