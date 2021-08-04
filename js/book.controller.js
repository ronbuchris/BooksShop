'use strict';

function onInit() {
  renderBooks();
}

function renderBooks() {
  var books = getBooks();
  var strHtmls = books.map(function (book) {
    return `<tr><td>${book.id}</td>
      <td>${book.name}</td>
      <td class="book-price-${book.id}">$${book.price}  <span hidden><input name="updatePrice${book.id}" type="text" placeholder="price" /><button onclick="update(${book.id})">update</button></span></td>
      <td> <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" data-trans="read" onclick="onReadBook(${book.id})">Read</button>
      <button type="button" data-trans="update" class="btn btn-warning" onclick="onUpdateBook(${book.id})">Update</button>
      <button type="button" class="btn btn-danger" data-trans="delete" onclick="onDeleteBook(${book.id})">Delete</button></td></tr>`;
  });
  var elTable = document.querySelector('.table-infos');
  elTable.innerHTML = strHtmls.join('');
  doTrans();
  renderNumsPages();
}

function onRateBook(elBtn, bookId) {
  var symbol = elBtn.innerText;
  var book = getBookById(bookId);
  rateBook(symbol, book);
  renderModal(book);
}

function onDeleteBook(bookId) {
  deleteBook(bookId);
  renderBooks();
}

function onAddBook() {
  var elNewBookName = document.querySelector('[name=bookName]');
  var bookName = elNewBookName.value;
  var elPrice = document.querySelector('[name=bookPrice]');
  var bookPrice = elPrice.value;
  addBook(bookName, bookPrice);
  elPrice.value = '';
  elNewBookName.value = '';
  document.querySelector('.add-book').hidden = true;
  document.querySelector('.add-new-book').hidden = false;
  renderBooks();
}

function onUpdateBook(bookId) {
  document.querySelector(`.book-price-${bookId} span`).hidden = false;
}

function update(bookId) {
  var elPrice = document.querySelector(`[name=updatePrice${bookId}]`);
  var newPrice = elPrice.value;
  updateBook(bookId, newPrice);
  document.querySelector(`.book-price-${bookId} span`).hidden = true;
  renderBooks();
}

function renderModal(book) {
  var strHtml = `<img src="${book.imgUrl}" />
  <h6>Price: $${book.price}</h6>
  <p>-Shortcut story-</p>
  <p>${book.shortcutStory}</p>
      <button class="rate-book minus" onclick="onRateBook(this,${book.id})">-</button>
      <input name="bookRate" type="text" value="${book.rate}" />
       <button class="rate-book plus" onclick="onRateBook(this,${book.id})">+</button>`;

  var elModal = document.querySelector('.modal-body');
  elModal.innerHTML = strHtml;
}

function onReadBook(bookId) {
  var book = getBookById(bookId);
  renderModal(book);
  // document.querySelector('.modal').hidden = false;
}

function renderNumsPages() {
  var pages = getNumsPages();
  var strHtmls = [];
  for (var i = pages; i > 0; i--) {
    strHtmls.unshift(
      `<li class="page-item"><a class="page-link" onclick="onNextPage(${
        i - 1
      })">${i}</a></li>`
    );
  }
  strHtmls.unshift(
    `<li class="page-item"><a class="page-link" onclick="onNextPage('prev')">Previous</a></li>`
  );
  strHtmls.push(
    ` <li class="page-item"><a class="page-link" onclick="onNextPage('next')">Next</a></li>`
  );
  var elPages = document.querySelector('.pagination');
  elPages.innerHTML = strHtmls.join('');
}

function onAddYourOwnBook() {
  document.querySelector('.add-book').hidden = false;
  document.querySelector('.add-new-book').hidden = true;
}

function onNextPage(pageNum) {
  nextPage(pageNum);
  renderBooks();
}

function onSortBy(elBtn) {
  var value = elBtn.innerText;
  SortBy(value);
  renderBooks();
}

function onSetLang(lang) {
  setLang(lang);
  if (lang === 'he') {
    document.body.classList.add('rtl');
  } else {
    document.body.classList.remove('rtl');
  }
  doTrans();
}
