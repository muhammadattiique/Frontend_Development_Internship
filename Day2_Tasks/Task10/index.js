const loadUsersBtn = document.querySelector('#loadUsersBtn');

const loading = document.querySelector('#loading');
const empty = document.querySelector('#empty');
const error = document.querySelector('#error');
const success = document.querySelector('#success');

const usersTable = document.querySelector('#usersTable');
const usersTableBody = document.querySelector('#usersTableBody');

loadUsersBtn.addEventListener('click', async function () {
  // -------------------------
  // RESET PREVIOUS STATES
  // -------------------------

  loading.hidden = true;
  empty.hidden = true;
  error.hidden = true;
  success.hidden = true;
  usersTable.hidden = true;

  usersTableBody.innerHTML = '';

  // -------------------------
  // LOADING STATE
  // -------------------------

  loading.hidden = false;

  try {
    // -------------------------
    // FETCH USERS
    // -------------------------

    const response = await fetch('https://jsonplaceholder.typicode.com/users');

    // -------------------------
    // CHECK RESPONSE
    // -------------------------

    if (!response.ok) {
      throw new Error('Failed to fetch users.');
    }

    // -------------------------
    // CONVERT RESPONSE TO JSON
    // -------------------------

    const users = await response.json();

    // -------------------------
    // EMPTY STATE
    // -------------------------

    if (users.length === 0) {
      loading.hidden = true;

      empty.hidden = false;

      return;
    }

    // -------------------------
    // ADD USERS TO TABLE
    // -------------------------

    users.forEach(function (user) {
      usersTableBody.innerHTML += `
        <tr>
          <td>${user.id}</td>
          <td>${user.name}</td>
          <td>${user.username}</td>
          <td>${user.email}</td>
        </tr>
      `;
    });

    // -------------------------
    // SUCCESS STATE
    // -------------------------

    loading.hidden = true;

    success.textContent = `${users.length} users loaded successfully.`;

    success.hidden = false;

    usersTable.hidden = false;
  } catch (err) {
    // -------------------------
    // ERROR STATE
    // -------------------------

    loading.hidden = true;

    error.textContent = 'Unable to load users. Please try again.';

    error.hidden = false;

    console.error(err);
  }
});
