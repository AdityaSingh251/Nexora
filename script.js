/* =========================================
PRODUCT DATABASE
========================================= */

const products = [

```
{
    id: 1,
    name: "Midnight Street Hoodie",
    category: "fashion",
    price: 1499,
    oldPrice: 2499,
    icon: "🧥",
    rating: "4.9",
    sale: "40% OFF",
    description:
        "Premium heavyweight hoodie designed for everyday comfort and effortless street style."
},

{
    id: 2,
    name: "Aero Wireless Pro",
    category: "electronics",
    price: 2999,
    oldPrice: 4999,
    icon: "🎧",
    rating: "4.8",
    sale: "40% OFF",
    description:
        "Immersive wireless headphones with powerful sound and an ultra-comfortable fit."
},

{
    id: 3,
    name: "Nova Smart Watch",
    category: "electronics",
    price: 3999,
    oldPrice: 5999,
    icon: "⌚",
    rating: "4.7",
    sale: "33% OFF",
    description:
        "A sleek smartwatch built to keep your day organized, active and connected."
},

{
    id: 4,
    name: "Cloud Runner X",
    category: "fashion",
    price: 2499,
    oldPrice: 3999,
    icon: "👟",
    rating: "4.9",
    sale: "38% OFF",
    description:
        "Lightweight everyday sneakers engineered for comfort and modern style."
},

{
    id: 5,
    name: "Glow Skin Set",
    category: "beauty",
    price: 1299,
    oldPrice: 1999,
    icon: "✨",
    rating: "4.8",
    sale: "35% OFF",
    description:
        "A carefully selected skincare set designed for a fresh and natural glow."
},

{
    id: 6,
    name: "Aura Table Lamp",
    category: "home",
    price: 999,
    oldPrice: 1499,
    icon: "💡",
    rating: "4.6",
    sale: "33% OFF",
    description:
        "Minimal ambient lighting designed to add warmth and character to your space."
},

{
    id: 7,
    name: "Urban Carry Backpack",
    category: "fashion",
    price: 1899,
    oldPrice: 2999,
    icon: "🎒",
    rating: "4.8",
    sale: "37% OFF",
    description:
        "A sleek everyday backpack with smart storage for work, travel and life."
},

{
    id: 8,
    name: "Brew Master Coffee Kit",
    category: "home",
    price: 2199,
    oldPrice: 3499,
    icon: "☕",
    rating: "4.7",
    sale: "37% OFF",
    description:
        "Everything you need to turn your daily coffee ritual into a premium experience."
}
```

];

/* =========================================
STATE
========================================= */

let cart = [];

let currentProduct = null;

/* =========================================
ELEMENTS
========================================= */

const productsGrid =
document.getElementById("productsGrid");

const cartCount =
document.getElementById("cartCount");

const cartItems =
document.getElementById("cartItems");

const cartTotal =
document.getElementById("cartTotal");

const cartDrawer =
document.getElementById("cartDrawer");

const overlay =
document.getElementById("overlay");

const quickView =
document.getElementById("quickView");

const toast =
document.getElementById("toast");

/* =========================================
RENDER PRODUCTS
========================================= */

function renderProducts(list = products) {

```
productsGrid.innerHTML = "";


if (list.length === 0) {

    productsGrid.innerHTML = `

        <div
            style="
                grid-column:1/-1;
                text-align:center;
                padding:80px;
                color:var(--muted);
            "
        >

            <i
                class="fa-solid fa-box-open"
                style="
                    font-size:40px;
                    margin-bottom:15px;
                "
            ></i>

            <h3>
                No products found
            </h3>

            <p>
                Try another search or category.
            </p>

        </div>

    `;

    return;
}


list.forEach(product => {

    const card =
        document.createElement("article");

    card.className =
        "product-card";


    card.innerHTML = `

        <div class="product-image">

            ${
                product.sale
                ?
                `
                <span class="sale-badge">
                    ${product.sale}
                </span>
                `
                :
                ""
            }


            <button
                class="wishlist"
                data-id="${product.id}"
            >

                <i class="fa-regular fa-heart"></i>

            </button>


            <span class="product-emoji">
                ${product.icon}
            </span>

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

                <div>

                    <span class="price">
                        ₹${product.price.toLocaleString()}
                    </span>

                    <span class="old-price">
                        ₹${product.oldPrice.toLocaleString()}
                    </span>

                </div>


                <button
                    class="add-button"
                    data-id="${product.id}"
                    title="Add to bag"
                >

                    <i class="fa-solid fa-plus"></i>

                </button>

            </div>

        </div>

    `;


    /*
        Clicking the product image opens
        quick view.
    */

    card
        .querySelector(".product-image")
        .addEventListener(
            "click",
            event => {

                if (
                    event.target.closest(".wishlist")
                ) return;

                openQuickView(product);

            }
        );


    /*
        Add to cart
    */

    card
        .querySelector(".add-button")
        .addEventListener(
            "click",
            () => addToCart(product.id)
        );


    /*
        Wishlist
    */

    card
        .querySelector(".wishlist")
        .addEventListener(
            "click",
            event => {

                event.stopPropagation();

                const button =
                    event.currentTarget;

                button.classList.toggle(
                    "active"
                );


                const icon =
                    button.querySelector("i");


                icon.classList.toggle(
                    "fa-regular"
                );

                icon.classList.toggle(
                    "fa-solid"
                );

            }
        );


    productsGrid.appendChild(card);

});
```

}

