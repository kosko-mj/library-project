// Book Constructor
function Book(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// Info Method
Book.prototype.info = function() {
    let readIcon = this.read ? '<i class="ri-checkbox-circle-line"></i>' : '<i class="ri-book-open-line"></i>';
    let readText = this.read ? 'read' : 'not read yet';
        
    return `${this.title} by ${this.author} - ${this.pages} pages - ${readIcon} ${readText}`;
};

// Array to Store Books
const myLibrary = [];

// Add Book Function
function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    displayBooks();
}

// Display Books Function
function displayBooks() {
    // Get Container Element
    const container = document.getElementById('library-container');

    // Clear Container
    container.innerHTML = '';

    // Loop Through Each Book in Array
    for (let i = 0; i < myLibrary.length; i++) {
        const book = myLibrary[i];

        // Create Card for This Book
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        bookCard.setAttribute('data-id', book.id);

        // Add Book Info to Card
        bookCard.innerHTML = `
            <h3>${book.title}</h3>
            <p><strong>By:</strong> ${book.author}</p>
            <p><strong>Pages:</strong> ${book.pages}</p>
            <p class="read-status">
                ${book.read ? '<i class="ri-checkbox-circle-line"></i>' : '<i class="ri-book-open-line"></i>'}
            </p>
            <button class="remove-btn" data-id="${book.id}">Remove</button>
            <button class="toggle-read" data-id="${book.id}">Toggle Read</button>
        `;

        // Add Card to Container
        container.appendChild(bookCard);

        // Remove Button Functionality
        const removeBtn = bookCard.querySelector('.remove-btn');
        removeBtn.addEventListener('click', function() {
            // Find the index of this book in myLibrary using its id
            const bookId = this.dataset.id;
            const bookIndex = myLibrary.findIndex(book => book.id === bookId);

            // Remove it from array
            myLibrary.splice(bookIndex, 1);

            // Refresh Display
            displayBooks();
        });

        // Toggle Button Functionality
        const toggleBtn = bookCard.querySelector('.toggle-read');
        toggleBtn.addEventListener('click', function() {
            const bookId = this.dataset.id;
            const book = myLibrary.find(book => book.id === bookId);
            book.read = !book.read;
            displayBooks();
        });
    }
}

// Test Books
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
addBookToLibrary("Dune", "Frank Herbert", 412, true);

console.log(myLibrary);

