import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import FormInput from "./common/FormInput";
import FormSelect from "./common/FormSelect";

const defaultFormValues = {
  entityType: "user",
  name: "",
  email: "",
  role: "Contributor",
  status: "Active",
  sku: "",
  category: "Software",
  title: "",
  description: "",
  priority: "Medium",
  dueDate: "",
};

export default function AddRecordModal({
  isOpen,
  onClose,
  onSaveRecord,
  editingRecord,
}) {
  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: defaultFormValues,
  });

  const entityType = watch("entityType");

  // Pre-fill form fields when editingRecord changes or modal opens
  useEffect(() => {
    if (isOpen) {
      if (editingRecord) {
        let detectedType = "user";
        if (editingRecord.id?.startsWith("prd_")) detectedType = "product";
        else if (editingRecord.id?.startsWith("tsk_")) detectedType = "task";

        reset({
          entityType: detectedType,
          name: editingRecord.name || "",
          email: editingRecord.email || "",
          role: editingRecord.role || "Contributor",
          status: editingRecord.status || "Active",
          sku: editingRecord.sku || "",
          category: editingRecord.category || "Software",
          title: editingRecord.title || "",
          description: editingRecord.description || "",
          priority: editingRecord.priority || "Medium",
          dueDate: editingRecord.dueDate
            ? editingRecord.dueDate.split("T")[0]
            : "",
        });
      } else {
        reset(defaultFormValues);
      }
    }
  }, [editingRecord, isOpen, reset]);

  if (!isOpen) return null;

  const onSubmit = (data) => {
    const now = new Date().toISOString();
    let updatedOrNewRecord = {};

    if (data.entityType === "user") {
      updatedOrNewRecord = {
        id:
          editingRecord?.id ||
          `usr_${Math.random().toString(36).substring(2, 12)}`,
        name: data.name,
        email: data.email,
        role: data.role,
        status: data.status,
        createdAt: editingRecord?.createdAt || now,
        updatedAt: now,
      };
    } else if (data.entityType === "product") {
      updatedOrNewRecord = {
        id:
          editingRecord?.id ||
          `prd_${Math.random().toString(36).substring(2, 12)}`,
        name: data.name,
        sku: data.sku,
        category: data.category,
        status: data.status,
        createdAt: editingRecord?.createdAt || now,
        updatedAt: now,
      };
    } else if (data.entityType === "task") {
      let formattedDueDate = editingRecord?.dueDate || now;
      if (data.dueDate) {
        const [year, month, day] = data.dueDate.split("-");
        formattedDueDate = new Date(year, month - 1, day).toISOString();
      }

      updatedOrNewRecord = {
        id:
          editingRecord?.id ||
          `tsk_${Math.random().toString(36).substring(2, 12)}`,
        title: data.title,
        description: data.description,
        status: editingRecord?.status || "Todo",
        priority: data.priority,
        assignedToId: editingRecord?.assignedToId || "",
        productId: editingRecord?.productId || "",
        dueDate: formattedDueDate,
        createdAt: editingRecord?.createdAt || now,
        updatedAt: now,
      };
    }

    onSaveRecord(data.entityType, updatedOrNewRecord, !!editingRecord);
    onClose();
  };

  const errorClass = "text-rose-500 text-xs mt-1 block font-medium";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
      <div className="bg-white dark:bg-[#1f2028] border border-gray-200 dark:border-[#2e303a] p-6 rounded-2xl w-full max-w-lg shadow-2xl text-left max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          {editingRecord ? "Edit Record" : "Add New Record"}
        </h2>

        {/* Entity type tabs only display when adding a brand new record */}
        {!editingRecord && (
          <div className="flex gap-2 my-4">
            {["user", "product", "task"].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => {
                  setValue("entityType", type);
                  reset({ ...defaultFormValues, entityType: type });
                }}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition cursor-pointer capitalize border ${
                  entityType === type
                    ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                    : "bg-gray-100 dark:bg-[#2e303a] text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {entityType === "user" && (
            <>
              <div>
                <Controller
                  name="name"
                  control={control}
                  rules={{
                    required: "Full name is required.",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters.",
                    },
                    maxLength: {
                      value: 50,
                      message: "Name cannot exceed 50 characters.",
                    },
                  }}
                  render={({ field }) => (
                    <FormInput
                      label="Full Name"
                      {...field}
                      required
                      placeholder="e.g. John Doe"
                    />
                  )}
                />
                {errors.name && (
                  <span className={errorClass}>{errors.name.message}</span>
                )}
              </div>

              <div>
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: "Email address is required.",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email format.",
                    },
                  }}
                  render={({ field }) => (
                    <FormInput
                      label="Email Address"
                      type="email"
                      {...field}
                      required
                      placeholder="john@example.com"
                    />
                  )}
                />
                {errors.email && (
                  <span className={errorClass}>{errors.email.message}</span>
                )}
              </div>

              <div>
                <Controller
                  name="role"
                  control={control}
                  render={({ field }) => (
                    <FormSelect
                      label="Role"
                      {...field}
                      options={["Admin", "Manager", "Contributor", "Viewer"]}
                    />
                  )}
                />
              </div>

              <div>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <FormSelect
                      label="Status"
                      {...field}
                      options={["Active", "Inactive", "Suspended"]}
                    />
                  )}
                />
              </div>
            </>
          )}

          {entityType === "product" && (
            <>
              <div>
                <Controller
                  name="name"
                  control={control}
                  rules={{
                    required: "Product name is required.",
                    minLength: {
                      value: 2,
                      message: "Product name must be at least 2 characters.",
                    },
                  }}
                  render={({ field }) => (
                    <FormInput
                      label="Product Name"
                      {...field}
                      required
                      placeholder="e.g. Analytics Engine"
                    />
                  )}
                />
                {errors.name && (
                  <span className={errorClass}>{errors.name.message}</span>
                )}
              </div>

              <div>
                <Controller
                  name="sku"
                  control={control}
                  rules={{
                    required: "SKU is required.",
                    minLength: {
                      value: 4,
                      message: "SKU must be at least 4 characters.",
                    },
                  }}
                  render={({ field }) => (
                    <FormInput
                      label="SKU"
                      {...field}
                      required
                      placeholder="e.g. ABC-XYZ123-001"
                    />
                  )}
                />
                {errors.sku && (
                  <span className={errorClass}>{errors.sku.message}</span>
                )}
              </div>

              <div>
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <FormSelect
                      label="Category"
                      {...field}
                      options={["Software", "Hardware", "Service", "Internal"]}
                    />
                  )}
                />
              </div>

              <div>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <FormSelect
                      label="Status"
                      {...field}
                      options={[
                        "Planning",
                        "In Development",
                        "Active",
                        "Deprecated",
                      ]}
                    />
                  )}
                />
              </div>
            </>
          )}

          {entityType === "task" && (
            <>
              <div>
                <Controller
                  name="title"
                  control={control}
                  rules={{
                    required: "Task title is required.",
                    minLength: {
                      value: 3,
                      message: "Title must be at least 3 characters.",
                    },
                  }}
                  render={({ field }) => (
                    <FormInput
                      label="Task Title"
                      {...field}
                      required
                      placeholder="e.g. Fix database timeout"
                    />
                  )}
                />
                {errors.title && (
                  <span className={errorClass}>{errors.title.message}</span>
                )}
              </div>

              <div>
                <label className="block mb-1 font-semibold text-sm text-gray-700 dark:text-gray-300">
                  Description
                </label>
                <Controller
                  name="description"
                  control={control}
                  rules={{
                    maxLength: {
                      value: 250,
                      message: "Description cannot exceed 250 characters.",
                    },
                  }}
                  render={({ field }) => (
                    <textarea
                      {...field}
                      rows="3"
                      placeholder="Provide task context..."
                      className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  )}
                />
                {errors.description && (
                  <span className={errorClass}>
                    {errors.description.message}
                  </span>
                )}
              </div>

              <div>
                <Controller
                  name="priority"
                  control={control}
                  render={({ field }) => (
                    <FormSelect
                      label="Priority"
                      {...field}
                      options={["Low", "Medium", "High", "Urgent"]}
                    />
                  )}
                />
              </div>

              <div>
                <Controller
                  name="dueDate"
                  control={control}
                  render={({ field }) => (
                    <FormInput label="Due Date" type="date" {...field} />
                  )}
                />
              </div>
            </>
          )}

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-[#2e303a]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 text-sm font-medium rounded-lg transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg shadow-sm transition cursor-pointer"
            >
              {editingRecord ? "Update Record" : "Save Record"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
