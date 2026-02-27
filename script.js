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
// UI CONTROLLER CLASS
// ====================================
class UIController {
    constructor(library) {
        this.library = library;
        this.drawerContainer = document.getElementById('drawer-container');
        this.libraryContainer = document.getElementById('library-container');
        this.closeView = document.getElementById('close-view');
        this.playerTurnElement = document.getElementById('player-turn'); // If you have one
    }

    // Display drawers
    renderDrawers() {
        this.drawerContainer.innerHTML = '';
        
        const genres = ['FICTION', 'NON-FICTION', 'SCI-FI', 'BIOGRAPHY', 'MYSTERY', 'HISTORY'];
        
        genres.forEach(genre => {
            const count = this.library.getGenreCount(genre);
            const drawer = new Drawer(genre, count);
            const drawerElement = drawer.createElement();
            
            drawerElement.addEventListener('click', () => {
                this.showGenreView(genre);
            });
            
            this.drawerContainer.appendChild(drawerElement);
        });
    }

    // Show books for a specific genre
    showGenreView(genre) {
        const books = this.library.getBooksByGenre(genre);
        this.renderBooks(books);
        this.drawerContainer.style.display = 'none';
        this.libraryContainer.style.display = 'grid';
        this.closeView.style.display = 'flex';
    }

    // Show all books
    showAllBooks() {
        this.renderBooks(this.library.books);
        this.drawerContainer.style.display = 'grid';
        this.libraryContainer.style.display = 'none';
        this.closeView.style.display = 'none';
    }

    // Render books (used by both showGenreView and showAllBooks)
    renderBooks(books) {
        this.libraryContainer.innerHTML = '';

        if (books.length === 0) {
            this.libraryContainer.innerHTML = '<p class="no-books">No books in this category yet.</p>';
            return;
        }

        books.forEach(book => {
            const bookCard = this.createBookCard(book);
            this.libraryContainer.appendChild(bookCard);
        });
    }

    // Create a single book card
    createBookCard(book) {
        const card = document.createElement('div');
        card.classList.add('book-card');
        card.setAttribute('data-id', book.id);

        card.innerHTML = `
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

        // Remove button handler
        card.querySelector('.remove-btn').addEventListener('click', () => {
            this.library.removeBook(book.id);
            this.renderDrawers();
            
            // If we're in a filtered view, stay in that view
            if (this.libraryContainer.style.display === 'grid' && 
                this.drawerContainer.style.display === 'none') {
                // We're in a genre view, need to refresh it
                const currentGenre = book.genre;
                const updatedBooks = this.library.getBooksByGenre(currentGenre);
                this.renderBooks(updatedBooks);
            } else {
                this.renderBooks(this.library.books);
            }
        });

        // Toggle read button handler
        card.querySelector('.toggle-read').addEventListener('click', () => {
            book.toggleRead();
            
            // Refresh the current view
            if (this.libraryContainer.style.display === 'grid' && 
                this.drawerContainer.style.display === 'none') {
                // We're in a genre view
                const currentGenre = book.genre;
                const updatedBooks = this.library.getBooksByGenre(currentGenre);
                this.renderBooks(updatedBooks);
            } else {
                this.renderBooks(this.library.books);
            }
        });

        return card;
    }
}

// ====================================
// LIBRARY INSTANCE
// ====================================
const myLibrary = new Library();
const ui = new UIController(myLibrary);

// ====================================
// ADD BOOK FUNCTION (UPDATED)
// ====================================
function addBookToLibrary(title, author, pages, genre, read) {
    const newBook = new Book(title, author, pages, genre, read);
    myLibrary.addBook(newBook);
    ui.renderDrawers();
    ui.showAllBooks();
}

// Close icon functionality (moved outside the loop)
const closeView = document.getElementById('close-view');
if (closeView) {
    closeView.addEventListener('click', () => {
        ui.showAllBooks();
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
ui.renderDrawers();
ui.showAllBooks(); 

// Test Books
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, "FICTION", false);
addBookToLibrary("Dune", "Frank Herbert", 412, "SCI-FI", true);