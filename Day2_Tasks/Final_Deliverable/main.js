'use strict';

/* =====================================================
   CONFIGURATION
===================================================== */

const STORAGE_KEY = 'taskforge.tasks.v1';

const API_URL = 'https://jsonplaceholder.typicode.com';

/* =====================================================
   APPLICATION STATE
===================================================== */

let tasks = [];

let editingTaskId = null;

/* =====================================================
   DOM HELPER
===================================================== */

const $ = (selector) => document.querySelector(selector);

/* =====================================================
   DOM ELEMENTS
===================================================== */

const taskList = $('#taskList');

const searchInput = $('#searchInput');

const statusFilter = $('#statusFilter');

const priorityFilter = $('#priorityFilter');

const sortSelect = $('#sortSelect');

const totalTasks = $('#totalTasks');

const openTasks = $('#openTasks');

const completedTasks = $('#completedTasks');

const completionRate = $('#completionRate');

const taskModal = $('#taskModal');

const modalTitle = $('#modalTitle');

const taskForm = $('#taskForm');

const taskTitle = $('#taskTitle');

const taskDescription = $('#taskDescription');

const taskPriority = $('#taskPriority');

const taskDueDate = $('#taskDueDate');

const taskTags = $('#taskTags');

const apiResult = $('#apiResult');

/* =====================================================
   LOAD TASKS FROM LOCAL STORAGE
===================================================== */

function loadTasks() {
  try {
    const storedTasks = localStorage.getItem(STORAGE_KEY);

    if (!storedTasks) {
      tasks = [];

      return;
    }

    const parsedTasks = JSON.parse(storedTasks);

    tasks = Array.isArray(parsedTasks) ? parsedTasks : [];
  } catch (error) {
    console.error('Could not load tasks:', error);

    tasks = [];
  }
}

/* =====================================================
   SAVE TASKS
===================================================== */

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

/* =====================================================
   GENERATE UNIQUE ID
===================================================== */

function generateId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

/* =====================================================
   ESCAPE HTML
===================================================== */

