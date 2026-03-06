// ====================================
// UI CONTROLLER CLASS
// ====================================
import Drawer from "./Drawer";

export default class UIController {
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