let container = document.querySelector(".featured_book_box");
let searchInput = document.querySelector(".search input");
let searchButton = document.querySelector(".search i");

const booksAPI = "http://localhost:3000/books";
const idAccessBooksApi = "http://localhost:3000/IdAccessBook";

function start() {
  getBooks(function (books) {
    renderBooks(books);
    handleSearch(books);
  });
}

start();

function getBooks(callback) {
  fetch(booksAPI)
    .then(function (res) {
      return res.json();
    })
    .then(callback);
}

function renderBooksItem(item, newContainer) {
  if (item.tacGia == "") {
    item.tacGia = "-";
  }
  newContainer.innerHTML = `
        <div class="featured_book_card">
            <div class="featurde_book_img">
                <img src=${item.urlImage} />
            </div>

            <div class="featurde_book_tag">
                <h2>${item.ten}</h2>
                <p class="writer">${item.tacGia}</p>
                <p class="publishing_company">${item.NXB}</p>
                <div class="featured_book_footer">
                    <div class="f_btn" onclick="handleAccessBook(${item.id})">Chi tiết</div>
                </div>
            </div>
            <i class="heart fa-solid fa-heart" onclick="handleFavorite(this, ${item.id}, '${item.maSach}', '${item.ten}',  '${item.urlImage}', '${item.NXB}', '${item.tacGia}', '${item.viTri}', ${item.soLuong}, ${item.daMuon}, ${item.isFalvorite})"></i>
        </div>
        `;
  container.appendChild(newContainer);
}
{
  /* <i class="heart fa-solid fa-heart" onclick="handleFavorite(this, ${item.id}, '${item.maSach}', '${item.ten}',  '${item.urlImage}', '${item.NXB}', '${item.tacGia}', '${item.viTri}', ${item.soLuong}, ${item.isFalvorite})"></i> */
}

function renderBooks(books) {
  container.innerHTML = "";
  books.forEach((item) => {
    var newContainer = document.createElement("div");
    newContainer.classList.add("product-" + item.id);
    renderBooksItem(item, newContainer);
    if (item.isFalvorite) {
      newContainer.querySelector("i").classList.add("favorite_active");
    }
  });
}

function handleSearch(books) {
  searchButton.addEventListener("click", function (e) {
    let valueInput = searchInput.value.trim().toLowerCase();
    if (valueInput.trim() != "") {
      container.innerHTML = "";
      books.forEach((item) => {
        if (item.ten.toLowerCase().includes(valueInput)) {
          var newContainer = document.createElement("div");
          newContainer.classList.add("product-" + item.id);
          renderBooksItem(item, newContainer);
        }
      });
    } else {
      renderBooks(books);
    }
  });
}

function handleFavorite(
  btn,
  id,
  maSach,
  ten,
  urlImage,
  NXB,
  tacGia,
  viTri,
  soLuong,
  daMuon,
  isFalvorite
) {
  btn.classList.toggle("favorite_active");
  let data = {
    id,
    maSach,
    ten,
    urlImage,
    NXB,
    tacGia,
    viTri,
    soLuong,
    daMuon,
    isFalvorite: !isFalvorite,
  };
  putBook(id, data);
}

function putBook(id, data) {
  var option = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch(`${booksAPI}/${id}`, option).then(function (res) {
    return res.json();
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
