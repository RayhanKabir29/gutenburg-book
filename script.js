
const url = 'https://gutendex.com/books';
async function fetchBooks() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const books = data?.results;
        console.log(data);
        displayBooks(books);

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


const displayBooks = books =>{
     console.log(books);
    const bookContainer = document.getElementById('book-grid')
    books.forEach(book => {
         console.log(book.id);
        const bookCard = document.createElement('div');
        bookCard.className=`book-card`;
        bookCard.innerHTML=`
                <h3>${book.title}</h3>
                <p>Author: ${book.id}</p>
                <p>Summary of the book goes here.</p>`;
                bookContainer.appendChild(bookCard);
    });
}
fetchBooks();

