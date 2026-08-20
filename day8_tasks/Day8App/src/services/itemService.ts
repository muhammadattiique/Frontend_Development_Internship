export interface Item {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export async function fetchItems(): Promise<Item[]> {
  try {
    const response = await fetch('https://fakestoreapi.com/products');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: Item[] = await response.json();
    return data;
  } catch (error: any) {
    console.error('Failed to fetch items:', error.message);
    throw new Error(error.message || 'Failed to load items');
  }
}