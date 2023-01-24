const libraryWrapper = document.querySelector(".library-wrapper");
const newBookBtn = document.querySelector(".new-book-btn");
const newBookForm = document.querySelector(".new-book-form");

const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;

  this.info = () =>
    `${title} by ${author}, ${pages} pages, ${read ? "read" : "not read yet"}`;
}

function addBookToLibrary(title, author, pages, read) {
  myLibrary.push(new Book(title, author, pages, read));
}

function delBtnCallback(e) {
  const delIndex = myLibrary.findIndex(
    (x) => x.title === e.currentTarget.dataset.book
  );
  if (delIndex > -1) {
    myLibrary.splice(delIndex, 1);
  }
  // eslint-disable-next-line no-use-before-define
  printLibrary();
}

function readBtnCallback(e) {
  myLibrary.find((x) => x.title === e.currentTarget.dataset.book).read = true;
  // eslint-disable-next-line no-use-before-define
  printLibrary();
}

function generateBookDiv(book) {
  const newBook = document.createElement("div");
  newBook.classList.add("card");

  libraryWrapper.append(newBook);

  const title = document.createElement("p");
  title.textContent = book.title;
  title.classList.add("title");
  newBook.append(title);

  const author = document.createElement("p");
  author.textContent = book.author;
  author.classList.add("author");
  newBook.append(author);

  const pages = document.createElement("p");
  pages.textContent = `${book.pages} pages`;
  pages.classList.add("pages");
  newBook.append(pages);

  const read = document.createElement("p");
  read.textContent = book.read ? `✅ Read` : "❌ Unread";
  read.classList.add("read");
  newBook.append(read);

  const delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  delBtn.classList.add("del-btn");
  delBtn.dataset.book = book.title;
  delBtn.addEventListener("click", delBtnCallback);
  newBook.append(delBtn);

  if (!book.read) {
    const readBtn = document.createElement("button");
    readBtn.textContent = "Read";
    readBtn.classList.add("read-btn");
    readBtn.dataset.book = book.title;
    readBtn.addEventListener("click", readBtnCallback);
    newBook.append(readBtn);
  }
}

function printLibrary() {
  libraryWrapper.innerHTML = "";
  myLibrary.sort((a, b) => (a.title < b.title ? -1 : 1));
  myLibrary.forEach((book) => {
    generateBookDiv(book);
  });
}

addBookToLibrary("The Overstory", "Richard Powers", 512, false);
addBookToLibrary("Pachinko", "Min Jin Lee", 502, true);
addBookToLibrary("The Last Samurai", "Helen DeWitt", 548, true);
printLibrary();

newBookBtn.addEventListener("click", (e) => {
  newBookBtn.style.display = "none";
  newBookForm.style.display = "grid";

  e.preventDefault();
});

newBookForm.addEventListener("submit", (e) => {
  const formData = new FormData(e.target);
  const formProps = Object.fromEntries(formData);
  addBookToLibrary(
    formProps["book-title"],
    formProps["book-author"],
    formProps["book-pages"],
    formProps["book-read"]
  );
  printLibrary();

  newBookBtn.style.display = "block";
  newBookForm.style.display = "none";

  e.preventDefault();
});