/* =========================================
FILTERS
========================================= */

document
.querySelectorAll(".filter")
.forEach(button => {

```
    button.addEventListener(
        "click",
        () => {

            document
                .querySelectorAll(".filter")
                .forEach(btn =>
                    btn.classList.remove(
                        "active"
                    )
                );


            button.classList.add("active");


            const filter =
                button.dataset.filter;


            const result =
                filter === "all"
                ?
                products
                :
                products.filter(
                    product =>
                        product.category === filter
                );


            renderProducts(result);

        }
    );

});
```

/* =========================================
CATEGORY CARDS
========================================= */

document
.querySelectorAll(".category-card")
.forEach(card => {

```
    card.addEventListener(
        "click",
        () => {

            const category =
                card.dataset.category;


            document
                .querySelectorAll(".filter")
                .forEach(filter => {

                    filter.classList.toggle(
                        "active",
                        filter.dataset.filter === category
                    );

                });


            const result =
                products.filter(
                    product =>
                        product.category === category
                );


            renderProducts(result);


            document
                .getElementById("shop")
                .scrollIntoView({
                    behavior: "smooth"
                });

        }
    );

});
```

/* =========================================
ADD TO CART
========================================= */

function addToCart(id) {

```
const product =
    products.find(
        item => item.id === id
    );


if (!product) return;


const existing =
    cart.find(
        item => item.id === id
    );


if (existing) {

    existing.quantity++;

} else {

    cart.push({

        ...product,

        quantity: 1

    });

}


updateCart();

openCart();

showToast(
    `${product.name} added to your bag`
);
```

}

/* =========================================
UPDATE CART
========================================= */

function updateCart() {

```
cartItems.innerHTML = "";


let count = 0;

let total = 0;


cart.forEach(item => {

    count += item.quantity;

    total +=
        item.price *
        item.quantity;


    const element =
        document.createElement("div");


    element.className =
        "cart-item";


    element.innerHTML = `

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
                    onclick="
                    changeQuantity(
                        ${item.id},
                        -1
                    )
                    "
                >
                    −
                </button>


                <span>
                    ${item.quantity}
                </span>


                <button
                    onclick="
                    changeQuantity(
                        ${item.id},
                        1
                    )
                    "
                >
                    +
                </button>


                <button
                    class="delete-item"
                    onclick="
                    removeFromCart(
                        ${item.id}
                    )
                    "
                >

                    <i
                        class="fa-solid fa-trash"
                    ></i>

                </button>

            </div>

        </div>

    `;


    cartItems.appendChild(element);

});


if (cart.length === 0) {

    cartItems.innerHTML = `

        <div class="empty-cart">

            <i
                class="fa-solid fa-bag-shopping"
                style="
                    font-size:35px;
                    margin-bottom:15px;
                "
            ></i>

            <p>
                Your bag is waiting for something beautiful.
            </p>

        </div>

    `;

}


cartCount.textContent =
    count;


cartTotal.textContent =
    `₹${total.toLocaleString()}`;
```

}

/* =========================================
QUANTITY
========================================= */

function changeQuantity(id, amount) {

```
const item =
    cart.find(
        product => product.id === id
    );


if (!item) return;


item.quantity += amount;


if (item.quantity <= 0) {

    cart =
        cart.filter(
            product =>
                product.id !== id
        );

}


updateCart();
```

}

function removeFromCart(id) {

```
cart =
    cart.filter(
        product =>
            product.id !== id
    );


updateCart();
```

}

/* =========================================
CART DRAWER
========================================= */

function openCart() {

```
cartDrawer.classList.add("active");

overlay.classList.add("active");
```

}

function closeCartDrawer() {

```
cartDrawer.classList.remove("active");

overlay.classList.remove("active");
```

}

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
closeCartDrawer
);

overlay.addEventListener(
"click",
closeCartDrawer
);

/* =========================================
QUICK VIEW
========================================= */

function openQuickView(product) {

```
currentProduct =
    product;


document
    .getElementById("quickImage")
    .textContent =
    product.icon;


document
    .getElementById("quickCategory")
    .textContent =
    product.category;


document
    .getElementById("quickName")
    .textContent =
    product.name;


document
    .getElementById("quickRating")
    .textContent =
    `★★★★★ ${product.rating}`;


document
    .getElementById("quickDescription")
    .textContent =
    product.description;


document
    .getElementById("quickPrice")
    .textContent =
    `₹${product.price.toLocaleString()}`;


quickView.classList.add("active");
```

}

document
.getElementById("quickClose")
.addEventListener(
"click",
() => {

```
        quickView.classList.remove(
            "active"
        );

    }
);
```

quickView.addEventListener(
"click",
event => {

```
    if (
        event.target === quickView
    ) {

        quickView.classList.remove(
            "active"
        );

    }

}
```

);

document
.getElementById("quickAdd")
.addEventListener(
"click",
() => {

```
        if (!currentProduct)
            return;


        addToCart(
            currentProduct.id
        );


        quickView.classList.remove(
            "active"
        );

    }
);
```

/* =========================================
DARK MODE
========================================= */

const themeBtn =
document.getElementById(
"themeBtn"
);

themeBtn.addEventListener(
"click",
() => {

```
    document.body.classList.toggle(
        "dark"
    );


    const icon =
        themeBtn.querySelector("i");


    if (
        document.body.classList.contains(
            "dark"
        )
    ) {

        icon.classList.replace(
            "fa-moon",
            "fa-sun"
        );


        localStorage.setItem(
            "zenvora-theme",
            "dark"
        );

    } else {

        icon.classList.replace(
            "fa-sun",
            "fa-moon"
        );


        localStorage.setItem(
            "zenvora-theme",
            "light"
        );

    }

}
```

);

/* Load saved theme */

if (
localStorage.getItem(
"zenvora-theme"
) === "dark"
) {

```
document.body.classList.add(
    "dark"
);


themeBtn
    .querySelector("i")
    .classList.replace(
        "fa-moon",
        "fa-sun"
    );
```

}

/* =========================================
SEARCH
========================================= */

const searchBtn =
document.getElementById(
"searchBtn"
);

const searchPanel =
document.getElementById(
"searchPanel"
);

const searchInput =
document.getElementById(
"searchInput"
);

searchBtn.addEventListener(
"click",
() => {

```
    searchPanel.classList.toggle(
        "active"
    );


    if (
        searchPanel.classList.contains(
            "active"
        )
    ) {

        searchInput.focus();

    }

}
```

);

document
.getElementById("closeSearch")
.addEventListener(
"click",
() => {

```
        searchPanel.classList.remove(
            "active"
        );

    }
);
```

searchInput.addEventListener(
"input",
() => {

```
    const value =
        searchInput.value
            .toLowerCase()
            .trim();


    const result =
        products.filter(
            product =>
                product.name
                    .toLowerCase()
                    .includes(value)
        );


    renderProducts(result);

}
```

);

/* =========================================
MOBILE MENU
========================================= */

const menuToggle =
document.getElementById(
"menuToggle"
);

const navMenu =
document.getElementById(
"navMenu"
);

menuToggle.addEventListener(
"click",
() => {

```
    navMenu.classList.toggle(
        "active"
    );


    const icon =
        menuToggle.querySelector("i");


    icon.classList.toggle(
        "fa-bars"
    );

    icon.classList.toggle(
        "fa-xmark"
    );

}
```

);

/* =========================================
NEWSLETTER
========================================= */

document
.getElementById("newsletterForm")
.addEventListener(
"submit",
event => {

```
        event.preventDefault();


        showToast(
            "Welcome to ZENVORA ✨"
        );


        event.target.reset();

    }
);
```

/* =========================================
TOAST
========================================= */

function showToast(message) {

```
toast.textContent =
    message;


toast.classList.add(
    "show"
);


clearTimeout(
    window.toastTimer
);


window.toastTimer =
    setTimeout(
        () => {

            toast.classList.remove(
                "show"
            );

        },
        2500
    );
```

}

/* =========================================
NAV ACTIVE STATE
========================================= */

document
.querySelectorAll(
".navbar nav a"
)
.forEach(link => {

```
    link.addEventListener(
        "click",
        () => {

            document
                .querySelectorAll(
                    ".navbar nav a"
                )
                .forEach(item =>
                    item.classList.remove(
                        "active"
                    )
                );


            link.classList.add(
                "active"
            );


            navMenu.classList.remove(
                "active"
            );

        }
    );

});
```

/* =========================================
INITIALIZE
========================================= */

renderProducts();

updateCart();
