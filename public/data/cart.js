export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
    cart = [{
        id: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '1'
    }, {
        id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '2'
    }];
}

export function saveCartStorage() {
    localStorage.setItem('cart', JSON.stringify(cart))
};

export function addToCart(productId, quantityToAdd) {
    let matchingItems;
    cart.forEach((items) => {
          if (productId === items.id) {
            matchingItems = items;
          } 
        });

        if(matchingItems) {
          matchingItems.quantity += quantityToAdd;
        } else {
          cart.push({
            id: productId,
            quantity: quantityToAdd,
            deliveryOptionId: '1'
        });
      }
      saveCartStorage();
  };

export function removeFromCart(productId) {
    let newCart = [];
    cart.forEach((product) => {
        if (product.id !== productId) {
            newCart.push(product)
        }
    });
    cart = newCart;
    saveCartStorage();
};

export function updateQuantity(productId, newQuantity) {
  cart.forEach((product) => {
    if (product.id === productId) {
      product.quantity = newQuantity;
    };
  });
  saveCartStorage();
};

export function updateDeliveryOption(productId, deliveryOptionId) {
let matchingItems;
  cart.forEach((items) => {
        if (productId === items.id) {
          matchingItems = items;
        } 
      });
  matchingItems.deliveryOptionId = deliveryOptionId;
  saveCartStorage();
};

export function clearCart() {
  localStorage.removeItem('cart');
  cart.length = 0;
  saveCartStorage();
}