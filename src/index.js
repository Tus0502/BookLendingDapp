let web3;
let contract;
let account;

const contractAddress = '0x316557af747ddC1775de72A1255Cd699b6bd05a5';
const contractABI = [
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "books",
    "outputs": [
      {
        "name": "title",
        "type": "string"
      },
      {
        "name": "borrower",
        "type": "address"
      },
      {
        "name": "isAvailable",
        "type": "bool"
      },
      {
        "name": "author",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x68744046"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "bookCount",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0xb905ad78"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_title",
        "type": "string"
      },
      {
        "name": "_author",
        "type": "string"
      }
    ],
    "name": "addBook",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0xd8a7233e"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_bookId",
        "type": "uint256"
      }
    ],
    "name": "borrowBook",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x7e490a9e"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_bookId",
        "type": "uint256"
      }
    ],
    "name": "returnBook",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0xca5140c9"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_bookId",
        "type": "uint256"
      }
    ],
    "name": "getBook",
    "outputs": [
      {
        "name": "title",
        "type": "string"
      },
      {
        "name": "borrower",
        "type": "address"
      },
      {
        "name": "isAvailable",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0xe0ff5b8b"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "bookId",
        "type": "uint256"
      },
      {
        "name": "_title",
        "type": "string"
      }
    ],
    "name": "updateBook",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x51585695"
  }
  
];



window.addEventListener('load', async () => {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    try {
      await window.ethereum.enable();
      const accounts = await web3.eth.getAccounts();
      account = accounts[0];
      document.getElementById('user-address').innerText = `Connected: ${account}`;
      contract = new web3.eth.Contract(contractABI, contractAddress);
      // Initial data loading can be done here
      viewBooks();
    } catch (error) {
      console.error("User denied account access", error);
    }
  } else {
    console.log("Non-Ethereum browser detected. You should consider trying MetaMask!");
  }
});

const connectWallet = async () => {
  if (window.ethereum) {
    try {
      await window.ethereum.enable();
      const accounts = await web3.eth.getAccounts();
      account = accounts[0];
      document.getElementById('user-address').innerText = `Connected: ${account}`;
      contract = new web3.eth.Contract(contractABI, contractAddress);
      // Initial data loading can be done here
    } catch (error) {
      console.error("User denied account access", error);
    }
  } else {
    console.log("Non-Ethereum browser detected. You should consider trying MetaMask!");
  }
};



/*const addBook = async () => {
  if (contract && account) {
    await contract.methods.addBook("Cloud Computing").send({ from: account });
    viewReservations();
  }
};*/

const addBook = async () => {
  if (contract && account) {
    const bookTitle = document.getElementById('bookTitle').value;  // Get the value from the input field
    const author = document.getElementById('author').value;  // Get the value from the input field

      await contract.methods.addBook(bookTitle,author).send({ from: account });
      viewBooks(); // Refresh the book list
      alert(`Book titled "${bookTitle}" added successfully!`);
    }


  
};

const viewBooks = async () => {
  //console.log("In function");

  // Load the total task count from the blockchain
  const bookCount = await contract.methods.bookCount.call().call();

  // Render out each task with a new task template
  document.getElementById("tablebooks").innerHTML= 
  "<tr><th>Book ID </th><th>Book Title </th><th>Book Author</th><th>Borrower</th><th>Book Availability</th></tr>";

  for (var i = 0; i < bookCount; i++) {
    const book = await contract.methods.books(i).call();



  
      document.getElementById("tablebooks").innerHTML+= "<tr><td>"+i+"</td><td>"+book.title+"</td><td>"+book.author+"</td><td>"+book.borrower+"</td><td>"+book.isAvailable+"</td></tr>"; 
    
  }
}


// Function to borrow a book
const borrowBook = async () => {
  const bookidborrow = document.getElementById('bookidborrow').value;  // Get the value from the input field

  if (contract && account) {
    
    try {
      
      await contract.methods.borrowBook(bookidborrow).send({ from: account });
      viewBooks(); // Refresh the book list
    } catch (error) {
      console.error("Error borrowing book:", error);
    }
  }
};


// Function to return book
const returnBook = async () => {
  const bookIDreturn = document.getElementById('bookIDreturn').value;  // Get the value from the input field

  if (contract && account) {
    try {
      await contract.methods.returnBook(bookIDreturn).send({ from: account });
      viewBooks();
    }
    catch (error) {
      console.error("Error Returning Book", error);
    }
  }
};

// Function to update  book
const updateBook = async () => {
  if (contract && account) {
    const bookTitleUpdate = document.getElementById('bookTitleUpdate').value;  // Get the value from the input field
    const bookIdUpdate = document.getElementById('bookIdUpdate').value;  // Get the value from the input field
  
      await contract.methods.updateBook(bookIdUpdate,bookTitleUpdate).send({ from: account });
      viewBooks();  // Assuming this function updates the list of books or reservations
      alert(" Book was  updated successfully!");
    
  }
};