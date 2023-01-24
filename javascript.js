const libraryWrapper = document.querySelector(".library-wrapper");

let myLibrary = [];

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

function printLibrary() {
  myLibrary.forEach((book) => {
    generateBookDiv(book);
  });
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
}

addBookToLibrary("The Overstory", "Richard Powers", 512, false);
addBookToLibrary("Pachinko", "Min Jin Lee", 502, true);
printLibrary();
