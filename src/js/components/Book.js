// ====================================
// BOOK CLASS
// ====================================
export default class Book {
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