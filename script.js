const books = document.querySelector(".books");

let myLibrary = [];

function createBookElement(el, text, className) {
  const element = document.createElement(el);
  element.textContent = text;
  element.classList.add(`${className}`);
  return element;
}

function deleteBook(index) {
  myLibrary.splice(index , 1);
  renderBooks();
}

function createBook(book, index) {
  const bookItem = document.createElement("div");
  bookItem.setAttribute("id", index);
  bookItem.setAttribute("key", index);
  bookItem.classList.add("card-book");
  bookItem.appendChild(createBookElement("h4", `Title: ${book.title}`, "book-title"));
  bookItem.appendChild(createBookElement("h4", `Author: ${book.author}`, "book-author"));
  bookItem.appendChild(createBookElement("h4", `Pages: ${book.pages}`, "book-pages"));
  bookItem.appendChild(createReadElement(bookItem, book));
  bookItem.appendChild(createBookElement("button", "X", "delete"));
  bookItem.querySelector(".delete").addEventListener("click", () => {
    deleteBook(index);
  });
  books.appendChild(bookItem);
}

function createReadElement(bookItem, book) {
  const read = document.createElement("div");

  read.classList.add("book-read");
  read.appendChild(createBookElement("h4", "Read?", "book-read-title"));
  const input = document.createElement("input");
  input.type = "checkbox";
  input.addEventListener("click", (e) => {
    if (e.target.checked) {
      bookItem.classList.add("read-checked");
      book.Read = true;
      bookItem.classList.remove("read-unchecked");
    } else {
      bookItem.classList.add("read-unchecked");
      book.Read = false;
      bookItem.classList.remove("read-checked");
    }
  });
  if (book.Read) {
    input.checked = true;
    bookItem.classList.add("read-checked");
  } else {
    input.checked = false;
    bookItem.classList.add("read-unchecked");
  }

  read.appendChild(input);
  return read;
}

class Book {
  constructor(title, author, pages, Read) {
    this.title = title;
    this. author = author;
    this.pages = pages;
    if (Read === "yes")
      this.Read = true;
    else
      this.Read = false;
  }
}

function addBookToLibrary(title, author, pages, Read) {
  // do stuff here
  myLibrary.push(new Book(title, author, pages, Read));
  renderBooks();
}

function renderBooks() {
  books.textContent = "";
  myLibrary.map((book, index) => {
    createBook(book, index);
  })
}

document.querySelector("#add-book-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  addBookToLibrary(data.get("title"), data.get("author"), data.get("pages"), data.get("myRadioGroup"))
})

renderBooks();