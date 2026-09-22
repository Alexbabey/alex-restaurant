const foods = [

{
    id: 1,
    name: "Alex Signature Pizza",
    category: "pizza",
    price: 14.99,
    description: "Mozzarella, tomato, basil and our signature sauce.",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=85",
    badge: "BEST SELLER"
},

{
    id: 2,
    name: "Classic Cheeseburger",
    category: "burger",
    price: 12.99,
    description: "Juicy beef, cheddar, lettuce, tomato and special sauce.",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=85",
    badge: "POPULAR"
},

{
    id: 3,
    name: "Ethiopian Special",
    category: "ethiopian",
    price: 16.99,
    description: "Traditional flavors, injera and delicious spiced dishes.",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85",
    badge: "ETHIOPIAN"
},

{
    id: 4,
    name: "Creamy Pasta",
    category: "pasta",
    price: 13.99,
    description: "Creamy pasta with herbs, parmesan and fresh ingredients.",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=900&q=85",
    badge: ""
},

{
    id: 5,
    name: "Crispy Chicken",
    category: "chicken",
    price: 11.99,
    description: "Golden crispy chicken served with our house sauce.",
    image: "https://images.unsplash.com/photo-1562967916-eb82221dfb92?auto=format&fit=crop&w=900&q=85",
    badge: "NEW"
},

{
    id: 6,
    name: "Margherita Pizza",
    category: "pizza",
    price: 11.99,
    description: "Tomato, mozzarella, basil and extra virgin olive oil.",
    image: "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=900&q=85",
    badge: ""
},

{
    id: 7,
    name: "Double Beef Burger",
    category: "burger",
    price: 15.99,
    description: "Two beef patties, double cheese and signature sauce.",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=85",
    badge: "FAVORITE"
},

{
    id: 8,
    name: "Doro Wot",
    category: "ethiopian",
    price: 17.99,
    description: "Rich Ethiopian chicken stew with traditional spices.",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=85",
    badge: "TRADITIONAL"
},

{
    id: 9,
    name: "Chicken Alfredo",
    category: "pasta",
    price: 14.99,
    description: "Creamy Alfredo pasta with grilled chicken.",
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=85",
    badge: ""
},

{
    id: 10,
    name: "Chocolate Dessert",
    category: "dessert",
    price: 7.99,
    description: "Rich chocolate dessert finished with a delicate touch.",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=85",
    badge: "SWEET"
},

{
    id: 11,
    name: "Fresh Lemonade",
    category: "drinks",
    price: 4.99,
    description: "Freshly squeezed lemonade served ice cold.",
    image: "https://images.unsplash.com/photo-1523677011781-c91d1bbe2f7a?auto=format&fit=crop&w=900&q=85",
    badge: ""
},

{
    id: 12,
    name: "Fresh Salad",
    category: "chicken",
    price: 8.99,
    description: "Fresh vegetables, herbs and our house dressing.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=85",
    badge: "FRESH"
}

];

let cart = [];

let currentCategory = "all";

/* ================= DISPLAY MENU ================= */

function displayFoods(list = foods) {

const grid = document.getElementById("foodGrid");

if (!grid) return;

grid.innerHTML = "";

if (list.length === 0) {

    grid.innerHTML = `
        <div style="
            grid-column:1/-1;
            text-align:center;
            padding:60px;
            color:#777;
        ">
            <h3>No food found</h3>
            <p>Try another search.</p>
        </div>
    `;

    return;
}


list.forEach(food => {

    const card = document.createElement("article");

    card.className = "food-card";

    card.innerHTML = `

        <div class="food-image">

            <img
                src="${food.image}"
                alt="${food.name}"
                loading="lazy"
            >

            ${
                food.badge
                ?
                `<span class="food-badge">${food.badge}</span>`
                :
                ""
            }

        </div>

        <div class="food-content">

            <h3>${food.name}</h3>

            <p class="food-description">
                ${food.description}
            </p>

            <div class="food-bottom">

                <span class="food-price">
                    $${food.price.toFixed(2)}
                </span>

                <button
                    class="add-button"
                    onclick="addToCart(${food.id})"
                    aria-label="Add ${food.name}"
                >
                    <i class="fa-solid fa-plus"></i>
                </button>

            </div>

        </div>
    `;

    grid.appendChild(card);

});

}

/* ================= FILTER ================= */

function filterMenu(category) {

currentCategory = category;

document
    .querySelectorAll(".category")
    .forEach(button => button.classList.remove("active"));

const buttons = document.querySelectorAll(".category");

buttons.forEach(button => {

    if (
        button.innerText
            .toLowerCase()
            .includes(category === "all" ? "all" : category)
    ) {
        button.classList.add("active");
    }

});


if (category === "all") {

    displayFoods(foods);

} else {

    displayFoods(
        foods.filter(food => food.category === category)
    );

}

}

