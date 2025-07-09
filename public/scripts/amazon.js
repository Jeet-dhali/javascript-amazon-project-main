import { cart } from '../data/cart.js';
import { product } from '../data/product.js';
import { addToCart } from '../data/cart.js';

document.addEventListener('DOMContentLoaded', () => {
  
  const profileLink = document.querySelector('.profile-link');
  const signupLink = document.querySelector('.signin-link');

  const token = document.cookie.includes("jwt");
  console.log('JWT Present?', token);
  console.log('DOM loaded');
  if (token) {
    profileLink.style.display = 'inline';
    signupLink.style.display = 'none';
  } else {
    profileLink.style.display = 'none';
    signupLink.style.display = 'inline';
  }
});

function renderHomePage() {
  renderProducts(product);
}

function renderFilteredProducts(searchTerm) {
  const filteredProducts = product.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.keywords && item.keywords.some(kw => kw.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  if (filteredProducts.length === 0) {
    document.querySelector('.js-product-grid').innerHTML = `
      <p class="no-results-message">No products found for "${searchTerm}"</p>`;
      updateTotalQuantity();
    return;
  }

  renderProducts(filteredProducts);
}

function renderProducts(productList) {
  let getHTML = '';

  productList.forEach((value) => {
    getHTML += generateProductHTML(value);
  });

  document.querySelector('.js-product-grid').innerHTML = getHTML;

  addCartListeners();
  updateTotalQuantity();
}

function generateProductHTML(value) {
  return `<div class="product-container">
    <div class="product-image-container">
      <img class="product-image" src="${value.image}">
    </div>

    <div class="product-name limit-text-to-2-lines">
      ${value.name}
    </div>

    <div class="product-rating-container">
      <img class="product-rating-stars"
        src="images/ratings/rating-${value.rating.stars * 10}.png">
      <div class="product-rating-count link-primary">
        ${value.rating.count}
      </div>
    </div>

    <div class="product-price">
      ${(value.priceCents / 100).toFixed(2)}
    </div>

    <div class="product-quantity-container">
      <select class="js-quantity-selector-${value.id}">
        <option selected value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
    </div>

    <div class="product-spacer"></div>

    <div class="added-to-cart js-added-to-cart-${value.id}">
      <img src="images/icons/checkmark.png">
      Added
    </div>

    <button class="add-to-cart-button button-primary js-add-to-cart-button" data-product-id="${value.id}">
      Add to Cart
    </button>
  </div>`;
}

function addCartListeners() {
  document.querySelectorAll('.js-add-to-cart-button').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      const quantityToAdd = selectQuantity(productId);
      addToCart(productId, quantityToAdd);
      updateTotalQuantity();
      addedPopup(productId);
    });
  });
}

function updateTotalQuantity() {
  let totalQuantity = 0;
  cart.forEach((item) => {
    totalQuantity += item.quantity;
  });
  document.querySelector('.js-cart-quantity').innerHTML = totalQuantity;
}

function addedPopup(productId) {
  document.querySelectorAll(`.js-added-to-cart-${productId}`).forEach((element) => {
    element.classList.add('added');
    setTimeout(() => {
      element.classList.add('fade-out');
    }, 1000);
  });
}

function selectQuantity(productId) {
  let quantityToAdd = 1;
  document.querySelectorAll(`.js-quantity-selector-${productId}`).forEach((selector) => {
    quantityToAdd = Number(selector.value);
  });
  return quantityToAdd;
}

document.querySelector('.js-search-bar').addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    document.querySelector('.js-search-button').click();
  }
});

document.querySelector('.js-search-button').addEventListener('click', () => {
  const searchBar = document.querySelector('.js-search-bar');
  const searchInput = searchBar.value;
  if (searchInput) {
    window.location.href = `index.html?search=${encodeURIComponent(searchInput)}`;
  }
  searchBar.value = '';
});

const url = new URL(window.location.href);
const searchTerm = url.searchParams.get('search');
if (searchTerm) {
  renderFilteredProducts(searchTerm);
} else {
  renderHomePage();
}
