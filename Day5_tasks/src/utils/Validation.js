export const validateUser = (user) => {
  const errors = [];
  if (!user.name || user.name.length < 2 || user.name.length > 50) {
    errors.push("Name must be between 2 and 50 characters.");
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!user.email || !emailRegex.test(user.email)) {
    errors.push("A valid email address is required.");
  }
  return errors;
};

export const validateProduct = (product) => {
  const errors = [];
  if (!product.name || product.name.length < 3 || product.name.length > 100) {
    errors.push("Product name must be between 3 and 100 characters.");
  }
  const skuRegex = /^[A-Z]{3}-[A-Z0-9]{3,}-\d{3}$/;
  if (!product.sku || !skuRegex.test(product.sku)) {
    errors.push("SKU must match format like ABC-XYZ123-001.");
  }
  return errors;
};

export const validateTask = (task) => {
  const errors = [];
  if (!task.title || task.title.length < 5 || task.title.length > 150) {
    errors.push("Task title must be between 5 and 150 characters.");
  }
  if (task.description && task.description.length > 1000) {
    errors.push("Description cannot exceed 1000 characters.");
  }
  return errors;
};
