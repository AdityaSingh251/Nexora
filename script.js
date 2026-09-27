/* ==========================================
PRODUCT DATA
========================================== */

const products = [

```
{
    id: 1,
    name: "Premium Hoodie",
    category: "fashion",
    price: 1499,
    icon: "🧥",
    rating: 4.8
},

{
    id: 2,
    name: "Wireless Headphones",
    category: "electronics",
    price: 2499,
    icon: "🎧",
    rating: 4.7
},

{
    id: 3,
    name: "Smart Watch",
    category: "accessories",
    price: 3299,
    icon: "⌚",
    rating: 4.6
},

{
    id: 4,
    name: "Running Shoes",
    category: "fashion",
    price: 2199,
    icon: "👟",
    rating: 4.9
},

{
    id: 5,
    name: "Smartphone",
    category: "electronics",
    price: 18999,
    icon: "📱",
    rating: 4.8
},

{
    id: 6,
    name: "Minimal Lamp",
    category: "home",
    price: 899,
    icon: "💡",
    rating: 4.5
},

{
    id: 7,
    name: "Leather Backpack",
    category: "accessories",
    price: 1799,
    icon: "🎒",
    rating: 4.7
},

{
    id: 8,
    name: "Coffee Maker",
    category: "home",
    price: 3499,
    icon: "☕",
    rating: 4.6
}
```

];

/* ==========================================
VARIABLES
========================================== */

let cart = [];

const productsGrid =
document.getElementById("productsGrid");

const cartItems =
document.getElementById("cartItems");

const cartCount =
document.getElementById("cartCount");

const cartTotal =
document.getElementById("cartTotal");

const searchInput =
document.getElementById("searchInput");

const categoryFilter =
document.getElementById("categoryFilter");

/* ==========================================
DISPLAY PRODUCTS
========================================== */

function displayProducts(list = products) {

```
productsGrid.innerHTML = "";

if (list.length === 0) {

    productsGrid.innerHTML = `
        <p style="grid-column:1/-1;text-align:center;padding:50px">
            No products found.
        </p>
    `;

    return;
}


list.forEach(product => {

    const card = document.createElement("div");

    card.className = "product-card";

    card.innerHTML = `

        <button
            class="wishlist"
            onclick="toggleWishlist(this)"
        >
            <i class="fa-regular fa-heart"></i>
        </button>

        <div class="product-image">
            ${product.icon}
        </div>

        <div class="product-info">

            <span class="product-category">
                ${product.category}
            </span>

            <h3>
                ${product.name}
            </h3>

            <div class="rating">
                ★★★★★
                <span>
                    ${product.rating}
                </span>
            </div>

            <div class="price-row">

                <span class="price">
                    ₹${product.price.toLocaleString()}
                </span>

                <button
                    class="add-cart"
                    onclick="addToCart(${product.id})"
                >
                    <i class="fa-solid fa-plus"></i>
                </button>

            </div>

        </div>
    `;

    productsGrid.appendChild(card);

});
```

}

/* ==========================================
ADD TO CART
========================================== */

function addToCart(id) {

```
const existing =
    cart.find(item => item.id === id);

if (existing) {

    existing.quantity++;

} else {

    const product =
        products.find(item => item.id === id);

    cart.push({
        ...product,
        quantity: 1
    });

}

updateCart();

showToast("Product added to cart 🛒");
```

}

/* ==========================================
UPDATE CART
========================================== */

function updateCart() {

```
cartItems.innerHTML = "";

let totalItems = 0;
let totalPrice = 0;


if (cart.length === 0) {

    cartItems.innerHTML = `
        <p class="empty-cart">
            Your cart is empty.
        </p>
    `;

}


cart.forEach(item => {

    totalItems += item.quantity;

    totalPrice +=
        item.price * item.quantity;


    const div =
        document.createElement("div");

    div.className = "cart-item";

    div.innerHTML = `

        <div class="cart-item-image">
            ${item.icon}
        </div>

        <div class="cart-item-info">

            <h4>
                ${item.name}
            </h4>

            <div class="cart-item-price">
                ₹${item.price.toLocaleString()}
            </div>

            <div class="quantity">

                <button
                    onclick="changeQuantity(${item.id}, -1)"
                >
                    −
                </button>

                <span>
                    ${item.quantity}
                </span>

                <button
                    onclick="changeQuantity(${item.id}, 1)"
                >
                    +
                </button>

                <button
                    class="delete-item"
                    onclick="removeFromCart(${item.id})"
                >
                    <i class="fa-solid fa-trash"></i>
                </button>

            </div>

        </div>

    `;

    cartItems.appendChild(div);

});


cartCount.textContent = totalItems;

cartTotal.textContent =
    `₹${totalPrice.toLocaleString()}`;
```

}

/* ==========================================
CHANGE QUANTITY
========================================== */

function changeQuantity(id, change) {

```
const item =
    cart.find(product => product.id === id);

if (!item) return;

item.quantity += change;

if (item.quantity <= 0) {

    cart =
        cart.filter(product => product.id !== id);

}

updateCart();
```

}

