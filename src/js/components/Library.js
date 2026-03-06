// ====================================
// LIBRARY CLASS
// ====================================
export default class Library {
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