function escapeHTML(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

/* =====================================================
   FORMAT DATE
===================================================== */

function formatDate(date) {
  if (!date) {
    return 'No due date';
  }

  return new Date(`${date}T00:00:00`).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/* =====================================================
   DATE OFFSET
===================================================== */

function getDateOffset(days) {
  const date = new Date();

  date.setDate(date.getDate() + days);

  return date.toISOString().slice(0, 10);
}

/* =====================================================
   PRIORITY RANK
===================================================== */

function getPriorityRank(priority) {
  const ranks = {
    high: 3,

    medium: 2,

    low: 1,
  };

  return ranks[priority] || 0;
}

/* =====================================================
   UPDATE DASHBOARD
===================================================== */

function updateStatistics() {
  const total = tasks.length;

  const completed = tasks.filter((task) => task.completed).length;

  const open = total - completed;

  const rate = total === 0 ? 0 : Math.round((completed / total) * 100);

  totalTasks.textContent = total;

  openTasks.textContent = open;

  completedTasks.textContent = completed;

  completionRate.textContent = `${rate}%`;
}

/* =====================================================
   FILTER TASKS
===================================================== */

function getFilteredTasks() {
  const search = searchInput.value.trim().toLowerCase();

  const status = statusFilter.value;

  const priority = priorityFilter.value;

  const sort = sortSelect.value;

  let filtered = tasks.filter((task) => {
    const searchableText = [task.title, task.description, ...(task.tags || [])]
      .join(' ')
      .toLowerCase();

    const matchesSearch = !search || searchableText.includes(search);

    let matchesStatus = true;

    if (status === 'open') {
      matchesStatus = !task.completed;
    }

    if (status === 'completed') {
      matchesStatus = task.completed;
    }

    const matchesPriority = priority === 'all' || task.priority === priority;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  /* SORT */

  filtered.sort((a, b) => {
    switch (sort) {
      case 'title':
        return a.title.localeCompare(b.title);

      case 'priority':
        return getPriorityRank(b.priority) - getPriorityRank(a.priority);

      case 'due': {
        const dateA = a.dueDate || '9999-12-31';

        const dateB = b.dueDate || '9999-12-31';

        return dateA.localeCompare(dateB);
      }

      case 'updated':

      default:
        return (b.updatedAt || 0) - (a.updatedAt || 0);
    }
  });

  return filtered;
}

/* =====================================================
   RENDER TASK LIST
===================================================== */

function renderTasks() {
  const filteredTasks = getFilteredTasks();

  if (filteredTasks.length === 0) {
    taskList.innerHTML = `
      <div class="empty">

        <h3>
          No tasks found
        </h3>

        <p>
          Try changing your filters
          or create a new task.
        </p>

      </div>
    `;

    return;
  }

  taskList.innerHTML = filteredTasks
    .map((task) => {
      const tagsHTML = (task.tags || [])
        .map((tag) => {
          return `
                <span class="tag">
                  #${escapeHTML(tag)}
                </span>
              `;
        })
        .join('');

      const dueHTML = task.dueDate
        ? `
              <span class="tag">
                Due
                ${escapeHTML(formatDate(task.dueDate))}
              </span>
            `
        : '';

      return `
          <article
            class="task ${task.completed ? 'completed' : ''}"
          >

            <input
              type="checkbox"
              class="task-checkbox"

              ${task.completed ? 'checked' : ''}

              data-action="toggle"

              data-id="${task.id}"

              aria-label="Mark task complete"
            />


            <div>

              <div class="task-title">
                ${escapeHTML(task.title)}
              </div>


              ${
                task.description
                  ? `
                    <div class="task-description">
                      ${escapeHTML(task.description)}
                    </div>
                  `
                  : ''
              }


              <div class="meta">

                <span
                  class="
                    tag
                    priority-${escapeHTML(task.priority)}
                  "
                >
                  ${escapeHTML(task.priority)}
                </span>


                ${dueHTML}


                ${tagsHTML}

              </div>

            </div>


            <div class="task-actions">

              <button
                type="button"
                class="icon-btn"

                data-action="edit"

                data-id="${task.id}"

                title="Edit task"
              >
                ✎
              </button>


              <button
                type="button"
                class="icon-btn"

                data-action="delete"

                data-id="${task.id}"

                title="Delete task"
              >
                ×
              </button>

            </div>

          </article>
        `;
    })
    .join('');
}

/* =====================================================
   RENDER APP
===================================================== */

function render() {
  updateStatistics();

  renderTasks();
}

/* =====================================================
   OPEN TASK MODAL
===================================================== */

function openTaskModal(taskId = null) {
  editingTaskId = taskId;

  const task = taskId ? tasks.find((item) => item.id === taskId) : null;

  if (task) {
    modalTitle.textContent = 'Edit Task';

    taskTitle.value = task.title;

    taskDescription.value = task.description || '';

    taskPriority.value = task.priority || 'medium';

    taskDueDate.value = task.dueDate || '';

    taskTags.value = (task.tags || []).join(', ');
  } else {
    modalTitle.textContent = 'New Task';

    taskForm.reset();

    taskPriority.value = 'medium';
  }

  taskModal.classList.add('show');

  setTimeout(() => taskTitle.focus(), 50);
}

/* =====================================================
   CLOSE TASK MODAL
===================================================== */

function closeTaskModal() {
  taskModal.classList.remove('show');

  editingTaskId = null;

  taskForm.reset();

  taskPriority.value = 'medium';
}

/* =====================================================
   CREATE / UPDATE TASK
===================================================== */

taskForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const title = taskTitle.value.trim();

  const description = taskDescription.value.trim();

  const priority = taskPriority.value;

  const dueDate = taskDueDate.value;

  const tags = taskTags.value
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);

  if (!title) {
    alert('Please enter a task title.');

    return;
  }

  const now = Date.now();

  /* =========================
       UPDATE EXISTING TASK
    ========================= */

  if (editingTaskId) {
    const task = tasks.find((item) => item.id === editingTaskId);

    if (task) {
      task.title = title;

      task.description = description;

      task.priority = priority;

      task.dueDate = dueDate;

      task.tags = tags;

      task.updatedAt = now;
    }
  }

  /* =========================
       CREATE NEW TASK
    ========================= */
  else {
    const newTask = {
      id: generateId(),

      title,

      description,

      priority,

      dueDate,

      tags,

      completed: false,

      createdAt: now,

      updatedAt: now,
    };

    tasks.unshift(newTask);
  }

  saveTasks();

  closeTaskModal();

  render();
});

/* =====================================================
   TASK BUTTON ACTIONS
===================================================== */

taskList.addEventListener('click', function (event) {
  const button = event.target.closest('[data-action]');

  if (!button) {
    return;
  }

  const action = button.dataset.action;

  const id = button.dataset.id;

  const task = tasks.find((item) => item.id === id);

  if (!task) {
    return;
  }

  /* EDIT */

  if (action === 'edit') {
    openTaskModal(id);

    return;
  }

  /* DELETE */

  if (action === 'delete') {
    const confirmed = confirm(`Delete "${task.title}"?`);

    if (!confirmed) {
      return;
    }

    tasks = tasks.filter((item) => item.id !== id);

    saveTasks();

    render();
  }
});

/* =====================================================
   COMPLETE TASK
===================================================== */

taskList.addEventListener('change', function (event) {
  const checkbox = event.target.closest('[data-action="toggle"]');

  if (!checkbox) {
    return;
  }

  const task = tasks.find((item) => item.id === checkbox.dataset.id);

  if (!task) {
    return;
  }

  task.completed = checkbox.checked;

  task.updatedAt = Date.now();

  saveTasks();

  render();
});

/* =====================================================
   SEARCH / FILTER EVENTS
===================================================== */

searchInput.addEventListener('input', renderTasks);

statusFilter.addEventListener('change', renderTasks);

priorityFilter.addEventListener('change', renderTasks);

sortSelect.addEventListener('change', renderTasks);

/* =====================================================
   MODAL EVENTS
===================================================== */

$('#addTaskBtn').addEventListener('click', () => openTaskModal());

$('#cancelBtn').addEventListener('click', closeTaskModal);

$('#closeModalBtn').addEventListener('click', closeTaskModal);

taskModal.addEventListener('click', function (event) {
  if (event.target === taskModal) {
    closeTaskModal();
  }
});

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape' && taskModal.classList.contains('show')) {
    closeTaskModal();
  }
});

