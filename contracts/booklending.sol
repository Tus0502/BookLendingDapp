// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

contract BookLending {

    struct Book {
        string title;
        address borrower;
        bool isAvailable;
        string author;
    }

    mapping(uint => Book) public books;
    uint public bookCount = 0;

   function addBook(string memory _title,string memory _author) public {
        books[bookCount] = Book(_title,address(0), true,_author);
        bookCount++;
    }
    function borrowBook(uint _bookId) public {
        require(_bookId < bookCount, "Book does not exist");
        require(books[_bookId].isAvailable, "Book is not available");

        books[_bookId].borrower = msg.sender;
        books[_bookId].isAvailable = false;
    }

    function returnBook(uint _bookId) public {
        require(_bookId < bookCount, "Book does not exist");
        require(books[_bookId].borrower == msg.sender, "You did not borrow this book");

        books[_bookId].borrower = address(0);
        books[_bookId].isAvailable = true;
    }

    function getBook(uint _bookId) public view returns (string memory title, address borrower, bool isAvailable) {
        require(_bookId < bookCount, "Book does not exist");
        Book memory book = books[_bookId];
        return (book.title, book.borrower, book.isAvailable);
    }


       function updateBook(uint bookId,string memory _title) public  {
        Book memory book = books[bookId];
        book.title =_title;
        books[bookId]=book;
    }

}
