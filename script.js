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

// Get Button/Form Container
const newBookBtn = document.getElementById('new-book-btn');
const formContainer = document.getElementById('book-form-container');
const cancelBtn = document.getElementById('cancel-form');

// Show form on NEW Book click
newBookBtn.addEventListener('click', () => {
    formContainer.style.display = 'block';
});

// Hide form on Cancel click
cancelBtn.addEventListener('click', () => {
    formContainer.style.display = 'none';
});

// Get Form 
const bookForm = document.getElementById('book-form');

// Form Submission
bookForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;

    addBookToLibrary(title, author, pages, read);

    bookForm.reset();

    formContainer.style.display = 'none';
});

// Drawer categories
const drawers = [
    { name: "FICTION", count: 0 },
    { name: "NON-FICTION", count: 0 },
    { name: "SCI-FI", count: 0 },
    { name: "BIOGRAPHY", count: 0 },
    { name: "MYSTERY", count: 0 },
    { name: "HISTORY", count: 0}
];

// Function to display drawers
function displayDrawers() {
    const drawerContainer = document.getElementById('drawer-container');
    drawerContainer.innerHTML = '';
    
    drawers.forEach(drawer => {
        const drawerElement = document.createElement('div');
        drawerElement.classList.add('drawer');
        
        drawerElement.innerHTML = `
            <div class="drawer-front">
                <div class="drawer-name-plate">
                    <span class="drawer-name">${drawer.name}</span>
                </div>
                <span class="drawer-count">${drawer.count}</span>
            </div>
        `;
        
        drawerContainer.appendChild(drawerElement);
    });
}

// Call it to show drawers
displayDrawers();

// Search functionality
const searchIcon = document.getElementById('search-icon');
const searchInput = document.getElementById('search-input');

searchIcon.addEventListener('click', () => {
    searchInput.classList.toggle('expanded');
    if (searchInput.classList.contains('expanded')) {
        searchInput.focus();
    }
});

// Optional: Search as you type (we'll implement filtering later)
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    console.log('Searching for:', searchTerm);
    // We'll add actual search/filter logic later
});
