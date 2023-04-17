"use strict";

const addBookBtn = document.querySelector(".btn_add");
const formEl = document.querySelector(".form");
const nameInput = document.getElementById("name");
const authorInput = document.getElementById("author");
const numPages = document.getElementById("pages");
const readInput = document.getElementById("read");
const btnSubmit = document.getElementById("submit");
const bookCard = document.querySelector(".book");
const CardContianer = document.querySelector(".card_container");
const checkbox = document.getElementById("read");

let myLibrary = [];

function Book(name, author, pages, read) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.haveRead = function () {
  this.read = !this.read;
};

function toggleRead(index) {
  myLibrary[index].haveRead();
  render();
}

function addBookToLibrary() {
  let name = nameInput.value;
  let author = authorInput.value;
  let pages = numPages.value;
  let read = checkbox.checked;

  let newBook = new Book(name, author, pages, read);
  myLibrary.push(newBook);
  console.log(myLibrary);
}

function render() {
  CardContianer.innerHTML = "";
  myLibrary.forEach((item, i) => {
    const html = `<div class="book">
    <p>Name: ${item.name}</p>
    <p>Author: ${item.author}</p>
    <p>Pages: ${item.pages}</p>
    <button class="${
      item.read ? "btn btn_read" : "btn btn_notread"
    }" onClick="toggleRead(${i})">${
      item.read ? "Read" : "Not Read Yet"
    }</button>
    <button class="btn btn_remove" onClick="removeBook(${i})">Remove</button>
  </div>`;
    CardContianer.insertAdjacentHTML("afterbegin", html);
  });
}

function removeBook(index) {
  myLibrary.splice(index, 1);

  render();
}

addBookBtn.addEventListener("click", () => {
  formEl.style.display = "block";
});

btnSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  addBookToLibrary();
  render();
  nameInput.value = "";
  authorInput.value = "";
  numPages.value = "";
  formEl.style.display = "none";
});
