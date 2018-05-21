// Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Contructor
function UI() {}

// Add Book To List
UI.prototype.addBookToList = function (book) {
  const list = document.getElementById('book-list');
  // Create tr element
  const row = document.createElement('tr');

  // Insert cols
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
  `;

  list.appendChild(row);
}

// Clear fields
UI.prototype.clearFields = function () {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}

// Delete book
UI.prototype.deleteBook = function (target) {
  if (target.className === 'delete') {
    target.parentElement.parentElement.remove();
  }
}

UI.prototype.showAlert = function (message, className) {
  //Create div
  const div = document.createElement('div');
  // Add classes
  div.className = `alert ${className}`;
  // Add text
  div.appendChild(document.createTextNode(message));
  // Get parent
  const container = document.querySelector('.container');
  const form = document.querySelector('#book-form');

  // Insert alert
  container.insertBefore(div, form);

  div.classList.add('fade-out');
  // Timeout after 3 sec
  setTimeout(() => {
    div.remove();
  }, 3000);
}

// Event Listeners
document.getElementById('book-form').addEventListener('submit', function (e) {
  e.preventDefault();

  // Get form values
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const isbn = document.getElementById('isbn').value;
  const book = new Book(title, author, isbn);

  // Instantiate UI
  const ui = new UI();

  // Validate
  if (title === '' || author === '' || isbn === '') {
    ui.showAlert('Please fill in all fields.', 'error');
    return;
  }

  // Add book to list
  ui.addBookToList(book);

  // Show success
  ui.showAlert('Book added!', 'success');

  // Clear fields
  ui.clearFields();
});

document.getElementById('book-list').addEventListener('click', function (e) {
  e.preventDefault();

  // Instantiate UI
  const ui = new UI();

  // Delete the book
  ui.deleteBook(e.target);

  // Show success
  if(e.target.className === 'delete'){
    ui.showAlert('Book removed!','success');
  }
});