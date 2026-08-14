export async function fetchProducts(queryParams = "") {
  const response = await fetch(`https://dummyjson.com/products${queryParams}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.statusText}`);
  }
  return await response.json();
}

export async function fetchProductById(id) {
  const response = await fetch(`https://dummyjson.com/products/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch product details: ${response.statusText}`);
  }
  return await response.json();
}

export async function fetchCategories() {
  const response = await fetch("https://dummyjson.com/products/categories");
  if (!response.ok) {
    throw new Error(`Failed to fetch categories: ${response.statusText}`);
  }
  return await response.json();
}
