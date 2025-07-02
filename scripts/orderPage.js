import { orders } from "../data/orders.js";
import { getProduct } from "../data/product.js";
import { cart, addToCart } from "../data/cart.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

renderOrderPage();
updateCartQuantityHeader();

export function renderOrderPage() {
  let orderHTML = ``;

  orders.forEach((orderItem) => {
    const orderId = orderItem.id;
    const formattedDate = dayjs(orderItem.orderTime).format('MMMM D, YYYY');

    let productsHTML = '';

    orderItem.products.forEach((productItem) => {
      const product = getProduct(productItem.productId);  
      const deliveryDate = dayjs(productItem.estimatedDeliveryTime).format('MMMM D, YYYY');
      productsHTML += `
        <div class="product-image-container">
          <img src="${product.image}">
        </div>
        <div class="product-details">
          <div class="product-name">${product.name}</div>
          <div class="product-delivery-date">Arriving on: ${deliveryDate}</div>
          <div class="product-quantity">Quantity: ${productItem.quantity}</div>
          <button class="buy-again-button button-primary js-buy-again-button" data-product-id="${productItem.productId}">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>
        <div class="product-actions">
          <a href="tracking.html?orderId=${orderId}&productId=${productItem.productId}">
            <button class="track-package-button button-secondary">Track package</button>
          </a>
        </div>
      `;
    });

    let html = `
      <div class="order-container js-order-container">
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${formattedDate}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${(orderItem.totalCostCents / 100).toFixed(2)}</div>
            </div>
          </div>
          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${orderId}</div>
          </div>
        </div>

        <div class="order-details-grid">
          ${productsHTML}
        </div>
      </div>
    `;

    orderHTML += html;
  });

  document.querySelector('.orders-grid').innerHTML = orderHTML;
}

function updateCartQuantityHeader() {
  let totalQuantity = 0;

  cart.forEach((item) => {
    totalQuantity += item.quantity;
  });

  document.querySelector('.js-cart-quantity').innerHTML = `${totalQuantity}`;
}

document.querySelectorAll('.js-buy-again-button').forEach((button) => {
    button.addEventListener('click', () => {
        const productId = button.dataset.productId;
        addToCart(productId, 1);
        updateCartQuantityHeader();
    });
});