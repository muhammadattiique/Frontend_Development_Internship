export function exportTasks(tasks) {
  console.log('Export utility loaded.');

  console.log('Tasks:', tasks);

  // Convert tasks to JSON
  const data = JSON.stringify(tasks, null, 2);

  // Create a file
  const blob = new Blob([data], {
    type: 'application/json',
  });

  // Create temporary URL
  const url = URL.createObjectURL(blob);

  // Create download link
  const link = document.createElement('a');

  link.href = url;

  link.download = 'tasks.json';

  // Start download
  link.click();

  // Remove temporary URL
  URL.revokeObjectURL(url);
}
