// Book Constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    // Info Method
    this.info = function() {
        let readIcon = this.read ? '<i class="ri-checkbox-circle-line"></i>' : '<i class="ri-book-open-line"></i>';
        let readText = this.read ? 'read' : 'not read yet';
        
        return `${this.title} by ${this.author} - ${this.pages} pages - ${readIcon} ${readText}`;
    };
}

// Books
const book1 = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
const book2 = new Book("Dune", "Frank Herbert", 412, true);

// Test
console.log(book1.info());
console.log(book2.info());