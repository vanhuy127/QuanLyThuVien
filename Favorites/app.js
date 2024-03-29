let container = document.querySelector(".favorite_table_content");
let searchButton = document.querySelector(".favorite_search i");
let searchInput = document.querySelector(".favorite_search input");
let booksApi = "http://localhost:3000/books";
const idAccessBooksApi = "http://localhost:3000/IdAccessBook";

function start() {
  getBooks(function (books) {
    renderBooks(books);
    handleSearch(books);
  });
}
start();

function getBooks(callback) {
  fetch(booksApi)
    .then(function (res) {
      return res.json();
    })
    .then(callback);
}

function renderBooksItem(countId, item, newContainer) {
  if (item.tacGia == "") {
    item.tacGia = "-";
  }
  newContainer.innerHTML = `
        <td>${countId}</td>
        <td>${item.maSach}</td>
        <td>${item.ten}</td>
        <td>${item.tacGia}</td>
        <td>
            <i class="fa-solid fa-circle-info" onclick="handleAccessBook(${item.id})"></i>
        </td>
        <td>
            <i class="fa-solid fa-trash" onclick="handleDeleteItem(${item.id})"></i>
        </td>`;
  container.appendChild(newContainer);
}

function renderBooks(books) {
  let countId = 1;
  container.innerHTML = "";
  books.forEach((item) => {
    var newContainer = document.createElement("tr");
    newContainer.classList.add("item-" + item.id);
    if (item.isFalvorite === true) {
      renderBooksItem(countId++, item, newContainer);
    }
  });
}

function handleDeleteItem(id) {
  var option = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  fetch(`${booksApi}/${id}`, option).then(function (res) {
    return res.json();
  });
}

function handleSearch(books) {
  searchButton.addEventListener("click", function (e) {
    let valueInput = searchInput.value.trim().toLowerCase();
    if (valueInput.trim() != "") {
      let countId = 1;

      container.innerHTML = "";
      books.forEach((item) => {
        if (item.ten.toLowerCase().includes(valueInput) && item.isFalvorite) {
          var newContainer = document.createElement("tr");
          newContainer.classList.add("product-" + item.id);
          renderBooksItem(countId++, item, newContainer);
        }
      });
    } else {
      renderBooks(books);
    }
  });
}
function handleAccessBook(idBook) {
  let data = {
    id: 1,
    idBook: idBook,
  };
  var option = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch(`${idAccessBooksApi}/1`, option)
    .then(function (res) {
      return res.json();
    })
    .then(function () {
      window.location = "../infoBook/index.html";
    });
}
