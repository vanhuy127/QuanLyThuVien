let containerBookInfo = document.querySelector(".right");
let containerCollection = document.querySelector(".list_collection");
let containerConfirmBorrowBook = document.querySelector(".confirm_borrow_book");

const idAccessBookApi = "http://localhost:3000/IdAccessBook";
const booksApi = "http://localhost:3000/books";
const collectionApi = "http://localhost:3000/collections";
const studentInfoApi = "http://localhost:3000/studentInformation";

function start() {
  let idBook;
  let studentInfo;
  getIdAccessBook(function (idAccessBook) {
    idBook = idAccessBook;
  });
  getStudentInfo(function (info) {
    studentInfo = info[0];
  });
  getBooks(function (books) {
    handleRenderBooks(idBook[0].idBook, books, studentInfo);
  });
  getCollections(function (collections) {
    renderCollection(collections);
  });
}

start();

function getIdAccessBook(callback) {
  fetch(idAccessBookApi)
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

function getStudentInfo(callback) {
  fetch(studentInfoApi)
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

function handleRenderBooks(idBook, books, infoStudent) {
  books.forEach((book) => {
    if (book.id === idBook) {
      renderBookInfo(book);
      renderConfirmBorrowBook(book, infoStudent);
    }
  });
}

function renderBookInfo(book) {
  containerBookInfo.innerHTML = "";
  var newContainer = document.createElement("div");
  newContainer.innerHTML = `
  <div class="name_books">${book.ten}</div>
  <div class="id_book info_option">
    <p class="title">Mã sách:</p>
    <p class="value">${book.maSach}</p>
  </div>
  <div class="author info_option">
    <p class="title">Tác giả:</p>
    <p class="value">${book.tacGia}</p>
  </div>
  <div class="publishing_company info_option">
    <p class="title">Nhà xuất bản:</p>
    <p class="value">${book.NXB}</p>
  </div>
  <div class="subject info_option">
    <p class="title">Chủ đề:</p>
    <p class="value">Giáo trình</p>
  </div>
  <div class="position info_option">
    <p class="title">Vị trí lưu trữ:</p>
    <p class="value">${book.viTri}</p>
  </div>
  <p class="content">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
    sed do eiusmod tempor incididunt ut labore et dolore magna
    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
    ullamco laboris nisi ut aliquip ex ea commodo consequat.
  </p>
  <div class="quantity info_option">
    <p class="title">Số lượng:</p>
    <p class="value">${book.soLuong}</p>
  </div>
  <div class="quantity_borrowed info_option">
    <p class="title">Đã mượn:</p>
    <p class="value">${book.daMuon}</p>
  </div>
  <div class="number_of_book_borrowed">
    <span class="minus" onClick="handleDecrease()">-</span>
    <div class="value_number"  >1</div>
    <span class="add" onClick="handleIncrease()">+</span>
  </div>
  <div class="options">
    <button onClick="showDisplayConfirm(${book.soLuong}, ${book.daMuon})">Mượn sách</button>
    <i class="heart fa-solid fa-heart"></i>
  </div>
                  `;
  containerBookInfo.appendChild(newContainer);
}

function renderCollection(collections) {
  containerCollection.innerHTML = "";
  collections.forEach((item) => {
    var newContainer = document.createElement("div");
    newContainer.innerHTML = `
      <div class="list_item">
        <input type="radio" name="collection" value=${item.ten} />
        <span class="collection">${item.ten}</span>
      </div>
        `;
    containerCollection.appendChild(newContainer);
  });
}

function handleDecrease() {
  let numberOfBookBorrowed = document.querySelector(
    ".number_of_book_borrowed .value_number"
  );

  let num = parseInt(numberOfBookBorrowed.innerHTML);

  if (num > 1) {
    num--;
    numberOfBookBorrowed.innerHTML = num.toString();
  }
}

function handleIncrease() {
  let numberOfBookBorrowed = document.querySelector(
    ".number_of_book_borrowed .value_number"
  );

  let num = parseInt(numberOfBookBorrowed.innerHTML);

  if (num < 5) {
    num++;
    numberOfBookBorrowed.innerHTML = num.toString();
  }
}
function renderConfirmBorrowBook(book, infoStudent) {
  //render giao diện
  containerConfirmBorrowBook.innerHTML = "";
  var newContainer = document.createElement("div");
  newContainer.innerHTML = `
          <h2 class="confirm_borrow_book_title">
            Xác nhận thông tin mượn sách
          </h2>
          <div class="info">
            <div class="borrow_book_info">
              <div class="info_option">
                <p class="title">Mã sách:</p>
                <p class="value">${book.maSach}</p>
              </div>
              <div class="info_option">
                <p class="title">Tên sách:</p>
                <p class="value">${book.ten}</p>
              </div>
              <div class="info_option">
                <p class="title">Tác giả:</p>
                <p class="value">${book.tacGia}</p>
              </div>
              <div class="info_option">
                <p class="title">Nhà xuất bản:</p>
                <p class="value">${book.NXB}</p>
              </div>
              <div class="info_option">
                <p class="title">Vị trí:</p>
                <p class="value">${book.viTri}</p>
              </div>
            </div>
            <div class="student_info">
              <div class="info_option">
                <p class="title">Mã SV:</p>
                <p class="value">${infoStudent.maSV}</p>
              </div>
              <div class="info_option">
                <p class="title">Tên:</p>
                <p class="value">${infoStudent.hoTen}</p>
              </div>
              <div class="info_option">
                <p class="title">Ngày sinh:</p>
                <p class="value">${infoStudent.ngaySinh}</p>
              </div>
              <div class="info_option">
                <p class="title">Lớp:</p>
                <p class="value">${infoStudent.lop}</p>
              </div>
            </div>
          </div>
          <div class="day_return_book">
            <label for="day_return_book_label">Ngày trả sách: </label>
            <input type="date" name="" id="day_return_book_label" />
          </div>
          <button class="confirm_btn">Xác nhận mượn sách</button>
          <p class="note">
            *Chú ý: nếu sau 7 ngày sách vẫn chưa được nhận thì yêu cầu mượn sách
            sẽ tự động hủy
          </p>
          <i class="fa-solid fa-xmark close" onClick="hideDisplayConfirm()"></i>  
                  `;
  containerConfirmBorrowBook.appendChild(newContainer);
}

function showDisplayConfirm(soLuong, daMuon) {
  let numberOfBookBorrowed = document.querySelector(
    ".number_of_book_borrowed .value_number"
  ).innerHTML;
  console.log(soLuong, daMuon, parseInt(numberOfBookBorrowed));
  if (soLuong - daMuon < parseInt(numberOfBookBorrowed)) {
    alert("số lượng sách cần mượn lớn hơn số lượng sách hiện đang có");
  } else {
    let confirmBorrowBook = document.querySelector(
      ".confirm_borrow_book_wrapper"
    );
    confirmBorrowBook.classList.add("show");
  }
}

function hideDisplayConfirm() {
  let confirmBorrowBook = document.querySelector(
    ".confirm_borrow_book_wrapper"
  );
  confirmBorrowBook.classList.remove("show");
}
