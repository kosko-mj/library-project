// ====================================
// BOOK CLASS
// ====================================
class Book {
    constructor(title, author, pages, genre, read) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.genre = genre;
        this.read = read;
    }

    // Getter - formats the title when accessed
    get title() {
        return this._title.toUpperCase();
    }

    // Setter - prevents empty titles
    set title(newTitle) {
        if (newTitle.trim() === '') {
            console.log('Title cannot be empty!');
            return;
        }
        this._title = newTitle;
    }

    // Instance method - belongs to each book
    info() {
        let readIcon = this.read ? '<i class="ri-checkbox-circle-line"></i>' : '<i class="ri-book-open-line"></i>';
        let readText = this.read ? 'read' : 'not read yet';

        return `${this.title} by ${this.author} - ${this.pages} pages - ${readIcon} ${readText}`;
    }

    // Another instance method
    toggleRead() {
        this.read = !this.read;
    }
}

// ====================================
// LIBRARY CLASS
// ====================================
class Library {
    constructor() {
        this.books = [];
    }

    addBook(book) {
        this.books.push(book);
    }

    removeBook(bookId) {
        this.books = this.books.filter(book => book.id !== bookId);
    }

    getBooksByGenre(genre) {
        return this.books.filter(book => book.genre === genre);
    }

    getGenreCount(genre) {
        return this.books.filter(book => book.genre === genre).length;
    }
}

// ====================================
// DRAWER CLASS
// ====================================
class Drawer {
    constructor(genre, count) {
        this.genre = genre;
        this.count = count;
    }

    createElement() {
        const drawer = document.createElement('div');
        drawer.classList.add('drawer');
        drawer.setAttribute('data-genre', this.genre);

        drawer.innerHTML = `
            <div class="drawer-front">
                <div class="drawer-name-plate">
                    <span class="drawer-name">${this.genre}</span>
                </div>
                <span class="drawer-count">${this.count}</span>
            </div>
        `;   
        
        return drawer;
    }
}

// ====================================
// ADD BOOK FUNCTION
// ====================================
function addBookToLibrary(title, author, pages, genre, read) {
    const newBook = new Book(title, author, pages, genre, read);
    myLibrary.addBook(newBook);
    displayDrawers();
    displayBooks();
}

// ====================================
// DISPLAY BOOKS FUNCTION
// ====================================
function displayBooks() {
    const container = document.getElementById('library-container');
    container.innerHTML = '';

    const books = myLibrary.books;

    for (let i = 0; i < books.length; i++) {
        const book = books[i];

        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        bookCard.setAttribute('data-id', book.id);

        bookCard.innerHTML = `
            <h3>${book.title}</h3>
            <p><strong>By:</strong> ${book.author}</p>
            <p><strong>Pages:</strong> ${book.pages}</p>
            <p><strong>Genre:</strong> ${book.genre}</p>
            <p class="read-status">
                ${book.read ? '<i class="ri-checkbox-circle-line"></i>' : '<i class="ri-book-open-line"></i>'}
            </p>
            <button class="remove-btn" data-id="${book.id}">Remove</button>
            <button class="toggle-read" data-id="${book.id}">Toggle Read</button>
        `;

        container.appendChild(bookCard);

        // Remove button
        const removeBtn = bookCard.querySelector('.remove-btn');
        removeBtn.addEventListener('click', function() {
            const bookId = this.dataset.id;
            myLibrary.removeBook(bookId);
            displayDrawers();
            displayBooks();
        });

        // Toggle read button
        const toggleBtn = bookCard.querySelector('.toggle-read');
        toggleBtn.addEventListener('click', function() {
            const bookId = this.dataset.id;
            const book = myLibrary.books.find(b => b.id === bookId);  // Find in books array
            if (book) {
                book.toggleRead();
                displayBooks();
            }
        });
    }
}