/* =====================================================
   DEMO DATA
===================================================== */

function generateDemoTasks() {
  const now = Date.now();

  return [
    {
      id: generateId(),

      title: 'Build dashboard filters',

      description: 'Implement search, status and priority filters.',

      priority: 'high',

      dueDate: getDateOffset(2),

      tags: ['frontend', 'release'],

      completed: false,

      createdAt: now - 900000,

      updatedAt: now - 1000,
    },

    {
      id: generateId(),

      title: 'Review API integration',

      description: 'Test API requests, error states and response mapping.',

      priority: 'medium',

      dueDate: getDateOffset(5),

      tags: ['api', 'backend'],

      completed: false,

      createdAt: now - 700000,

      updatedAt: now - 3000,
    },

    {
      id: generateId(),

      title: 'Write documentation',

      description: 'Document setup instructions and localStorage behavior.',

      priority: 'low',

      dueDate: getDateOffset(-1),

      tags: ['documentation'],

      completed: true,

      createdAt: now - 600000,

      updatedAt: now - 5000,
    },
  ];
}

/* =====================================================
   DEMO BUTTON
===================================================== */

$('#demoBtn').addEventListener('click', function () {
  const confirmed = confirm('Replace current tasks with demo data?');

  if (!confirmed) {
    return;
  }

  tasks = generateDemoTasks();

  saveTasks();

  render();
});

/* =====================================================
   API REQUEST FUNCTION
===================================================== */

async function apiRequest(endpoint, options = {}) {
  apiResult.textContent = 'Loading...';

  try {
    const response = await fetch(API_URL + endpoint, {
      ...options,

      headers: {
        'Content-Type': 'application/json',

        ...(options.headers || {}),
      },
    });

    const text = await response.text();

    let data;

    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    apiResult.textContent = JSON.stringify(data, null, 2);

    return data;
  } catch (error) {
    apiResult.textContent = `API Error:\n\n${error.message}`;

    return null;
  }
}

/* =====================================================
   GET /TODOS
===================================================== */

$('#getApiBtn').addEventListener('click', async function () {
  const data = await apiRequest('/todos?_limit=8');

  if (!Array.isArray(data)) {
    return;
  }

  /*
      Import API tasks into localStorage.
    */

  data.forEach((remoteTask) => {
    const alreadyImported = tasks.some((task) => task.apiId === remoteTask.id);

    if (alreadyImported) {
      return;
    }

    const now = Date.now();

    let priority;

    if (remoteTask.id % 3 === 0) {
      priority = 'high';
    } else if (remoteTask.id % 3 === 1) {
      priority = 'medium';
    } else {
      priority = 'low';
    }

    tasks.push({
      id: generateId(),

      apiId: remoteTask.id,

      title: remoteTask.title,

      description: 'Imported from JSONPlaceholder API.',

      priority,

      dueDate: '',

      tags: ['api', 'imported'],

      completed: remoteTask.completed,

      createdAt: now,

      updatedAt: now,
    });
  });

  saveTasks();

  render();
});

/* =====================================================
   POST /TODOS
===================================================== */

$('#postApiBtn').addEventListener('click', async function () {
  const title = prompt('Enter the task title:', 'New API Task');

  if (!title) {
    return;
  }

  await apiRequest('/todos', {
    method: 'POST',

    body: JSON.stringify({
      title,

      completed: false,

      userId: 1,
    }),
  });
});

/* =====================================================
   INITIALIZE APPLICATION
===================================================== */

function initialize() {
  loadTasks();

  render();
}

/* =====================================================
   START
===================================================== */

initialize();
