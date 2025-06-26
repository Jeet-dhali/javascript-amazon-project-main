let product = [
    {
        name: 'Black and Gray Athletic Cotton Socks - 6 Pairs',
        image: 'images/products/athletic-cotton-socks-6-pairs.jpg',
        ratings: {
            stars: 'images/ratings/rating-45.png',
            count: '87'
        },
        price: 1090
    },
    {
        name: 'Intermediate Size Basketball',
        image: 'images/products/intermediate-composite-basketball.jpg',
        ratings: {
            stars: 'images/ratings/rating-40.png',
            count: '127'
        },
        price: 2095
    },
    {
        name: 'Adults Plain Cotton T-Shirt - 2 Pack',
        image: 'images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg',
        ratings: {
            stars: 'images/ratings/rating-45.png',
            count: '56'
        },
        price: 799
    }
];

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
              src="${value.ratings.stars}">
            <div class="product-rating-count link-primary">
              ${value.ratings.count}
            </div>
          </div>

          <div class="product-price">
            ${value.price/100}
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
    });
  });
