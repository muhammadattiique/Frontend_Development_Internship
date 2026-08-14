// 1. ID Generator
export function generateId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

// 2. Date Formatting
export function formatDate(dateInput) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateInput).toLocaleDateString('en-US', options);
}

// 3. Status Labels
export function formatStatus(isCompleted) {
  return isCompleted ? 'Completed' : 'Pending';
}

// 4. Search Normalization
export function normalizeSearchQuery(query) {
  if (!query) return '';
  return query.trim().toLowerCase();
}

// 5. Dynamic Sorting Helper
export function sortByProperty(array, property, direction = 'asc') {
  return [...array].sort((a, b) => {
    let valA = a[property];
    let valB = b[property];

    // Handle strings case-insensitively
    if (typeof valA === 'string') valA = valA.toLowerCase();
    if (typeof valB === 'string') valB = valB.toLowerCase();

    if (valA < valB) return direction === 'asc' ? -1 : 1;
    if (valA > valB) return direction === 'asc' ? 1 : -1;
    return 0;
  });
}
