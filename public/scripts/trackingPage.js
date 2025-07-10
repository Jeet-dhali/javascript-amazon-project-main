import { orders, loadOrdersFromBackend } from "../data/orders.js";
import { getProduct } from "../data/product.js";
import { cart, loadCartFromBackend } from "../data/cart.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

window.addEventListener('DOMContentLoaded', async () => {
  await loadCartFromBackend(); 
  await loadOrdersFromBackend();
  renderTrackingPage();
  updateCartQuantityHeader();
});

function renderTrackingPage() {
    let trackingHTML = ``;
    const url = new URL(window.location.href);
    const orderId = url.searchParams.get('orderId');
    const productId = url.searchParams.get('productId');
    const product = getProduct(productId);

    const order = orders.find(order => order.id === orderId);

    if (!order) {
        console.error('Order not found');
        return;
    }

    const productItem = order.products.find(p => p.productId === productId || p.id === productId);

    if (!productItem) {
        console.error('Product not found in order');
        return;
    }

    const deliveryDate = dayjs(productItem.estimatedDeliveryTime).format('dddd, MMMM D');

    const orderTime = dayjs(order.orderTime);
    const estimatedDeliveryTime = dayjs(productItem.estimatedDeliveryTime);
    const currentTime = dayjs();
    const elapsed = currentTime.diff(orderTime); 
    const total = estimatedDeliveryTime.diff(orderTime);
    let progressPercentage = (elapsed/total) * 100;
    progressPercentage = Math.max(0, Math.min(100, progressPercentage));
    


    let html = `<a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on ${deliveryDate}
        </div>

        <div class="product-info">
          ${product.name}
        </div>

        <div class="product-info">
          Quantity: ${productItem.quantity}
        </div>

        <img class="product-image" src="${product.image}">

        <div class="progress-labels-container">
          <div class="progress-label">
            Preparing
          </div>
          <div class="progress-label current-status">
            Shipped
          </div>
          <div class="progress-label">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar js-progress-bar"></div>
        </div>`;
        trackingHTML += html;
        document.querySelector('.js-order-tracking').innerHTML = trackingHTML;

        const progressBar = document.querySelector('.js-progress-bar');
        progressBar.style.width = `${progressPercentage}%`;

}

function updateCartQuantityHeader() {
  let totalQuantity = 0;

  cart.forEach((item) => {
    totalQuantity += item.quantity;
  });

  document.querySelector('.js-cart-quantity').innerHTML = `${totalQuantity}`;
}

