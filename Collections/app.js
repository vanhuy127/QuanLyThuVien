let container = document.querySelector(".collection_content");
let collectionAddButton = document.querySelector(
  ".collection_add_input button"
);
let CollectionInput = document.querySelector(".collection_add_input input");

const collectionsAPI = "http://localhost:3000/collections";
const idAccessBooksApi = "http://localhost:3000/IdAccessBook";

function start() {
  getCollections(function (collections) {
    renderCollections(collections);
  });
}

start();

function getCollections(callback) {
  fetch(collectionsAPI)
    .then(function (res) {
      return res.json();
    })
    .then(callback);
}

function createCollection(data) {
  var option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data),
  };
  fetch(collectionsAPI, option).then(function (response) {
    response.json();
  });
}
function deleteCollection(id) {
  var option = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  fetch(`${collectionsAPI}/${id}`, option).then(function (res) {
    return res.json();
  });
}
function renderCollectionItem(item, newContainer) {
  newContainer.innerHTML = `
        <div class="collection_card">
            <div class="collection_name">
                ${item.ten}
            </div>
            <div class="f_btn" onclick="handleAccessBook(${item.id})">Chi tiết</div>
            <i class="fa-solid fa-xmark close" onclick="deleteCollection(${item.id})"></i>
        </div>
          `;
  container.appendChild(newContainer);
}

function renderCollections(collections) {
  container.innerHTML = "";
  collections.forEach((item) => {
    var newContainer = document.createElement("div");
    newContainer.classList.add("item-" + item.id);
    renderCollectionItem(item, newContainer);
  });
}
function capitalizeFirstLetter(str) {
  str = str.trim().toLowerCase();
  let firstChar = str.charAt(0);
  let restOfString = str.slice(1);
  return firstChar.toUpperCase() + restOfString;
}
function handleCreateCollection() {
  collectionAddButton.addEventListener("click", function () {
    console.log(capitalizeFirstLetter(CollectionInput.value));
    let data = {
      ten: capitalizeFirstLetter(CollectionInput.value),
      idSach: [],
    };
    createCollection(data);
  });
}
handleCreateCollection();

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
      window.location = "../CollectionDetails/index.html";
    });
}
