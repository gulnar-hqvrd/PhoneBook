let selectedRow = null;
function showAlert(message, clasName) {
  const div = document.createElement("div");
  div.className = `alert alert-${clasName}`;

  div.appendChild(document.createTextNode(message));
  const container = document.querySelector(".container");
  const main = document.querySelector(".main");
  container.insertBefore(div,main);

  setTimeout(()=>document.querySelector(".alert").remove(),3000)
}
