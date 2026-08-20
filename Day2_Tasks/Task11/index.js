const form = document.querySelector('#taskForm');

const title = document.querySelector('#title');

const priority = document.querySelector('#priority');

const exportBtn = document.querySelector('#exportBtn');

const status = document.querySelector('#status');

const tableBody = document.querySelector('#tableBody');

// -------------------------
// TASK ARRAY
// -------------------------

const tasks = [];

// -------------------------
// ADD TASK
// -------------------------

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const titleValue = title.value.trim();

  const priorityValue = priority.value;

  // Check title
  if (titleValue === '') {
    status.textContent = 'Task title is required.';

    return;
  }

  // Check priority
  if (priorityValue === '') {
    status.textContent = 'Please select a priority.';

    return;
  }

  // Create task object
  const task = {
    title: titleValue,

    priority: priorityValue,
  };

  // Add task to array
  tasks.push(task);

  // Add task to table
  tableBody.innerHTML += `
    <tr>
      <td>${task.title}</td>
      <td>${task.priority}</td>
    </tr>
  `;

  status.textContent = 'Task added successfully.';

  // Reset form
  form.reset();
});

// -------------------------
// LAZY LOAD EXPORT UTILITY
// -------------------------

exportBtn.addEventListener('click', async function () {
  try {
    status.textContent = 'Loading export utility...';

    // Dynamic import
    const exportModule = await import('./export.js');

    // Call exported function
    exportModule.exportTasks(tasks);

    status.textContent = 'Tasks exported successfully.';
  } catch (error) {
    console.error(error);

    status.textContent = 'Unable to export tasks.';
  }
});