/* ================= SEARCH ================= */

function searchFood() {

const query =
    document
        .getElementById("searchInput")
        .value
        .toLowerCase()
        .trim();


let results = foods;


if (currentCategory !== "all") {

    results =
        results.filter(
            food => food.category === currentCategory
        );

}


if (query) {

    results =
        results.filter(food =>
            food.name.toLowerCase().includes(query) ||
            food.description.toLowerCase().includes(query) ||
            food.category.toLowerCase().includes(query)
        );

}


displayFoods(results);

}

/* ================= CART ================= */

function addToCart(id) {

const food = foods.find(item => item.id === id);

if (!food) return;


const existing =
    cart.find(item => item.id === id);


if (existing) {

    existing.quantity++;

} else {

    cart.push({
        ...food,
        quantity: 1
    });

}


updateCart();

showToast(`${food.name} added to your order`);

}

function addSpecialOffer() {

const special = {
    id: 100,
    name: "Family Feast",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1548365328-8b849e6f90e0?auto=format&fit=crop&w=700&q=85",
    quantity: 1
};


const existing =
    cart.find(item => item.id === 100);


if (existing) {

    existing.quantity++;

} else {

    cart.push(special);

}


updateCart();

showToast("Family Feast added!");

}

function updateCart() {

const cartCount =
    document.getElementById("cartCount");

const cartItems =
    document.getElementById("cartItems");

const cartTotal =
    document.getElementById("cartTotal");


const totalQuantity =
    cart.reduce(
        (sum, item) => sum + item.quantity,
        0
    );


const totalPrice =
    cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );


cartCount.textContent = totalQuantity;

cartTotal.textContent =
    `$${totalPrice.toFixed(2)}`;


if (cart.length === 0) {

    cartItems.innerHTML = `
        <div class="empty-cart">

            <i
                class="fa-solid fa-bag-shopping"
                style="
                    font-size:45px;
                    margin-bottom:15px;
                    color:#d5a84b;
                "
            ></i>

            <h3>Your cart is empty</h3>

            <p>
                Add something delicious!
            </p>

        </div>
    `;

    return;

}


cartItems.innerHTML = "";


cart.forEach(item => {

    const element =
        document.createElement("div");

    element.className = "cart-item";

    element.innerHTML = `

        <img
            src="${item.image}"
            alt="${item.name}"
        >

        <div class="cart-item-info">

            <h4>${item.name}</h4>

            <small>
                $${item.price.toFixed(2)}
            </small>

            <div class="quantity">

                <button
                    onclick="changeQuantity(${item.id}, -1)"
                >
                    −
                </button>

                <strong>
                    ${item.quantity}
                </strong>

                <button
                    onclick="changeQuantity(${item.id}, 1)"
                >
                    +
                </button>

            </div>

        </div>

        <strong>
            $${(item.price * item.quantity).toFixed(2)}
        </strong>

    `;

    cartItems.appendChild(element);

});

}

function changeQuantity(id, change) {

const item =
    cart.find(item => item.id === id);

if (!item) return;


item.quantity += change;


if (item.quantity <= 0) {

    cart =
        cart.filter(item => item.id !== id);

}


updateCart();

}

/* ================= CART UI ================= */

function openCart() {

document
    .getElementById("cartOverlay")
    .classList.add("open");

}

function closeCart(event) {

if (
    event &&
    event.target !== event.currentTarget
) {
    return;
}


document
    .getElementById("cartOverlay")
    .classList.remove("open");

}

/* ================= MOBILE NAV ================= */

function toggleMenu() {

document
    .getElementById("navMenu")
    .classList.toggle("open");

}

/* ================= TOAST ================= */

function showToast(message) {

const toast =
    document.getElementById("toast");

toast.textContent = message;

toast.classList.add("show");


setTimeout(() => {

    toast.classList.remove("show");

}, 2500);

}

/* ================= RESERVATION ================= */

function reserveTable(event) {

event.preventDefault();


const name =
    document
        .getElementById("reservationName")
        .value;

const date =
    document
        .getElementById("reservationDate")
        .value;


alert(
    `Thank you, ${name}!\n\nYour reservation request for ${date} has been received.`
);

}

/* ================= CHECKOUT ================= */

function checkout() {

if (cart.length === 0) {

    showToast("Your cart is empty.");

    return;

}


alert(
    "Checkout is ready to be connected to a real payment/order system."
);

}

/* ================= START ================= */

displayFoods();

updateCart();
