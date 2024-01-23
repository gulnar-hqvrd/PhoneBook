let selectedRow = null;
function showAlert(message, className) {
  const div = document.createElement("div");
  div.className = `alert alert-${className}`;

  div.appendChild(document.createTextNode(message));
  const container = document.querySelector(".container");
  const main = document.querySelector(".main");
  container.insertBefore(div, main);

  setTimeout(() => document.querySelector(".alert").remove(), 2000);
}

//Clear

function clearFields() {
  document.querySelector("#firstName").value = "";
  document.querySelector("#lastName").value = "";
  document.querySelector("#telefon").value = "";
  document.querySelector("#emailAddress").value = "";
}

//Add data
document.querySelector("#phone-book").addEventListener("submit", (e) => {
  e.preventDefault();
  const user = {};
  const users = JSON.parse(localStorage.getItem("users") ?? "[]");
  //Formdata

  const firstname = document.querySelector("#firstName").value;
  const lastname = document.querySelector("#lastName").value;
  const telefon = document.querySelector("#telefon").value;
  const emailAddress = document.querySelector("#emailAddress").value;
  console.log(firstname);
  console.log(lastname);

  if (
    firstname == "" ||
    lastname == "" ||
    telefon == "" ||
    emailAddress == ""
  ) {
    showAlert("Please fill in all fields", "danger");
  } else {
    user.firstname = firstname;
    user.lastname = lastname;
    user.telefon = telefon;
    user.emailAddress = emailAddress;

    if (selectedRow == null) {
      const list = document.querySelector("#book-phone");
      const row = document.createElement("tr");
      row.setAttribute("data-id", users.length);

      row.innerHTML = `
    <td>${firstname}</td>
    <td>${lastname}</td>
    <td>${telefon}</td>
    <td>${emailAddress}</td>
    <td>  
    <a href="#" class="btn btn-danger btn-sm delete">Remove</a>
    <a href="#" class="btn btn-warning btn-sm edit">Edit</a> 
 
    `;
      list.appendChild(row);
      selectedRow = null;
      showAlert("Person Added", "success");
    } else {
      selectedRow.children[0].textContent = firstname;
      selectedRow.children[1].textContent = lastname;
      selectedRow.children[2].textContent = telefon;
      selectedRow.children[3].textContent = emailAddress;
      selectedRow = null;
      showAlert("Person information Edit", "info");
    }

    clearFields();
  }

  users.push(user);

  localStorage.setItem("users", JSON.stringify(users));
});

//Edit data
document.querySelector("#book-phone").addEventListener("click", (e) => {
  target = e.target;
  if (target.classList.contains("edit")) {
    selectedRow = target.parentElement.parentElement;
    document.querySelector("#firstName").value =
      selectedRow.children[0].textContent;
    document.querySelector("#lastName").value =
      selectedRow.children[1].textContent;
    document.querySelector("#telefon").value =
      selectedRow.children[2].textContent;
    document.querySelector("#emailAddress").value =
      selectedRow.children[3].textContent;
  }
});

// Delete
document.querySelector("#book-phone").addEventListener("click", (e) => {
  target = e.target;
  if (target.classList.contains("delete")) {
    const id = target.parentElement.parentElement.getAttribute("data-id")
    target.parentElement.parentElement.remove();
    const users = JSON.parse(localStorage.getItem("users") ?? "[]")
    users.splice(id, 1)
    localStorage.setItem("users", JSON.stringify(users))
    showAlert("Person Data Deleted", "danger");
  }
});

const users = JSON.parse(localStorage.getItem("users") ?? "[]");

for (let i = 0; i < users.length; i++) {
  const user = users[i];
  const list = document.querySelector("#book-phone");
  const row = document.createElement("tr");
  row.setAttribute("data-id", i);
  row.innerHTML = `
<td>${user.firstname}</td>
<td>${user.lastname}</td>
<td>${user.telefon}</td>
<td>${user.emailAddress}</td>
<td>  
<a href="#" class="btn btn-danger btn-sm delete">Remove</a>
<a href="#" class="btn btn-warning btn-sm edit">Edit</a> 

`;
  list.appendChild(row);
}
