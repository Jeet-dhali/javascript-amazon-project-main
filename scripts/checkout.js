import {cart, removeFromCart, updateQuantity, saveCartStorage} from '../data/cart.js';
import {product} from '../data/product.js';

let checkoutHTML = '';

 cart.forEach((cartItems) => {
    const productId = cartItems.id;
    let matchingProduct;
    product.forEach((product) => {
        if (product.id === productId) {
            matchingProduct = product;
        };
    });


    const html = `<div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
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
                  <input class="quantity-input">
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
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
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
        container.classList.remove('is-editing-quantity');
        updateQuantity(item.id, updatedQuantity);
        renderUpdatedQuantity();
        updateTotalQuantity();
        saveCartStorage();
      });
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
