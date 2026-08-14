/* =====================================================
   FORM SUBMIT - ADD
===================================================== */

document.querySelector('#myForm').addEventListener('submit', function (event) {
  // Stop the form from refreshing the page
  event.preventDefault();

  // Get values from the form

  let name = document.querySelector('#name').value;

  let f_name = document.querySelector('#fatherName').value;

  let age = document.querySelector('#age').value;

  let gender = document.querySelector('#gender').value;

  let status = document.querySelector('input[name="status"]:checked').value;

  // Add a new row to the table

  document.querySelector('#myBody').innerHTML += `

      <tr>

        <td>${name}</td>

        <td>${f_name}</td>

        <td>${age}</td>

        <td>${gender}</td>

        <td>${status}</td>

        <td>

          <div class="action-buttons">

            <button
              type="button"
              class="edit-btn"
              data-action="edit"
            >
              Edit
            </button>

            <button
              type="button"
              class="delete-btn"
              data-action="delete"
            >
              Delete
            </button>

            <button
              type="button"
              class="complete-btn"
              data-action="complete"
            >
              Complete
            </button>

          </div>

        </td>

      </tr>

    `;

  // Clear the form

  document.querySelector('#myForm').reset();
});

/* =====================================================
   ONE PARENT EVENT LISTENER
===================================================== */

document.querySelector('#myBody').addEventListener('click', function (event) {
  /*
      Get the data-action value.

      Example:

      data-action="delete"
      gives:

      "delete"
    */

  const action = event.target.dataset.action;

  /*
      Find the table row that contains
      the clicked button.
    */

  const row = event.target.closest('tr');

  /* =================================================
       DELETE ACTION
    ================================================= */

  if (action === 'delete') {
    row.remove();
  }

  /* =================================================
       COMPLETE ACTION
    ================================================= */

  if (action === 'complete') {
    /*
        Add/remove the "completed" class.
      */ document
      .querySelector('#submitBtn')
      .addEventListener('click', function (event) {
        event.preventDefault();

        let name = document.querySelector('#name').value;
        let f_name = document.querySelector('#fatherName').value;
        let age = document.querySelector('#age').value;
        let gender = document.querySelector('#gender').value;

        let status = document.querySelector(
          'input[name="status"]:checked'
        ).value;

        document.querySelector('#myBody').innerHTML += `
      <tr>
        <td>${name}</td>
        <td>${f_name}</td>
        <td>${age}</td>
        <td>${gender}</td>
        <td>${status}</td>

        <td>
          <button class="delete-btn">Delete</button>
        </td>

        <td>
          <button class="update-btn">Update</button>
        </td>
      </tr>
    `;

        // Clear form after adding
        document.querySelector('#myForm').reset();
      });

    // ---------- DELETE ----------

    document
      .querySelector('#myBody')
      .addEventListener('click', function (event) {
        if (event.target.classList.contains('delete-btn')) {
          let row = event.target.closest('tr');

          row.remove();
        }
      });

    // ---------- UPDATE ----------

    document
      .querySelector('#myBody')
      .addEventListener('click', function (event) {
        if (event.target.classList.contains('update-btn')) {
          let row = event.target.closest('tr');

          // Get values from table row
          let name = row.cells[0].textContent;
          let f_name = row.cells[1].textContent;
          let age = row.cells[2].textContent;
          let gender = row.cells[3].textContent;
          let status = row.cells[4].textContent;

          // Put values into form
          document.querySelector('#name').value = name;
          document.querySelector('#fatherName').value = f_name;
          document.querySelector('#age').value = age;
          document.querySelector('#gender').value = gender;

          // Select correct radio button
          document.querySelector(
            `input[name="status"][value="${status}"]`
          ).checked = true;

          // Remove old row
          row.remove();
        }
      });

    row.classList.toggle('completed');

    /*
        Change button text depending
        on whether the row is completed.
      */

    if (row.classList.contains('completed')) {
      event.target.textContent = 'Completed';
    } else {
      event.target.textContent = 'Complete';
    }
  }

  /* =================================================
       EDIT ACTION
    ================================================= */

  if (action === 'edit') {
    /*
        Get the values from the row.
      */

    let name = row.cells[0].textContent;

    let f_name = row.cells[1].textContent;

    let age = row.cells[2].textContent;

    let gender = row.cells[3].textContent;

    let status = row.cells[4].textContent;

    /*
        Put the values into the form.
      */

    document.querySelector('#name').value = name;

    document.querySelector('#fatherName').value = f_name;

    document.querySelector('#age').value = age;

    document.querySelector('#gender').value = gender;

    /*
        Select the correct status radio button.
      */

    document.querySelector(`input[name="status"][value="${status}"]`).checked =
      true;

    /*
        Remove the old row.

        After editing the values in the form,
        clicking Add will create the updated row.
      */

    row.remove();
  }
});
