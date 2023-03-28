let containerBorrowedBook = document.querySelector(
  ".borrowed_book_table_content"
);
let containerConfirmExtendBook = document.querySelector(
  ".confirm_borrow_book_wrapper"
);

const booksApi = "http://localhost:3000/books";
const borrowedBookInfo = "http://localhost:3000/borrowedBookInformation";

function start() {
  //dume
  let booksArr = [];
  getBooks(function (books) {
    booksArr = books;
  });
  getBorrowedBookInfo(function (infos) {
    renderInfos(infos, booksArr);
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
function getBorrowedBookInfo(callback) {
  fetch(borrowedBookInfo)
    .then(function (res) {
      return res.json();
    })
    .then(callback);
}

function renderInfos(infos, booksArr) {
  let countId = 1;
  containerBorrowedBook.innerHTML = "";
  infos.forEach((item) => {
    var newContainer = document.createElement("tr");
    let bookFind = booksArr.find((book) => book.maSach == item.idSachMuon);
    console.log(bookFind);
    renderInfoItem(countId++, bookFind, item, newContainer);
  });
}
function renderInfoItem(countId, book, borrowInfo, newContainer) {
  newContainer.innerHTML = `
        <td>${countId}</td>
        <td>${book.maSach}</td>
        <td>${book.ten}</td>
        <td>${borrowInfo.ngayMuon}</td>
        <td>${borrowInfo.thoiGianMuon}</td>
        <td>${borrowInfo.ngayTra}</td>
        <td>${borrowInfo.soLuong}</td>
        <td>${borrowInfo.trangThai}</td>
        <td>
            <i class="fa-solid fa-circle-info" onClick="showDisplayExtend('${book.maSach}',
               '${book.ten}',
                '${borrowInfo.ngayMuon}',
                '${borrowInfo.thoiGianMuon}',
                '${borrowInfo.ngayTra}',
                '${borrowInfo.soLuong}',
                '${borrowInfo.trangThai}')"></i>
        </td>      
    `;
  containerBorrowedBook.appendChild(newContainer);
}
function showDisplayExtend(
  maSach,
  ten,
  ngayMuon,
  thoiGianMuon,
  ngayTra,
  soLuong,
  trangThai
) {
  let wrapper = document.querySelector(".confirm_borrow_book_wrapper");
  wrapper.classList.add("show");

  containerConfirmExtendBook.innerHTML = "";
  var newContainer = document.createElement("div");
  newContainer.classList.add("confirm_borrow_book");
  newContainer.innerHTML = `
  <h2 class="confirm_borrow_book_title">Gia hạn mượn sách</h2>
  <div class="info">
    <div class="info_option">
      <p class="title">Mã sách:</p>
      <p class="value">${maSach}</p>
    </div>
    <div class="info_option">
      <p class="title">Tên sách:</p>
      <p class="value">${ten}</p>
    </div>
    <div class="info_option">
      <p class="title">Ngày mượn:</p>
      <p class="value">${ngayMuon}</p>
    </div>
    <div class="info_option">
      <p class="title">Thời gian mượn:</p>
      <p class="value">${thoiGianMuon}</p>
    </div>
    <div class="info_option">
      <p class="title">Ngày trả:</p>
      <p class="value">${ngayTra}</p>
    </div>
    <div class="info_option">
      <label for="day_return_book_label" class="title"
        >Gia hạn đến ngày:
      </label>
      <input type="date" name="" id="extensionDate" />
    </div>
  </div>
  <button class="confirm_btn">Xác nhận mượn sách</button>

  <i class="fa-solid fa-xmark close" onClick="handleCloseDisplay()"></i>
                  `;
  containerConfirmExtendBook.appendChild(newContainer);
}
function handleCloseDisplay() {
  let wrapper = document.querySelector(".confirm_borrow_book_wrapper");
  wrapper.classList.remove("show");
}
