
async function fetchBooks(page = 1) {
    const response = await fetch(`https://gutendex.com/books?page=${page}`);
    const data = await response?.json();
    displayBooks(data?.results);
    setupPagination(data?.count, page);
}


function displayBooks(books) {
    const bookList = document.getElementById('book-list');
    bookList.innerHTML = ''; 
    books.forEach(book => {
        const bookItem = document.createElement('div');
        bookItem.className = 'book-item';
        bookItem.innerHTML = `<a href="/book-details.html">
            <img src=${book.formats["image/jpeg"]} />
            <h3>${book?.title}</h3>
            <p>${book?.authors?.map(author => author?.name)?.join(', ')}</p>
            <button class="wishlist-btn" data-id="${book?.id}">❤️</button>
            </a>
         
        `;
        bookList.appendChild(bookItem);
    });
    setupWishlistListeners();
}

function setupPagination(totalBooks, currentPage) {
    const pagination = document.getElementById('pagination');
    const totalPages = Math.ceil(totalBooks / 20);
    pagination.innerHTML = ''; 
    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.innerText = i;
        pageBtn.className = i === currentPage ? 'active' : '';
        pageBtn.addEventListener('click', () => fetchBooks(i));
        pagination.appendChild(pageBtn);
    }
}

function setupWishlistListeners() {
    const wishlistButtons = document.querySelectorAll('.wishlist-btn');
    wishlistButtons.forEach(button => {
        button.addEventListener('click', () => {
            const bookId = button.getAttribute('data-id');
            toggleWishlist(bookId);
            button.classList.toggle('liked');
        });
    });
}

function toggleWishlist(bookId) {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    if (wishlist.includes(bookId)) {
        localStorage.setItem('wishlist', JSON.stringify(wishlist.filter(id => id !== bookId)));
    } else {
        wishlist.push(bookId);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }
}

document.getElementById('search-bar').addEventListener('input', filterBooks);
document.getElementById('genre-filter').addEventListener('change', filterBooks);

function filterBooks() {
    const searchText = document.getElementById('search-bar').value.toLowerCase();
    const genre = document.getElementById('genre-filter').value;
    
    const filteredBooks = books.filter(book => 
        book.title.toLowerCase().includes(searchText) && 
        (genre === "" || book.genre === genre)
    );

    displayedBooks(filteredBooks);
}
function displayedBooks(filteredBooks) {
    const bookList = document.getElementById('book-list');
    bookList.innerHTML = filteredBooks.map(book => `<p>${book.title} - ${book.genre}</p>`).join('');
}

fetchBooks();
