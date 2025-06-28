import {cart, removeFromCart, updateQuantity, saveCartStorage, updateDeliveryOption} from '../data/cart.js';
import {product} from '../data/product.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import {deliveryOptions} from '../data/deliveryoptions.js';

renderOrderSummary();
renderPaymentSummary();

function renderOrderSummary() {

let checkoutHTML = '';

 cart.forEach((cartItems) => {
    const productId = cartItems.id;
    let matchingProduct;
    product.forEach((product) => {
        if (product.id === productId) {
            matchingProduct = product;
        };
    });

    const deliveryOptionId = cartItems.deliveryOptionId;
    let deliveryOption;
    deliveryOptions.forEach((options) => {
      if (options.id === deliveryOptionId) {
        deliveryOption = options;
      };
    });

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM, D');


    const html = `<div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                  ${(matchingProduct.priceCents/100).toFixed(2)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItems.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-quantity-link-${matchingProduct.id}">
                    Update 
                  </span>
                  <input class="quantity-input js-quantity-input-${matchingProduct.id}">
                  <span class="save-quantity-link link-primary js-save-quantity-link-${matchingProduct.id}">save</span>
                  <span class="delete-quantity-link link-primary js-delete-quantity-link" data-product-id="${matchingProduct.id}">
                    Delete
                  </span>
                </div>
              </div>
              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionHTML(matchingProduct, cartItems)}
                </div>
              </div>
            </div>
          </div>`;

        checkoutHTML = checkoutHTML + html;
  });

  updateTotalQuantity();

document.querySelector('.js-order-summary').innerHTML = checkoutHTML;

document.querySelectorAll('.js-delete-quantity-link').forEach((delBtn) => {
    delBtn.addEventListener('click', () => {
        const productId = delBtn.dataset.productId
        removeFromCart(productId);
        document.querySelectorAll(`.js-cart-item-container-${productId}`).forEach((btn) => {
            btn.remove();
        });
        updateTotalQuantity();
        renderPaymentSummary();
    });
    
});

function updateTotalQuantity() {
    let totalQuantity = 0;
      cart.forEach((number) => {
        totalQuantity = totalQuantity + number.quantity
      });
      document.querySelector('.js-no-of-item').innerHTML = `${totalQuantity}item`;
  };

cart.forEach((item) => {
  document.querySelectorAll(`.js-update-quantity-link-${item.id}`).forEach((link) => {
    link.addEventListener('click', () => {
      document.querySelectorAll(`.js-cart-item-container-${item.id}`).forEach((container) => {
        container.classList.add('is-editing-quantity');
      });
    });
  });
});

cart.forEach((item) => {
  document.querySelectorAll(`.js-save-quantity-link-${item.id}`).forEach((link) => {
    link.addEventListener('click', () => {
      document.querySelectorAll(`.js-cart-item-container-${item.id}`).forEach((container) => {
        let updatedQuantity = Number(container.querySelector('.quantity-input').value);
        if(!updatedQuantity || updatedQuantity <=0 || isNaN(updatedQuantity)) {
          renderUpdatedQuantity();
        } else{
          updateQuantity(item.id, updatedQuantity);
        }
        container.classList.remove('is-editing-quantity');
        renderUpdatedQuantity();
        updateTotalQuantity();
        saveCartStorage();
        renderPaymentSummary();
      });
    });
  });

  document.querySelectorAll(`.js-quantity-input-${item.id}`).forEach((link) => {
    link.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        document.querySelectorAll(`.js-cart-item-container-${item.id}`).forEach((container) => {
        let updatedQuantity = Number(container.querySelector('.quantity-input').value);
        if(!updatedQuantity || updatedQuantity <=0 || isNaN(updatedQuantity)) {
          renderUpdatedQuantity();
        } else{
          updateQuantity(item.id, updatedQuantity);
        }
        container.classList.remove('is-editing-quantity');
        renderUpdatedQuantity();
        updateTotalQuantity();
        saveCartStorage();
        console.log(cart);
      });
      }; 
    });
  });
});

function renderUpdatedQuantity() {
  cart.forEach((item) => {
    document.querySelectorAll(`.js-quantity-label-${item.id}`).forEach((label) => {
      label.innerHTML = `${item.quantity}`;
    });
  });
};



function deliveryOptionHTML (matchingProduct, cartItems) {
  let html = '';
  deliveryOptions.forEach((option) => {
    const today = dayjs();
    const deliveryDate = today.add(option.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM, D');
    const priceString = option.priceCents === 0
        ? 'Free'
        : `$${(option.priceCents/100).toFixed(2)} -`
    const isChecked = option.id === cartItems.deliveryOptionId;

    html += `<div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.id}" data-deliveryoption-id="${option.id}">
                  <input type="radio" ${isChecked ? 'checked' : ''}
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      ${dateString}
                    </div>
                    <div class="delivery-option-price">
                      ${priceString} Shipping
                    </div>
                  </div>
                </div>`;
  });
  return html;
};

document.querySelectorAll('.js-delivery-option').forEach((option) => {
  option.addEventListener('click', () => {
    const productId = option.dataset.productId
    const deliveryOptionId = option.dataset.deliveryoptionId
    updateDeliveryOption(productId, deliveryOptionId);
    renderOrderSummary();
    renderPaymentSummary()
    saveCartStorage();
  });
});
};

function getProduct(cartItems) {
    const productId = cartItems;
    let matchingProduct;
    product.forEach((product) => {
        if (product.id === productId) {
            matchingProduct = product;
        };
    });
    return matchingProduct;
};

function getDeliveryId(cartItems) {
  const deliveryOptionId = cartItems;
    let deliveryOption;
    deliveryOptions.forEach((options) => {
      if (options.id === deliveryOptionId) {
        deliveryOption = options;
      };
    });
    return deliveryOption;
};

function getTotalQuantity() {
    let totalQuantity = 0;
      cart.forEach((number) => {
        totalQuantity = totalQuantity + number.quantity
      });
    return totalQuantity;
  };

function renderPaymentSummary() {
const totalQuantity = getTotalQuantity();
let html = '';
let price = 0;
let shippingPrice = 0;
cart.forEach((cartItems) => {
  const product = getProduct(cartItems.id);
  const deliveryOption = getDeliveryId(cartItems.deliveryOptionId);
  price += (product.priceCents*cartItems.quantity);
  shippingPrice += (deliveryOption.priceCents);
  let totalBeforeTax = (shippingPrice + price);
  let tax = totalBeforeTax*.1;
  let orderTotal = (price + shippingPrice + tax);

  html += `<div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${totalQuantity}):</div>
            <div class="payment-summary-money">$${(price/100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${(shippingPrice/100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${(totalBeforeTax/100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">${(tax/100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${(orderTotal/100).toFixed(2)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>`;
});
document.querySelector('.js-payment-summary').innerHTML = html;
};