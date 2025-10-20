

// Initialize Swiper (slider)
var swiper = new Swiper(".mySwiper", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// ================== CART FUNCTIONALITY ==================

const cartIcon = document.querySelector(".cart-icon");
const cartTab = document.querySelector(".cart-tab");
const closeBtn = document.querySelector(".close-btn");
const cardList = document.querySelector(".menu-card");
const cartListAdd = document.querySelector(".cart-list");
const cartTotal = document.querySelector(".cart-total");
const cartValue = document.querySelector(".cart-value");

let productList = [];
let cartProduct = [];

// Show/hide cart tab
cartIcon.addEventListener("click", () => {
  cartTab.classList.add("cart-tab-active");
});

closeBtn.addEventListener("click", () => {
  cartTab.classList.remove("cart-tab-active");
});

// ================== UPDATE TOTALS ==================
const updateTotals = () => {
  let totalPrice = 0;
  let totalQuantity = 0;

  document.querySelectorAll(".item").forEach(item => {
    const quantity = parseInt(item.querySelector(".quantity-value").textContent);
    const price = parseFloat(item.querySelector(".item-total").textContent.replace("$", ""));

    totalPrice += price;
    totalQuantity += quantity;
  });

  cartTotal.textContent = `$${totalPrice.toFixed(2)}`;
  cartValue.textContent = totalQuantity;
};

// ================== SHOW PRODUCT CARDS ==================
const showCards = () => {
  productList.forEach(product => {
    const orderCard = document.createElement("div");
    orderCard.classList.add("menu-section");
    orderCard.innerHTML = `
      <div class="card-img">
        <img src="${product.image}" alt="${product.name}">
      </div>
      <h4>${product.name}</h4>
      <p class="p-menu">${product.price}</p>
      <a href="#" class="btn-menu order-card-btn">Add to cart</a>
    `;

    cardList.appendChild(orderCard);

    const cardBtn = orderCard.querySelector(".order-card-btn");
    cardBtn.addEventListener("click", e => {
      e.preventDefault();
      addToCart(product);
    });
  });
};

// ================== ADD TO CART ==================
const addToCart = product => {
  const existingProduct = cartProduct.find(item => item.id === product.id);

  if (existingProduct) {
    alert("Item already exists in cart!");
    return;
  }

  cartProduct.push(product);

  let quantity = 1;
  let price = parseFloat(product.price.replace("$", ""));

  const cartItem = document.createElement("div");
  cartItem.classList.add("item");
  cartItem.innerHTML = `
    <div class="img-container">
      <img src="${product.image}" alt="${product.name}">
    </div>
    <div class="cart-info">
      <h4>${product.name}</h4>
      <h4 class="item-total">${product.price}</h4>
    </div>
    <div class="quality-cart">
      <a href="#" class="quantity-btn minus"><i class="fa-solid">▬</i></a>
      <h4 class="quantity-value">${quantity}</h4>
      <a href="#" class="quantity-btn plus"><i class="fa-solid">✚</i></a>
    </div>
  `;

  cartListAdd.appendChild(cartItem);
  updateTotals();

  const plusBtn = cartItem.querySelector(".plus");
  const minusBtn = cartItem.querySelector(".minus");
  const itemTotal = cartItem.querySelector(".item-total");
  const quantityValue = cartItem.querySelector(".quantity-value");

  plusBtn.addEventListener("click", e => {
    e.preventDefault();
    quantity++;
    quantityValue.textContent = quantity;
    itemTotal.textContent = `$${(price * quantity).toFixed(2)}`;
    updateTotals();
  });

  minusBtn.addEventListener("click", e => {
    e.preventDefault();
    quantity--;
    if (quantity > 0) {
      quantityValue.textContent = quantity;
      itemTotal.textContent = `$${(price * quantity).toFixed(2)}`;
      updateTotals();
    } else {
      cartItem.classList.add("slide-out");
      setTimeout(() => {
        cartItem.remove();
        cartProduct = cartProduct.filter(item => item.id !== product.id);
        updateTotals();
      }, 300);
    }
  });
};

// ================== FETCH PRODUCT DATA ==================
const initApp = () => {
  fetch("product.json")
    .then(response => response.json())
    .then(data => {
      productList = data;
      showCards();
    })
    .catch(error => console.error("Error loading product data:", error));
};

initApp();

// ================== HAMBURGER MENU ==================
const home = document.querySelector(".hamburger");
const menu = document.querySelector(".mobile-menu");

home.addEventListener("click", () => {
  menu.classList.toggle("menu-active");
});
