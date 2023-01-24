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
    const newBook = document.createElement("div");
    newBook.classList.add("card");
    newBook.textContent = book.info();
    libraryWrapper.append(newBook);
  });
}

addBookToLibrary("The Overstory", "Richard Powers", 512, false);
addBookToLibrary("Pachinko", "Min Jin Lee", 502, true);
printLibrary();