/* ==========================================
REMOVE PRODUCT
========================================== */

function removeFromCart(id) {

```
cart =
    cart.filter(product => product.id !== id);

updateCart();
```

}

/* ==========================================
CART OPEN / CLOSE
========================================== */

const cartSidebar =
document.getElementById("cartSidebar");

const cartOverlay =
document.getElementById("cartOverlay");

const cartButton =
document.getElementById("cartButton");

const closeCart =
document.getElementById("closeCart");

cartButton.addEventListener("click", () => {

```
cartSidebar.classList.add("active");

cartOverlay.classList.add("active");
```

});

function closeCartSidebar() {

```
cartSidebar.classList.remove("active");

cartOverlay.classList.remove("active");
```

}

closeCart.addEventListener(
"click",
closeCartSidebar
);

cartOverlay.addEventListener(
"click",
closeCartSidebar
);

/* ==========================================
SEARCH
========================================== */

function filterProducts() {

```
const search =
    searchInput.value.toLowerCase();

const category =
    categoryFilter.value;


const filtered =
    products.filter(product => {

        const matchesSearch =
            product.name
                .toLowerCase()
                .includes(search);

        const matchesCategory =
            category === "all" ||
            product.category === category;

        return matchesSearch &&
               matchesCategory;

    });


displayProducts(filtered);
```

}

searchInput.addEventListener(
"input",
filterProducts
);

categoryFilter.addEventListener(
"change",
filterProducts
);

/* ==========================================
WISHLIST
========================================== */

function toggleWishlist(button) {

```
button.classList.toggle("active");

const icon =
    button.querySelector("i");

if (
    button.classList.contains("active")
) {

    icon.classList.remove(
        "fa-regular"
    );

    icon.classList.add(
        "fa-solid"
    );

} else {

    icon.classList.remove(
        "fa-solid"
    );

    icon.classList.add(
        "fa-regular"
    );

}
```

}

/* ==========================================
DARK MODE
========================================== */

const themeToggle =
document.getElementById("themeToggle");

themeToggle.addEventListener(
"click",
() => {

```
    document.body.classList.toggle("dark");

    const icon =
        themeToggle.querySelector("i");


    if (
        document.body.classList.contains("dark")
    ) {

        icon.classList.remove(
            "fa-moon"
        );

        icon.classList.add(
            "fa-sun"
        );

        localStorage.setItem(
            "theme",
            "dark"
        );

    } else {

        icon.classList.remove(
            "fa-sun"
        );

        icon.classList.add(
            "fa-moon"
        );

        localStorage.setItem(
            "theme",
            "light"
        );

    }

}
```

);

/* ==========================================
LOAD THEME
========================================== */

if (
localStorage.getItem("theme") === "dark"
) {

```
document.body.classList.add("dark");

themeToggle.querySelector("i")
    .classList.replace(
        "fa-moon",
        "fa-sun"
    );
```

}

/* ==========================================
MOBILE MENU
========================================== */

const menuBtn =
document.getElementById("menuBtn");

const navbar =
document.getElementById("navbar");

menuBtn.addEventListener(
"click",
() => {

```
    navbar.classList.toggle("active");

    const icon =
        menuBtn.querySelector("i");

    icon.classList.toggle(
        "fa-bars"
    );

    icon.classList.toggle(
        "fa-xmark"
    );

}
```

);

/* ==========================================
TOAST
========================================== */

function showToast(message) {

```
const toast =
    document.getElementById("toast");

toast.textContent = message;

toast.classList.add("show");


setTimeout(() => {

    toast.classList.remove("show");

}, 2500);
```

}

/* ==========================================
NEWSLETTER
========================================== */

const newsletterForm =
document.getElementById(
"newsletterForm"
);

newsletterForm.addEventListener(
"submit",
function(event) {

```
    event.preventDefault();

    const email =
        document.getElementById(
            "emailInput"
        ).value;

    if (email) {

        showToast(
            "Successfully subscribed! 🎉"
        );

        newsletterForm.reset();

    }

}
```

);

/* ==========================================
CHECKOUT
========================================== */

const checkoutModal =
document.getElementById(
"checkoutModal"
);

const checkoutBtn =
document.getElementById(
"checkoutBtn"
);

const closeModal =
document.getElementById(
"closeModal"
);

checkoutBtn.addEventListener(
"click",
() => {

```
    if (cart.length === 0) {

        showToast(
            "Your cart is empty!"
        );

        return;

    }

    checkoutModal.classList.add(
        "active"
    );

}
```

);

closeModal.addEventListener(
"click",
() => {

```
    checkoutModal.classList.remove(
        "active"
    );

}
```

);

document.getElementById(
"checkoutForm"
).addEventListener(
"submit",
function(event) {

```
    event.preventDefault();

    checkoutModal.classList.remove(
        "active"
    );

    closeCartSidebar();

    showToast(
        "Order placed successfully! 🎉"
    );

    cart = [];

    updateCart();

    this.reset();

}
```

);

/* ==========================================
INITIALIZE
========================================== */

displayProducts();

updateCart();
