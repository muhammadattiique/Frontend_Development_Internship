const form = document.querySelector('#taskForm');

const title = document.querySelector('#title');
const priority = document.querySelector('#priority');
const date = document.querySelector('#date');

const titleError = document.querySelector('#titleError');
const priorityError = document.querySelector('#priorityError');
const dateError = document.querySelector('#dateError');

const success = document.querySelector('#success');

const tbody = document.querySelector('#tableBody');
const table = document.querySelector('#table');

const search = document.querySelector('#search');
const filter = document.querySelector('#filter');

const themeBtn = document.querySelector('#themeBtn');

// ==========================================
// LOCAL STORAGE KEYS
// ==========================================

const TASKS_KEY = 'tasks';
const FILTER_KEY = 'selectedFilter';
const SEARCH_KEY = 'searchQuery';
const THEME_KEY = 'theme';

// ==========================================
// TASK ARRAY
// ==========================================

let tasks = [];

// ==========================================
// TODAY'S DATE
// ==========================================

const today = new Date();

const todayString = today.toISOString().split('T')[0];

date.min = todayString;

// ==========================================
// RESTORE TASKS
// ==========================================

const savedTasks = localStorage.getItem(TASKS_KEY);

if (savedTasks) {
  tasks = JSON.parse(savedTasks);
}

// ==========================================
// RESTORE SEARCH
// ==========================================

const savedSearch = localStorage.getItem(SEARCH_KEY);

if (savedSearch !== null) {
  search.value = savedSearch;
}

// ==========================================
// RESTORE FILTER
// ==========================================

const savedFilter = localStorage.getItem(FILTER_KEY);

if (savedFilter !== null) {
  filter.value = savedFilter;
}

// ==========================================
// RESTORE THEME
// ==========================================

const savedTheme = localStorage.getItem(THEME_KEY);

if (savedTheme === 'dark') {
  document.body.classList.add('dark');
}

// ==========================================
// DISPLAY TASKS
// ==========================================

function displayTasks() {
  // Clear old table data
  tbody.innerHTML = '';

  const searchValue = search.value.toLowerCase().trim();

  const filterValue = filter.value;

  // ========================================
  // FILTER TASKS
  // ========================================

  const filteredTasks = tasks.filter(function (task) {
    const matchesSearch = task.title.toLowerCase().includes(searchValue);

    const matchesFilter =
      filterValue === 'all' || task.priority === filterValue;

    return matchesSearch && matchesFilter;
  });

  // ========================================
  // ADD DATA TO TABLE
  // ========================================

  filteredTasks.forEach(function (task) {
    tbody.innerHTML += `
      <tr>
        <td>${task.title}</td>
        <td>${task.priority}</td>
        <td>${task.date}</td>
      </tr>
    `;
  });

  // ========================================
  // SHOW / HIDE TABLE
  // ========================================

  if (filteredTasks.length > 0) {
    table.hidden = false;
  } else {
    table.hidden = true;
  }
}

// ==========================================
// FORM SUBMIT
// ==========================================

form.addEventListener('submit', function (event) {
  // Prevent default form submission
  event.preventDefault();

  // ========================================
  // GET VALUES
  // ========================================

  const titleValue = title.value.trim();

  const priorityValue = priority.value;

  const dateValue = date.value;

  // ========================================
  // RESET PREVIOUS ERRORS
  // ========================================

  titleError.textContent = '';
  titleError.hidden = true;

  title.setAttribute('aria-invalid', 'false');

  priorityError.textContent = '';
  priorityError.hidden = true;

  priority.setAttribute('aria-invalid', 'false');

  dateError.textContent = '';
  dateError.hidden = true;

  date.setAttribute('aria-invalid', 'false');

  success.textContent = '';
  success.hidden = true;

  // Assume form is valid

  let isValid = true;

  // ========================================
  // TITLE VALIDATION
  // ========================================

  if (titleValue === '') {
    titleError.textContent = 'Task title is required.';

    titleError.hidden = false;

    title.setAttribute('aria-invalid', 'true');

    isValid = false;
  }

  // ========================================
  // PRIORITY VALIDATION
  // ========================================

  if (priorityValue === '') {
    priorityError.textContent = 'Please select a priority.';

    priorityError.hidden = false;

    priority.setAttribute('aria-invalid', 'true');

    isValid = false;
  }

  // ========================================
  // DATE VALIDATION
  // ========================================

  if (dateValue === '') {
    dateError.textContent = 'Due date is required.';

    dateError.hidden = false;

    date.setAttribute('aria-invalid', 'true');

    isValid = false;
  } else if (dateValue < todayString) {
    dateError.textContent = 'Due date cannot be in the past.';

    dateError.hidden = false;

    date.setAttribute('aria-invalid', 'true');

    isValid = false;
  }

  // ========================================
  // IF FORM IS INVALID
  // ========================================

  if (!isValid) {
    if (titleValue === '') {
      title.focus();
    } else if (priorityValue === '') {
      priority.focus();
    } else {
      date.focus();
    }

    return;
  }

  // ========================================
  // YOUR LOGIC
  // CREATE NEW TASK
  // ========================================

  const newTask = {
    title: titleValue,
    priority: priorityValue,
    date: dateValue,
  };

  // Add task to array

  tasks.push(newTask);

  // ========================================
  // SAVE TASKS TO LOCAL STORAGE
  // ========================================

  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));

  // ========================================
  // SUCCESS MESSAGE
  // ========================================

  success.textContent = 'Task submitted successfully.';

  success.hidden = false;

  // ========================================
  // YOUR TABLE LOGIC
  // ========================================

  tbody.innerHTML += `
    <tr>
      <td>${titleValue}</td>
      <td>${priorityValue}</td>
      <td>${dateValue}</td>
    </tr>
  `;

  // Show table

  table.hidden = false;

  // ========================================
  // RESET FORM
  // ========================================

  form.reset();

  date.min = todayString;
});

// ==========================================
// SEARCH
// ==========================================

search.addEventListener('input', function () {
  // Save search query

  localStorage.setItem(SEARCH_KEY, search.value);

  // Display filtered tasks

  displayTasks();
});

// ==========================================
// FILTER
// ==========================================

filter.addEventListener('change', function () {
  // Save selected filter

  localStorage.setItem(FILTER_KEY, filter.value);

  // Display filtered tasks

  displayTasks();
});

// ==========================================
// THEME
// ==========================================

themeBtn.addEventListener('click', function () {
  // Toggle dark theme

  document.body.classList.toggle('dark');

  // Check current theme

  const isDark = document.body.classList.contains('dark');

  // Save theme

  localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
});

// ==========================================
// RESTORE DATA ON PAGE LOAD
// ==========================================

displayTasks();
