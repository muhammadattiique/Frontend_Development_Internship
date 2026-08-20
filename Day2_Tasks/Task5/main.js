import {
  generateId,
  formatDate,
  formatStatus,
  normalizeSearchQuery,
  sortByProperty,
} from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
  console.log('Task 4: Testing Utility Helpers');

  document.querySelector('#generated-id').textContent = generateId();
  document.querySelector('#formatted-date').textContent = formatDate(
    new Date()
  );
  document.querySelector('#status-label').textContent = formatStatus(false); // "Pending"

  // Test 1: ID
  console.log('Generated ID:', generateId());

  // Test 2: Date
  console.log('Formatted Date:', formatDate(new Date()));

  // Test 3: Status
  console.log('Status Label:', formatStatus(false)); // "Pending"

  // Test 4: Search Normalization
  const rawSearch = '   Spring Boot INTERNSHIP   ';
  console.log('Normalized Search:', `"${normalizeSearchQuery(rawSearch)}"`); // "spring boot internship"

  // Test 5: Sorting helper
  const tasks = [
    { title: 'Setup', hours: 3 },
    { title: 'Design', hours: 1 },
    { title: 'API', hours: 5 },
  ];
  const sortedTasks = sortByProperty(tasks, 'hours', 'asc');
  console.log('Sorted Tasks by Hours:', sortedTasks);
});
