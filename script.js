// Book Constructor
function Book(title, author, pages, genre, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.genre = genre;
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
function addBookToLibrary(title, author, pages, genre, read) {
    const newBook = new Book(title, author, pages, genre, read);
    myLibrary.push(newBook);
    updateDrawerCounts();
    displayBooks();
}

// Display Books Function
function displayBooks() {
    const container = document.getElementById('library-container');
    container.innerHTML = '';

    for (let i = 0; i < myLibrary.length; i++) {
        const book = myLibrary[i];

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

        const removeBtn = bookCard.querySelector('.remove-btn');
        removeBtn.addEventListener('click', function() {
            const bookId = this.dataset.id;
            const bookIndex = myLibrary.findIndex(book => book.id === bookId);
            myLibrary.splice(bookIndex, 1);
            updateDrawerCounts();
            displayBooks();
        });

        const toggleBtn = bookCard.querySelector('.toggle-read');
        toggleBtn.addEventListener('click', function() {
            const bookId = this.dataset.id;
            const book = myLibrary.find(book => book.id === bookId);
            book.read = !book.read;
            displayBooks();
        });
    }
}

// Display filtered books (for when a drawer is opened)
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

        const removeBtn = bookCard.querySelector('.remove-btn');
        removeBtn.addEventListener('click', function() {
            const bookId = this.dataset.id;
            const bookIndex = myLibrary.findIndex(book => book.id === bookId);
            myLibrary.splice(bookIndex, 1);
            updateDrawerCounts();
            
            const currentGenre = books[0]?.genre;
            const updatedFiltered = myLibrary.filter(book => book.genre === currentGenre);
            displayFilteredBooks(updatedFiltered);
        });

        // ✅ FIXED: Added toggle button handler
        const toggleBtn = bookCard.querySelector('.toggle-read');
        toggleBtn.addEventListener('click', function() {
            const bookId = this.dataset.id;
            const book = myLibrary.find(book => book.id === bookId);
            book.read = !book.read;
            
            const currentGenre = books[0]?.genre;
            const updatedFiltered = myLibrary.filter(book => book.genre === currentGenre);
            displayFilteredBooks(updatedFiltered);
        });
    }
}

// Drawer categories
const drawers = [
    { name: "FICTION", count: 0 },
    { name: "NON-FICTION", count: 0 },
    { name: "SCI-FI", count: 0 },
    { name: "BIOGRAPHY", count: 0 },
    { name: "MYSTERY", count: 0 },
    { name: "HISTORY", count: 0 }
];

// Function to display drawers
function displayDrawers() {
    const drawerContainer = document.getElementById('drawer-container');
    drawerContainer.innerHTML = '';
    
    drawers.forEach(drawer => {
        const drawerElement = document.createElement('div');
        drawerElement.classList.add('drawer');
        drawerElement.setAttribute('data-genre', drawer.name);
        
        drawerElement.innerHTML = `
            <div class="drawer-front">
                <div class="drawer-name-plate">
                    <span class="drawer-name">${drawer.name}</span>
                </div>
                <span class="drawer-count">${drawer.count}</span>
            </div>
        `;
        
        drawerElement.addEventListener('click', () => {
            document.getElementById('drawer-container').style.display = 'none';
            document.getElementById('library-container').style.display = 'grid';
            document.getElementById('close-view').style.display = 'flex';
            
            const filteredBooks = myLibrary.filter(book => book.genre === drawer.name);
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

// Function to update drawer counts
function updateDrawerCounts() {
    drawers.forEach(drawer => drawer.count = 0);
    
    myLibrary.forEach(book => {
        const drawer = drawers.find(d => d.name === book.genre);
        if (drawer) drawer.count++;
    });
    
    displayDrawers();
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