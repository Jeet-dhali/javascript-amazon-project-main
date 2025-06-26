import {cart} from '../data/cart.js';
import {product} from '../data/product.js';
import {addToCart} from '../data/cart.js';

let getHTML = ``;

product.forEach((value) => {
    const html = `<div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${value.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${value.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${value.rating.stars*10}.png">
            <div class="product-rating-count link-primary">
              ${value.rating.count}
            </div>
          </div>

          <div class="product-price">
            ${(value.priceCents/100).toFixed(2)}
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
        getHTML = getHTML + html;
});

document.querySelector('.js-product-grid').innerHTML = getHTML;

document.querySelectorAll('.js-add-to-cart-button').forEach((button) => {
    button.addEventListener('click', () => {
        let productId = button.dataset.productId;
        let quantityToAdd = selectQuantity(productId);
        addToCart(productId, quantityToAdd);
        updateTotalQuantity();
        addedPopup(productId);
    });
  });



  function updateTotalQuantity() {
    let totalQuantity = 0;
      cart.forEach((number) => {
        totalQuantity = totalQuantity + number.quantity
      });
      document.querySelector('.js-cart-quantity').innerHTML = totalQuantity;
  };

  function addedPopup(productId) {
    document.querySelectorAll(`.js-added-to-cart-${productId}`).forEach((element) => {
          element.classList.add('added');
          setTimeout(() => {
            element.classList.add('fade-out');
         }, 1000);
      });
  };

  function selectQuantity(productId) {
    let quantityToAdd = 1;
    document.querySelectorAll(`.js-quantity-selector-${productId}`).forEach((quantitySelection) => {
          quantityToAdd = Number(quantitySelection.value);
       });
    return quantityToAdd;
  };