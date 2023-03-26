const idAccessBookApi = "http://localhost:3000/IdAccessBook";
const booksApi = "http://localhost:3000/books";

function start() {
  let idBook;
  getIdAccessBook(function (idAccessBook) {
    idBook = idAccessBook;
  });
  getBooks(function (books) {
    handleRenderBooks(idBook[0].idBook, books);
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

function handleRenderBooks(idBook, books) {
  books.forEach((book) => {
    if (book.id === idBook) {
      console.log(book);
    }
  });
}
