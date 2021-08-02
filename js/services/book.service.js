'use strict';
const KEY = 'booksDB';
const PAGE_SIZE = 3;
var gPageIdx = 0;
var gNextId = 1;

var gBooks;

_createBooks();

function SortBy(val) {
  var sortedBooks = gBooks.sort(function (a, b) {
    if (val === 'name') return a.name > b.name ? 1 : -1;
    else if (val === 'price') return a.price > b.price ? 1 : -1;
  });
  gBooks = sortedBooks;
  saveToStorage('booksDB', gBooks);
}

function rateBook(symbol, book) {
  if (symbol === '+') {
    if (book.rate === 10) return;
    book.rate++;
  } else if (symbol === '-') {
    if (book.rate > 1) {
      book.rate--;
    }
  }
  _saveBooksToStorage();
}

function getNumsPages() {
  var pages = Math.ceil(gBooks.length / PAGE_SIZE);
  var pages;
  return pages;
}

function nextPage(page) {
  if (page === 'next') {
    if (gPageIdx + 1 > gBooks.length / PAGE_SIZE) return;
    gPageIdx++;
  } else if (page === 'prev') {
    if (gPageIdx === 0) return;
    gPageIdx--;
  } else gPageIdx = page;
}

function getVendors() {
  return gVendors;
}

function getBooks() {
  var startIdx = gPageIdx * PAGE_SIZE;
  return gBooks.slice(startIdx, startIdx + PAGE_SIZE);
}

function deleteBook(bookId) {
  var bookIdx = gBooks.findIndex(function (book) {
    return bookId === book.id;
  });
  gBooks.splice(bookIdx, 1);
  _saveBooksToStorage();
}

function addBook(bookName, bookPrice) {
  var book = _createBook(bookName, bookPrice);
  gBooks.unshift(book);
  _saveBooksToStorage();
}

function getBookById(bookId) {
  var book = gBooks.find(function (book) {
    return bookId === book.id;
  });
  return book;
}

function updateBook(bookId, newPrice) {
  var book = gBooks.find(function (book) {
    return book.id === bookId;
  });
  book.price = newPrice;
  _saveBooksToStorage();
}

function _createBook(
  name = makeLorem(2),
  price = getRandomIntInclusive(1, 30)
) {
  return {
    id: gNextId++,
    name,
    price,
    imgUrl: `img/${getRandomIntInclusive(1, 3)}.png`,
    rate: getRandomIntInclusive(1, 10),
    shortcutStory: makeLorem(20),
  };
}

function _createBooks() {
  var books = loadFromStorage(KEY);
  if (!books || !books.length) {
    books = [];
    for (let i = 0; i < 7; i++) {
      books.push(_createBook());
    }
  }
  gBooks = books;
  _saveBooksToStorage();
}

function _saveBooksToStorage() {
  saveToStorage(KEY, gBooks);
}

function _addBookImg() {}
