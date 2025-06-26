export let cart = [{
    id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2
}, {
    id: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1
}
];

export function addToCart(productId, quantityToAdd) {
    let matchingItems;
    cart.forEach((items) => {
          if (productId === items.productId) {
            matchingItems = items;
          } 
        });

        if(matchingItems) {
          matchingItems.quantity += quantityToAdd;
        } else {
          cart.push({
            productId: productId,
            quantity: quantityToAdd
        });
      }
  };

 