// =========================
// GET FORM ELEMENTS
// =========================

const form = document.querySelector('#taskForm');

const title = document.querySelector('#title');

const priority = document.querySelector('#priority');

const date = document.querySelector('#date');

// =========================
// GET ERROR ELEMENTS
// =========================

const titleError = document.querySelector('#titleError');

const priorityError = document.querySelector('#priorityError');

const dateError = document.querySelector('#dateError');

// =========================
// GET SUCCESS & TABLE
// =========================

const success = document.querySelector('#success');

const tbody = document.querySelector('#tableBody');

const table = document.querySelector('#table');

// =========================
// SET MINIMUM DATE
// =========================

// Get today's date

const today = new Date();

// Convert today's date to YYYY-MM-DD

const todayString = today.toISOString().split('T')[0];

// Prevent selecting dates before today

date.min = todayString;

// =========================
// FORM SUBMIT EVENT
// =========================

form.addEventListener('submit', function (event) {
  // Prevent browser's default form submission

  event.preventDefault();

  // =========================
  // GET VALUES
  // =========================

  const titleValue = title.value.trim();

  const priorityValue = priority.value;

  const dateValue = date.value;

  // =========================
  // RESET PREVIOUS ERRORS
  // =========================

  titleError.textContent = '';

  titleError.hidden = true;

  title.setAttribute('aria-invalid', 'false');

  priorityError.textContent = '';

  priorityError.hidden = true;

  priority.setAttribute('aria-invalid', 'false');

  dateError.textContent = '';

  dateError.hidden = true;

  date.setAttribute('aria-invalid', 'false');

  // Hide previous success message

  success.textContent = '';

  success.hidden = true;

  // =========================
  // FORM VALIDATION STATUS
  // =========================

  let isValid = true;

  // =========================
  // TITLE VALIDATION
  // =========================

  if (titleValue === '') {
    titleError.textContent = 'Task title is required.';

    titleError.hidden = false;

    title.setAttribute('aria-invalid', 'true');

    isValid = false;
  }

  // =========================
  // PRIORITY VALIDATION
  // =========================

  if (priorityValue === '') {
    priorityError.textContent = 'Please select a priority.';

    priorityError.hidden = false;

    priority.setAttribute('aria-invalid', 'true');

    isValid = false;
  }

  // =========================
  // DATE VALIDATION
  // =========================

  if (dateValue === '') {
    dateError.textContent = 'Due date is required.';

    dateError.hidden = false;

    date.setAttribute('aria-invalid', 'true');

    isValid = false;
  } else {
    // Check if selected date is before today

    if (dateValue < todayString) {
      dateError.textContent = 'Due date cannot be in the past.';

      dateError.hidden = false;

      date.setAttribute('aria-invalid', 'true');

      isValid = false;
    }
  }

  // =========================
  // STOP IF FORM IS INVALID
  // =========================

  if (!isValid) {
    // Focus first invalid field

    if (titleValue === '') {
      title.focus();
    } else if (priorityValue === '') {
      priority.focus();
    } else if (dateValue === '' || dateValue < todayString) {
      date.focus();
    }

    return;
  }

  // =========================
  // FORM IS VALID
  // =========================

  success.textContent = 'Task submitted successfully.';

  success.hidden = false;

  // =========================
  // ADD DATA TO TABLE
  // =========================

  tbody.innerHTML += `
    <tr>
      <td>${titleValue}</td>
      <td>${priorityValue}</td>
      <td>${dateValue}</td>
    </tr>
  `;

  // =========================
  // SHOW TABLE
  // =========================

  table.hidden = false;

  // =========================
  // RESET FORM
  // =========================

  form.reset();
});
