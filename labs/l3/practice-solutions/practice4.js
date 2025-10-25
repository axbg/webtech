const books = [
  { title: "The Catcher in the Rye", author: "J.D. Salinger", year: 1951 },
  { title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960 },
  { title: "1984", author: "George Orwell", year: 1949 },
  { title: "The Great Gatsby", author: "F. Scott Fitzgerald", year: 1925 },
  { title: "Brave New World", author: "Aldous Huxley", year: 1932 },
  { title: "The Hobbit", author: "J.R.R. Tolkien", year: 1937 },
];

const firstNameAuthors = books.filter(book => book.year > 1930)
  .sort((a, b) => b.year - a.year)
  .map(book => book.author.slice(book.author.lastIndexOf(" ") + 1))
  .join(", ");

console.log(firstNameAuthors);
// expected: Lee, Salinger, Orwell, Tolkien, Huxley

