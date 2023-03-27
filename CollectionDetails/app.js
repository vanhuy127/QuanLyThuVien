let container = document.querySelector(".favorite_table_content");
let searchButton = document.querySelector(".favorite_search i");
let searchInput = document.querySelector(".favorite_search input");
const booksApi = "http://localhost:3000/books";
const idAccessBooksApi = "http://localhost:3000/IdAccessBook";
const collectionApi = "http://localhost:3000/collections";

function start() {
  let arrIdOfCollection = [];
  let idAccess = 0;
  getIdAccess(function (id) {
    idAccess = id;
    console.log(idAccess);
  });
  getCollections(function (collections) {
    collections.forEach((item) => {
      if (item.id === idAccess[0].idBook) {
        arrIdOfCollection = item.idSach;
      }
    });
  });
  getBooks(function (books) {
    renderBooks(books, arrIdOfCollection);
    // handleSearch(books);
  });
}
start();
function getIdAccess(callback) {
  fetch(idAccessBooksApi)
    .then(function (res) {
      return res.json();
    })
    .then(callback);
}
function getCollections(callback) {
  fetch(collectionApi)
    .then(function (res) {
      return res.json();
    })
    .then(callback);
}

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
            <i class="fa-solid fa-trash"></i>
        </td>`;
  container.appendChild(newContainer);
}
{
  /* <i class="fa-solid fa-trash" onclick="handleDeleteItem(${item.id}, ${item.maSach})"></i> */
}

function renderBooks(books, arrIdOfCollection) {
  let countId = 1;
  container.innerHTML = "";
  books.forEach((item) => {
    var newContainer = document.createElement("tr");
    newContainer.classList.add("item-" + item.id);
    if (arrIdOfCollection.includes(item.maSach)) {
      renderBooksItem(countId++, item, newContainer);
    }
  });
}

// function handleDeleteItem(id) {
//   let data = {
//     id,
//   };
//   var option = {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   };
//   fetch(`${booksApi}/${id}`, option).then(function (res) {
//     return res.json();
//   });
// }

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
