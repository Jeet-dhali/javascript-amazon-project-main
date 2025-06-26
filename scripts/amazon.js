
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
              src="${value.rating.stars}">
            <div class="product-rating-count link-primary">
              ${value.rating.count}
            </div>
          </div>

          <div class="product-price">
            ${value.priceCents/100}
          </div>

          <div class="product-quantity-container">
            <select>
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

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart-button" data-product-name="${value.name}">
            Add to Cart
          </button>
        </div>`;
        getHTML = getHTML + html;
});

document.querySelector('.js-product-grid').innerHTML = getHTML;
console.log(getHTML);

document.querySelectorAll('.js-add-to-cart-button').forEach((button) => {
    button.addEventListener('click', () => {
        productName = button.dataset.productName;
        let matchingItems;
        cart.forEach((items) => {
          if (productName === items.productName) {
            matchingItems = items;
          } 
        });

        if(matchingItems) {
          matchingItems.quantity +=1;
        } else {
          cart.push({
            productName: productName,
            quantity: 1
        });
      }
      let totalQuantity = 0;
      cart.forEach((number) => {
        totalQuantity = totalQuantity + number.quantity
      });
      document.querySelector('.js-cart-quantity').innerHTML = totalQuantity;
    });
  });
