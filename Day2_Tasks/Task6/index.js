document
  .querySelector('#submitBtn')
  .addEventListener('click', function (event) {
    event.preventDefault();

    let name = document.querySelector('#name').value;
    let f_name = document.querySelector('#fatherName').value;
    let age = document.querySelector('#age').value;
    let gender = document.querySelector('#gender').value;
    let status = document.querySelector('input[name="status"]:checked').value;

    document.querySelector('#myBody').innerHTML += `
      <tr>
        <td>${name}</td>
        <td>${f_name}</td>
        <td>${age}</td>
        <td>${gender}</td>
        <td>${status}</td>
      </tr>
    `;
  });
