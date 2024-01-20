let selectedRow = null;
function showAlert(message, className) {
  const div = document.createElement("div");
  div.className = `alert alert-${className}`;

  div.appendChild(document.createTextNode(message));
  const container = document.querySelector(".container");
  const main = document.querySelector(".main");
  container.insertBefore(div, main);

  setTimeout(() => document.querySelector(".alert").remove(), 3000);
}

//Clear

function clearFields() {
  document.querySelector("#firstName").value = "";
  document.querySelector("#lastName").value = "";
  document.querySelector("#telefon").value = "";
  document.querySelector("#emailAddress").value = "";
}

//Add data
document
  .querySelector("#submit")
  .addEventListener("submit", (e) => e.preventDefault());


//Formdata

const firstname = document.querySelector("#firstName").value;
const lastname = document.querySelector("#lastName").value;
const telefon = document.querySelector("#telefon").value;
const emailAddress = document.querySelector("#emailAddress").value;
console.log(firstname);
console.log(lastname);

if (firstname == "" || lastname == "" || telefon == "" || emailAddress == "") {
  showAlert("Please fill in all fields", "danger");
} else {
  if (selectedRow == null) {
    const list = document.querySelector("#book-phone");
    const row = document.createElement("tr");
  
    row.innerHTML = `
    <td>${firstname}</td>
    <td>${lastname}</td>
    <td>${telefon}</td>
    <td>${emailAddress}</td>
    <td>  
    <a href="#" class="btn btn-danger btn-sm delete">Remove</a>
    <a href="#" class="btn btn-warning btn-sm edit">Edit</a> 
    </td>
    `;
    list.appendChild(row);
    selectedRow = null;
    showAlert("Person Added", "success");

  }
}

// Delete
document.querySelector("#book-phone").addEventListener("click", (e) => {
  target = e.target;
  if (target.classList.contains("delete")) {
    target.parentElement.parentElement.remove();
    showAlert("Person Data Deleted", "danger");
  }
});
