// ====================================
// IMPORTS
// ====================================
import Book from './components/Book.js';
import Library from './components/Library.js';
import UIController from './components/UIController.js';




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

// ====================================
// FORM SUBMISSION
// ====================================
// Form Submission with Constraint Validation API
bookForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Get form fields and their error containers
    const titleInput = document.getElementById('title');
    const authorInput = document.getElementById('author');
    const pagesInput = document.getElementById('pages');
    const genreSelect = document.getElementById('genre');
    
    const titleError = document.getElementById('title-error');
    const authorError = document.getElementById('author-error');
    const pagesError = document.getElementById('pages-error');
    const genreError = document.getElementById('genre-error');

    // Reset all custom validity and error messages
    [titleInput, authorInput, pagesInput, genreSelect].forEach(field => {
        field.setCustomValidity('');
        field.classList.remove('invalid', 'valid');
    });
    
    [titleError, authorError, pagesError, genreError].forEach(error => {
        error.textContent = '';
    });

    let isValid = true;

    // Validate Title
    if (titleInput.value.trim() === '') {
        titleInput.setCustomValidity('Please enter a title');
        titleError.textContent = 'Title is required';
        titleInput.classList.add('invalid');
        isValid = false;
    } else {
        titleInput.classList.add('valid');
    }

    // Validate Author
    if (authorInput.value.trim() === '') {
        authorInput.setCustomValidity('Please enter an author');
        authorError.textContent = 'Author is required';
        authorInput.classList.add('invalid');
        isValid = false;
    } else {
        authorInput.classList.add('valid');
    }

    // Validate Pages
    if (pagesInput.value.trim() === '') {
        pagesInput.setCustomValidity('Please enter number of pages');
        pagesError.textContent = 'Pages is required';
        pagesInput.classList.add('invalid');
        isValid = false;
    } else if (parseInt(pagesInput.value) <= 0) {
        pagesInput.setCustomValidity('Pages must be greater than 0');
        pagesError.textContent = 'Pages must be greater than 0';
        pagesInput.classList.add('invalid');
        isValid = false;
    } else {
        pagesInput.classList.add('valid');
    }

    // Validate Genre
    if (genreSelect.value === '') {
        genreSelect.setCustomValidity('Please select a genre');
        genreError.textContent = 'Genre is required';
        genreSelect.classList.add('invalid');
        isValid = false;
    } else {
        genreSelect.classList.add('valid');
    }

    // If form is valid, add the book
    if (isValid) {
        const title = titleInput.value.trim();
        const author = authorInput.value.trim();
        const pages = pagesInput.value.trim();
        const genre = genreSelect.value;
        const read = document.getElementById('read').checked;

        addBookToLibrary(title, author, pages, genre, read);

        bookForm.reset();
        formContainer.style.display = 'none';
        
        // Remove validation classes after reset
        [titleInput, authorInput, pagesInput, genreSelect].forEach(field => {
            field.classList.remove('valid', 'invalid');
        });
    }
});

// ====================================
// LIVE VALIDATION
// ====================================

// Function to validate a single field
function validateField(field) {
    const errorDiv = document.getElementById(`${field.id}-error`);
    
    // Reset validation state
    field.setCustomValidity('');
    field.classList.remove('invalid', 'valid');
    
    if (errorDiv) {
        errorDiv.textContent = '';
    }

    // Skip validation for checkbox
    if (field.type === 'checkbox') return true;

    let isValid = true;

    // Validate based on field id
    if (field.id === 'title' && field.value.trim() === '') {
        field.setCustomValidity('Please enter a title');
        if (errorDiv) errorDiv.textContent = 'Title is required';
        field.classList.add('invalid');
        isValid = false;
    }
    else if (field.id === 'author' && field.value.trim() === '') {
        field.setCustomValidity('Please enter an author');
        if (errorDiv) errorDiv.textContent = 'Author is required';
        field.classList.add('invalid');
        isValid = false;
    }
    else if (field.id === 'pages') {
        if (field.value.trim() === '') {
            field.setCustomValidity('Please enter number of pages');
            if (errorDiv) errorDiv.textContent = 'Pages is required';
            field.classList.add('invalid');
            isValid = false;
        } else if (parseInt(field.value) <= 0) {
            field.setCustomValidity('Pages must be greater than 0');
            if (errorDiv) errorDiv.textContent = 'Pages must be greater than 0';
            field.classList.add('invalid');
            isValid = false;
        }
    }
    else if (field.id === 'genre' && field.value === '') {
        field.setCustomValidity('Please select a genre');
        if (errorDiv) errorDiv.textContent = 'Genre is required';
        field.classList.add('invalid');
        isValid = false;
    }

    // If valid, add green border
    if (isValid && field.id !== 'genre') {
        field.classList.add('valid');
    } else if (isValid && field.id === 'genre' && field.value !== '') {
        field.classList.add('valid');
    }

    return isValid;
}

// Add live validation listeners to all form fields
const formFields = ['title', 'author', 'pages', 'genre'];
formFields.forEach(fieldId => {
    const field = document.getElementById(fieldId);
    if (field) {
        // Validate on input (as user types)
        field.addEventListener('input', () => {
            validateField(field);
        });
        
        // Validate on blur (when user leaves the field)
        field.addEventListener('blur', () => {
            validateField(field);
        });
    }
});


// ====================================
// SEARCH FUNCTIONALITY
// ====================================
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