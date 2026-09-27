/* =========================================
   NEXORA PRODUCT DATA
========================================= */

const products = [
const products = [

    // ================= ELECTRONICS =================

    {
        id: 1,
        name: "Nova Wireless Headphones",
        category: "Electronics",
        price: 2499,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 5,
        name: "Premium Camera",
        category: "Electronics",
        price: 45999,
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 9,
        name: "Nexora Pro Laptop",
        category: "Electronics",
        price: 54999,
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 10,
        name: "Ultra HD Smart TV",
        category: "Electronics",
        price: 42999,
        image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 11,
        name: "Nexora Wireless Speaker",
        category: "Electronics",
        price: 3499,
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 12,
        name: "Smartphone X Pro",
        category: "Electronics",
        price: 32999,
        image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 13,
        name: "Mechanical Gaming Keyboard",
        category: "Electronics",
        price: 2999,
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=700&q=80"
    },


    // ================= FASHION =================

    {
        id: 3,
        name: "Minimal Leather Bag",
        category: "Fashion",
        price: 1899,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 4,
        name: "Modern Sneakers",
        category: "Fashion",
        price: 2799,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 8,
        name: "Classic Backpack",
        category: "Fashion",
        price: 1699,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=80"
    },


    // ================= ACCESSORIES =================

    {
        id: 2,
        name: "Urban Smart Watch",
        category: "Accessories",
        price: 3299,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 6,
        name: "Aero Sunglasses",
        category: "Accessories",
        price: 1499,
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=700&q=80"
    },


    // ================= HOME =================

    {
        id: 7,
        name: "Modern Table Lamp",
        category: "Home",
        price: 1199,
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=700&q=80"
    }

];


/* =========================================
   VARIABLES
========================================= */

let cart = [];

let wishlist = [];

let currentFilter = "All";


/* =========================================
   DOM ELEMENTS
========================================= */

const productGrid =
    document.getElementById("productGrid");

const cartSidebar =
    document.getElementById("cartSidebar");

const cartItems =
    document.getElementById("cartItems");

const cartTotal =
    document.getElementById("cartTotal");

const cartCount =
    document.getElementById("cartCount");

const wishlistCount =
    document.getElementById("wishlistCount");

const overlay =
    document.getElementById("overlay");

const toast =
    document.getElementById("toast");

const searchBox =
    document.getElementById("searchBox");

const searchInput =
    document.getElementById("searchInput");


/* =========================================
   DISPLAY PRODUCTS
========================================= */

function displayProducts(list = products) {

    productGrid.innerHTML = "";

    if (list.length === 0) {

        productGrid.innerHTML = `
            <div style="
                grid-column:1/-1;
                text-align:center;
                padding:60px;
                color:var(--muted);
            ">
                <h3>No products found</h3>
                <p>Try another search.</p>
            </div>
        `;

        return;
    }


    list.forEach(product => {

        const isLiked =
            wishlist.includes(product.id);

        const card = document.createElement("article");

        card.className = "product-card";

        card.innerHTML = `

            <div class="product-image">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

                <button
                    class="wishlist ${isLiked ? "active" : ""}"
                    onclick="toggleWishlist(${product.id})"
                >

                    <i class="${isLiked
                        ? "fa-solid"
                        : "fa-regular"} fa-heart">
                    </i>

                </button>

            </div>

            <div class="product-info">

                <span class="product-category">
                    ${product.category}
                </span>

                <h3>
                    ${product.name}
                </h3>

                <div class="product-bottom">

                    <strong class="price">
                        ₹${product.price.toLocaleString("en-IN")}
                    </strong>

                    <button
                        class="add-cart"
                        onclick="addToCart(${product.id})"
                    >
                        <i class="fa-solid fa-plus"></i>
                    </button>

                </div>

            </div>
        `;

        productGrid.appendChild(card);

    });

}


/* =========================================
   ADD TO CART
========================================= */

function addToCart(id) {

    const product =
        products.find(item => item.id === id);

    if (!product) return;

    const existing =
        cart.find(item => item.id === id);

    if (existing) {

        existing.quantity++;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }

    updateCart();

    showToast(
        `${product.name} added to cart`
    );

}


/* =========================================
   UPDATE CART
========================================= */

function updateCart() {

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <i class="fa-solid fa-bag-shopping"></i>

                <h3>Your cart is empty</h3>

                <p>Add something you love.</p>

            </div>

        `;

    } else {

        cart.forEach(item => {

            const div =
                document.createElement("div");

            div.className = "cart-item";

            div.innerHTML = `

                <img
                    src="${item.image}"
                    alt="${item.name}"
                >

                <div class="cart-item-info">

                    <h4>
                        ${item.name}
                    </h4>

                    <p>
                        ₹${item.price.toLocaleString("en-IN")}
                        × ${item.quantity}
                    </p>

                </div>

                <button
                    class="remove-item"
                    onclick="removeFromCart(${item.id})"
                >
                    <i class="fa-solid fa-trash"></i>
                </button>

            `;

            cartItems.appendChild(div);

        });

    }


    const total =
        cart.reduce(
            (sum, item) =>
                sum + item.price * item.quantity,
            0
        );


    const quantity =
        cart.reduce(
            (sum, item) =>
                sum + item.quantity,
            0
        );


    cartTotal.textContent =
        `₹${total.toLocaleString("en-IN")}`;

    cartCount.textContent =
        quantity;

}


/* =========================================
   REMOVE FROM CART
========================================= */

function removeFromCart(id) {

    cart =
        cart.filter(item => item.id !== id);

    updateCart();

}


/* =========================================
   WISHLIST
========================================= */

function toggleWishlist(id) {

    if (wishlist.includes(id)) {

        wishlist =
            wishlist.filter(item => item !== id);

        showToast("Removed from wishlist");

    } else {

        wishlist.push(id);

        showToast("Added to wishlist");

    }

    wishlistCount.textContent =
        wishlist.length;

    displayProducts(
        getFilteredProducts()
    );

}


/* =========================================
   FILTER PRODUCTS
========================================= */

function getFilteredProducts() {

    if (currentFilter === "All") {

        return products;

    }

    return products.filter(
        product =>
            product.category === currentFilter
    );

}


document.querySelectorAll(".filter")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(".filter")
                    .forEach(btn =>
                        btn.classList.remove("active")
                    );

                button.classList.add("active");

                currentFilter =
                    button.dataset.filter;

                displayProducts(
                    getFilteredProducts()
                );

            }
        );

    });


/* =========================================
   CATEGORY BUTTONS
========================================= */

document.querySelectorAll(".category-card")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                currentFilter =
                    button.dataset.category;

                document
                    .querySelectorAll(".filter")
                    .forEach(filter => {

                        filter.classList.toggle(
                            "active",
                            filter.dataset.filter ===
                            currentFilter
                        );

                    });

                displayProducts(
                    getFilteredProducts()
                );

                document
                    .getElementById("products")
                    .scrollIntoView({
                        behavior: "smooth"
                    });

            }
        );

    });


/* =========================================
   SEARCH
========================================= */

searchInput.addEventListener(
    "input",
    () => {

        const search =
            searchInput.value
                .toLowerCase()
                .trim();

        const filtered =
            products.filter(product =>

                product.name
                    .toLowerCase()
                    .includes(search)

                ||

                product.category
                    .toLowerCase()
                    .includes(search)

            );

        displayProducts(filtered);

    }
);


/* =========================================
   SEARCH BUTTON
========================================= */

document
    .getElementById("searchBtn")
    .addEventListener(
        "click",
        () => {

            searchBox.classList.toggle(
                "active"
            );

            if (
                searchBox.classList.contains(
                    "active"
                )
            ) {

                searchInput.focus();

            }

        }
    );


/* =========================================
   CART OPEN / CLOSE
========================================= */

document
    .getElementById("cartBtn")
    .addEventListener(
        "click",
        openCart
    );


document
    .getElementById("closeCart")
    .addEventListener(
        "click",
        closeCart
    );


overlay.addEventListener(
    "click",
    closeCart
);


function openCart() {

    cartSidebar.classList.add("active");

    overlay.classList.add("active");

}


function closeCart() {

    cartSidebar.classList.remove("active");

    overlay.classList.remove("active");

}


/* =========================================
   WISHLIST BUTTON
========================================= */

document
    .getElementById("wishlistBtn")
    .addEventListener(
        "click",
        () => {

            if (wishlist.length === 0) {

                showToast(
                    "Your wishlist is empty"
                );

                return;

            }

            const wishlistProducts =
                products.filter(product =>
                    wishlist.includes(product.id)
                );

            displayProducts(
                wishlistProducts
            );

            document
                .getElementById("products")
                .scrollIntoView({
                    behavior: "smooth"
                });

        }
    );


/* =========================================
   DARK MODE
========================================= */

const themeBtn =
    document.getElementById("themeBtn");


themeBtn.addEventListener(
    "click",
    () => {

        document.body.classList.toggle("dark");

        const icon =
            themeBtn.querySelector("i");

        if (
            document.body.classList.contains("dark")
        ) {

            icon.className =
                "fa-solid fa-sun";

            localStorage.setItem(
                "nexoraTheme",
                "dark"
            );

        } else {

            icon.className =
                "fa-solid fa-moon";

            localStorage.setItem(
                "nexoraTheme",
                "light"
            );

        }

    }
);


if (
    localStorage.getItem("nexoraTheme")
    === "dark"
) {

    document.body.classList.add("dark");

    themeBtn.querySelector("i").className =
        "fa-solid fa-sun";

}


/* =========================================
   MOBILE MENU
========================================= */

const menuBtn =
    document.getElementById("menuBtn");

const navMenu =
    document.getElementById("navMenu");


menuBtn.addEventListener(
    "click",
    () => {

        navMenu.classList.toggle("active");

        const icon =
            menuBtn.querySelector("i");

        icon.className =
            navMenu.classList.contains("active")
                ? "fa-solid fa-xmark"
                : "fa-solid fa-bars";

    }
);


/* =========================================
   NEWSLETTER
========================================= */

document
    .getElementById("newsletterForm")
    .addEventListener(
        "submit",
        event => {

            event.preventDefault();

            showToast(
                "You're subscribed to Nexora!"
            );

            event.target.reset();

        }
    );


/* =========================================
   CHECKOUT
========================================= */

const checkoutModal =
    document.getElementById("checkoutModal");


document
    .getElementById("checkoutBtn")
    .addEventListener(
        "click",
        () => {

            if (cart.length === 0) {

                showToast(
                    "Your cart is empty"
                );

                return;

            }

            checkoutModal.classList.add("active");

        }
    );


document
    .getElementById("closeModal")
    .addEventListener(
        "click",
        () => {

            checkoutModal.classList.remove(
                "active"
            );

        }
    );


document
    .getElementById("checkoutForm")
    .addEventListener(
        "submit",
        event => {

            event.preventDefault();

            checkoutModal.classList.remove(
                "active"
            );

            cart = [];

            updateCart();

            closeCart();

            showToast(
                "Order placed successfully! 🎉"
            );

            event.target.reset();

        }
    );


/* =========================================
   TOAST
========================================= */

let toastTimer;

function showToast(message) {

    toast.textContent =
        message;

    toast.classList.add("active");

    clearTimeout(toastTimer);

    toastTimer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "active"
                );

            },
            2500
        );

}


/* =========================================
   SCROLL TO PRODUCTS
========================================= */

function scrollToProducts() {

    document
        .getElementById("products")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* =========================================
   INITIALIZE
========================================= */

displayProducts();

updateCart();
