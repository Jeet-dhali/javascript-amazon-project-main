import { orders } from "../data/orders.js";



renderTrackingPage();

function renderTrackingPage() {
    let trackingHTML = ``;
    const url = new URL(window.location.href);
    orderId = url.searchParams.get('orderId');
    productId = url.searchParams.get('productId');
    let html = `<a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on Monday, June 13
        </div>

        <div class="product-info">
          Black and Gray Athletic Cotton Socks - 6 Pairs
        </div>

        <div class="product-info">
          Quantity: 1
        </div>

        <img class="product-image" src="images/products/athletic-cotton-socks-6-pairs.jpg">

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
          <div class="progress-bar"></div>
        </div>`;
        trackingHTML += html;
        document.querySelector('.js-order-tracking').innerHTML = trackingHTML;
}

