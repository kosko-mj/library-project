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

// Function to Add Books to Library
function addBookToLibrary(title, author, pages, read) {
    const newBook = Book(title, author, pages, read);
    myLibrary.push(newBook);
    displayBooks();
}

// Function to Display Books on Page
function displayBooks() {

}

// Test Books
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
addBookToLibrary("Dune", "Frank Herbert", 412, true);

console.log(myLibrary);

