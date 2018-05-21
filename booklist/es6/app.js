// Event Listeners
document.addEventListener('DOMContentLoaded', Store.displayBooks())

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

  // Add to LocalStorage
  Store.addBook(book);

  // Show success
  ui.showAlert('Book added!', 'success');

  // Clear fields
  ui.clearFields();
});

document.getElementById('book-list').addEventListener('click', function (e) {
  e.preventDefault();

  // Instantiate UI
  const ui = new UI();

  // Delete book
  ui.deleteBook(e.target);

  // Remove from LocalStorage
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent.trim());

  // Show success
  if(e.target.className === 'delete'){
    ui.showAlert('Book removed!','success');
  }
});