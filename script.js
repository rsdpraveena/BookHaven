document.addEventListener('DOMContentLoaded', function() {
    // Sample book data
    const books = [
        {
            id: 1,
            title: "The Silent Patient",
            author: "Alex Michaelides",
            price:1299,
            category: "fiction",
            rating: 4,
            description: "A psychological thriller about a woman who shoots her husband and then stops speaking.",
            image: "https://covers.openlibrary.org/b/isbn/1250301696-L.jpg" // The Silent Patient
        },
        {
            id: 2,
            title: "Educated",
            author: "Tara Westover",
            price:1495,
            category: "nonfiction",
            rating: 5,
            description: "A memoir about a woman who leaves her survivalist family and goes on to earn a PhD from Cambridge University.",
            image: "https://covers.openlibrary.org/b/isbn/0399590501-L.jpg" // Educated
        },
        {
            id: 3,
            title: "Dune",
            author: "Frank Herbert",
            price:999,
            category: "scifi",
            rating: 5,
            description: "A science fiction classic about politics, religion, and man's relationship to nature on a desert planet.",
            image: "https://covers.openlibrary.org/b/isbn/0441172717-L.jpg" // Dune
        },
        {
            id: 4,
            title: "The Hobbit",
            author: "J.R.R. Tolkien",
            price: 1149,
            category: "fantasy",
            rating: 5,
            description: "A fantasy novel about the adventures of hobbit Bilbo Baggins as he assists a group of dwarves.",
            image: "https://covers.openlibrary.org/b/isbn/054792822X-L.jpg" // The Hobbit
        },
        {
            id: 5,
            title: "Becoming",
            author: "Michelle Obama",
            price: 1799,
            category: "biography",
            rating: 4,
            description: "A memoir by the former First Lady of the United States, Michelle Obama.",
            image: "https://covers.openlibrary.org/b/isbn/1524763136-L.jpg" // Becoming
        },
        {
            id: 6,
            title: "The Martian",
            author: "Andy Weir",
            price: 899,
            category: "scifi",
            rating: 4,
            description: "A science fiction novel about an astronaut stranded on Mars who must find a way to survive.",
            image: "https://covers.openlibrary.org/b/isbn/0553418025-L.jpg" // The Martian
        },
        {
            id: 7,
            title: "Where the Crawdads Sing",
            author: "Delia Owens",
            price: 1349,
            category: "fiction",
            rating: 4,
            description: "A novel about an abandoned girl who raises herself in the marshes of North Carolina.",
            image: "https://covers.openlibrary.org/b/isbn/0735219095-L.jpg" // Where the Crawdads Sing
        },
        {
            id: 8,
            title: "Atomic Habits",
            author: "James Clear",
            price: 1699,
            category: "nonfiction",
            rating: 5,
            description: "A guide to building good habits and breaking bad ones through small changes.",
            image: "https://covers.openlibrary.org/b/isbn/0735211299-L.jpg" // Atomic Habits
        }
    ];

    // Cart functionality
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // DOM elements
    const productsGrid = document.getElementById('productsGrid');
    const cartButton = document.getElementById('cartButton');
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const proceedToPayment = document.getElementById('proceedToPayment');
    const priceRange = document.getElementById('priceRange');
    const minPriceDisplay = document.getElementById('minPrice');
    const maxPriceDisplay = document.getElementById('maxPrice');
    const applyFilters = document.getElementById('applyFilters');
    
    // Initialize the page
    displayBooks(books);
    updateCartCount();
    
    // Event listeners
    cartButton.addEventListener('click', function() {
        const cartOffcanvas = new bootstrap.Offcanvas(document.getElementById('cartOffcanvas'));
        cartOffcanvas.show();
        displayCartItems();
    });
    
    proceedToPayment.addEventListener('click', function() {
        alert('Proceeding to payment would happen here in a real implementation.');
    });
    
    // Price range filter
    priceRange.addEventListener('input', function() {
        const value = this.value;
        minPriceDisplay.textContent = 0;
        maxPriceDisplay.textContent = value;
    });
    
    // Apply filters
    applyFilters.addEventListener('click', function() {
        const maxPrice = parseInt(maxPriceDisplay.textContent);
        const selectedCategories = [];
        const selectedRatings = [];
        
        
        // Get selected categories
        document.querySelectorAll('input[type="checkbox"][id^="rating"]:checked').forEach(checkbox => {
            selectedRatings.push(parseInt(checkbox.id.replace('rating', '')));
        });
        
        
        document.querySelectorAll('input[type="checkbox"]:not([id^="rating"]):checked').forEach(checkbox => {
            selectedCategories.push(checkbox.id);
        });
        
        // Filter books
        const filteredBooks = books.filter(book => {
            const priceMatch = book.price <= maxPrice;
            const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(book.category);
            const ratingMatch = selectedRatings.length === 0 || selectedRatings.includes(book.rating);
            
            return priceMatch && categoryMatch && ratingMatch;
        });
        
        displayBooks(filteredBooks);
    });
    
    const searchInput = document.getElementById('searchInput');
const searchForm = searchInput.closest('form');

searchForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const query = searchInput.value.toLowerCase().trim();

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.description.toLowerCase().includes(query)
    );

    displayBooks(filteredBooks);
});

    // Display books
    function displayBooks(booksToDisplay) {
        productsGrid.innerHTML = '';
    
        if (booksToDisplay.length === 0) {
            productsGrid.innerHTML = '<div class="col-12"><p class="text-center text-muted">No books match your filters.</p></div>';
            return;
        }
    
        booksToDisplay.forEach(book => {
            const bookCard = document.createElement('div');
            bookCard.className = 'col-md-4 col-sm-6 mb-4';
            bookCard.innerHTML = `
                <div class="card h-100">
                    <img src="${book.image}" class="card-img-top" alt="${book.title}">
                    <div class="card-body d-flex flex-column justify-content-between">
                        <div>
                            <h5 class="card-title">${book.title}</h5>
                            <p class="card-text">${book.description}</p>
                        </div>
                        <div class="text-center mt-auto">
                            <span class="price d-block mb-3">₹${book.price.toFixed(2)}</span>
                            <div class="d-flex justify-content-center">
                                <button class="btn btn-add-to-cart btn-icon-text" data-id="${book.id}">
                                    <i class="fas fa-cart-plus me-2"></i> Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            productsGrid.appendChild(bookCard);
        });
    
        // Add event listeners to all "Add to Cart" buttons
        document.querySelectorAll('.btn-add-to-cart').forEach(button => {
            button.addEventListener('click', function () {
                const bookId = parseInt(this.getAttribute('data-id'));
                addToCart(bookId);
            });
        });
    }
    
    
    
    
    // Add to cart
    function addToCart(bookId) {
        const book = books.find(b => b.id === bookId);
        if (!book) return;
        
        const existingItem = cart.find(item => item.id === bookId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: book.id,
                title: book.title,
                price: book.price,
                image: book.image,
                quantity: 1
            });
        }
        
        updateCartCount();
        displayCartItems();
        saveCartToLocalStorage();
        
        // Show a quick notification
        const notification = document.createElement('div');
        notification.className = 'position-fixed bottom-0 end-0 p-3';
        notification.innerHTML = `
            <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header bg-success text-white">
                    <strong class="me-auto">Added to Cart</strong>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body">
                    ${book.title} has been added to your cart.
                </div>
            </div>
        `;
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
    
    // Update cart count
    function updateCartCount() {
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = count;
    }
    
    // Display cart items
    function displayCartItems() {
        if (cart.length === 0) {
            cartItems.innerHTML = '<p class="text-muted">Your cart is empty</p>';
            cartTotal.textContent = '₹0.00';
            proceedToPayment.disabled = true;
            return;
        }
        
        cartItems.innerHTML = '';
        let total = 0;
        cart = cart.filter(item => item && item.id && !isNaN(item.price) && item.quantity > 0);
        cart.forEach(item => {
            const itemTotal = (!isNaN(item.price) && !isNaN(item.quantity)) ? item.price * item.quantity : 0;

            total += itemTotal;
            
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}" class="cart-item-img">
                <div class="cart-item-details">
                    <h6 class="cart-item-title">${item.title}</h6>
                    <div class="cart-item-price">₹${itemTotal.toFixed(2)}</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn minus" data-id="${item.id}">-</button>
                        <input type="text" class="quantity-input" value="${item.quantity}" readonly>
                        <button class="quantity-btn plus" data-id="${item.id}">+</button>
                        <span class="remove-item" data-id="${item.id}">
                            <i class="fas fa-trash"></i>
                        </span>
                    </div>
                </div>
            `;
            cartItems.appendChild(cartItem);
        });
        
        cartTotal.textContent = `₹${total.toFixed(2)}`;
        proceedToPayment.disabled = false;
        
        // Add event listeners to quantity buttons
        document.querySelectorAll('.quantity-btn.minus').forEach(button => {
            button.addEventListener('click', function() {
                const itemId = parseInt(this.getAttribute('data-id'));
                updateCartItemQuantity(itemId, -1);
            });
        });
        
        document.querySelectorAll('.quantity-btn.plus').forEach(button => {
            button.addEventListener('click', function() {
                const itemId = parseInt(this.getAttribute('data-id'));
                updateCartItemQuantity(itemId, 1);
            });
        });
        
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', function() {
                const itemId = parseInt(this.getAttribute('data-id'));
                removeFromCart(itemId);
            });
        });
    }
    
    // Update cart item quantity
    function updateCartItemQuantity(itemId, change) {
        const itemIndex = cart.findIndex(item => item.id === itemId);
        if (itemIndex === -1) return;
        
        cart[itemIndex].quantity += change;
        
        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1);
        }
        
        updateCartCount();
        displayCartItems();
        saveCartToLocalStorage();
    }
    
    // Remove from cart
    function removeFromCart(itemId) {
        cart = cart.filter(item => item.id !== itemId);
        updateCartCount();
        displayCartItems();
        saveCartToLocalStorage();
    }
    
    // Save cart to localStorage
    function saveCartToLocalStorage() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    
    // Login form submission
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        // In a real app, you would validate and send to server here
        alert(`Login attempt with email: ${email}`);
        
        // Close the modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
        modal.hide();
    });
    // Register form submission
document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    // Simulate saving the user
    alert(`Registration successful!\nName: ${name}\nEmail: ${email}`);

    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
    modal.hide();
});

// Show register modal from login modal
document.getElementById('showRegister').addEventListener('click', function(e) {
    e.preventDefault();
    const loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
    loginModal.hide();

    const registerModal = new bootstrap.Modal(document.getElementById('registerModal'));
    registerModal.show();
});

// Show login modal from register modal
document.getElementById('showLogin').addEventListener('click', function(e) {
    e.preventDefault();
    const registerModal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
    registerModal.hide();

    const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
    loginModal.show();
});

    // Show register link
    //document.getElementById('showRegister').addEventListener('click', function(e) {
       // e.preventDefault();
       // alert('Registration form would appear here in a real implementation.');
    //});
});