// ====================================
// DISPLAY FILTERED BOOKS
// ====================================
function displayFilteredBooks(books) {
    const container = document.getElementById('library-container');
    container.innerHTML = '';

    if (books.length === 0) {
        container.innerHTML = '<p class="no-books">No books in this category yet.</p>';
        return;
    }

    for (let i = 0; i < books.length; i++) {
        const book = books[i];

        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        bookCard.setAttribute('data-id', book.id);

        bookCard.innerHTML = `
            <h3>${book.title}</h3>
            <p><strong>By:</strong> ${book.author}</p>
            <p><strong>Pages:</strong> ${book.pages}</p>
            <p><strong>Genre:</strong> ${book.genre}</p>
            <p class="read-status">
                ${book.read ? '<i class="ri-checkbox-circle-line"></i>' : '<i class="ri-book-open-line"></i>'}
            </p>
            <button class="remove-btn" data-id="${book.id}">Remove</button>
            <button class="toggle-read" data-id="${book.id}">Toggle Read</button>
        `;

        container.appendChild(bookCard);

        // Remove button
        const removeBtn = bookCard.querySelector('.remove-btn');
        removeBtn.addEventListener('click', function() {
            const bookId = this.dataset.id;
            myLibrary.removeBook(bookId);
            displayDrawers();
            
            // Get updated filtered books
            const currentGenre = books[0]?.genre;
            const updatedFiltered = myLibrary.getBooksByGenre(currentGenre);
            displayFilteredBooks(updatedFiltered);
        });

        // Toggle read button
        const toggleBtn = bookCard.querySelector('.toggle-read');
        toggleBtn.addEventListener('click', function() {
            const bookId = this.dataset.id;
            const book = myLibrary.books.find(b => b.id === bookId);
            if (book) {
                book.toggleRead();
                
                // Refresh the current filtered view
                const currentGenre = books[0]?.genre;
                const updatedFiltered = myLibrary.getBooksByGenre(currentGenre);
                displayFilteredBooks(updatedFiltered);
            }
        });
    }
}

// ====================================
// DISPLAY DRAWERS
// ====================================
function displayDrawers() {
    const drawerContainer = document.getElementById('drawer-container');
    drawerContainer.innerHTML = '';
    
    const genres = ['FICTION', 'NON-FICTION', 'SCI-FI', 'BIOGRAPHY', 'MYSTERY', 'HISTORY'];
    
    genres.forEach(genre => {
        const count = myLibrary.getGenreCount(genre);  // Note: you have a typo here!
        const drawer = new Drawer(genre, count);
        const drawerElement = drawer.createElement();
        
        drawerElement.addEventListener('click', () => {
            document.getElementById('drawer-container').style.display = 'none';
            document.getElementById('library-container').style.display = 'grid';
            document.getElementById('close-view').style.display = 'flex';
            
            const filteredBooks = myLibrary.getBooksByGenre(genre);
            displayFilteredBooks(filteredBooks);
        });
        
        drawerContainer.appendChild(drawerElement);
    });
}

// Close icon functionality (moved outside the loop)
const closeView = document.getElementById('close-view');
if (closeView) {
    closeView.addEventListener('click', () => {
        document.getElementById('drawer-container').style.display = 'grid';
        document.getElementById('library-container').style.display = 'none';
        closeView.style.display = 'none';
    });
}

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
    const genre = document.getElementById('genre').value;
    const read = document.getElementById('read').checked;

    addBookToLibrary(title, author, pages, genre, read);

    bookForm.reset();
    formContainer.style.display = 'none';
});

// Search functionality
const searchIcon = document.getElementById('search-icon');
const searchInput = document.getElementById('search-input');

searchIcon.addEventListener('click', () => {
    searchInput.classList.toggle('expanded');
    if (searchInput.classList.contains('expanded')) {
        searchInput.focus();
    }
});

searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    console.log('Searching for:', searchTerm);
});

// Initialize
displayDrawers();

// Test Books
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, "FICTION", false);
addBookToLibrary("Dune", "Frank Herbert", 412, "SCI-FI", true);