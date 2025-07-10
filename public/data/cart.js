export let cart = [];

export async function loadCartFromBackend() {
  try {
    const response = await fetch('https://amazon-clone-backend-71hb.onrender.com/api/user/cart', {
      method: 'GET',
      credentials: 'include'
    });

    const data = await response.json();
    cart = (data.cart || []).filter(item => item.id && item.id !== 'undefined');
  } catch (err) {
    console.error('Failed to load cart from backend:', err);
  }
}


export async function addToCart(productId, quantityToAdd) {
  if (!productId || productId === 'undefined') return;
  let matchingItems = cart.find((item) => {
    return item.id === productId
  });

  if (matchingItems) {
    matchingItems.quantity += quantityToAdd;
  } else {
    cart.push({
      id: productId,
      quantity: quantityToAdd,
      deliveryOptionId: '1'
    });
  }

  try {
    await fetch('https://amazon-clone-backend-71hb.onrender.com/api/user/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ cart })
    });
  } catch (err) {
    console.error('Failed to update backend cart:', err);
  }
}

export async function removeFromCart(productId) {
  // Remove from local cart first (optional if only using backend cart)
  cart = cart.filter(product => product.id !== productId);

  // Call backend to remove from user's cart
  try {
    await fetch(`https://amazon-clone-backend-71hb.onrender.com/api/user/cart/${productId}`, {
      method: 'DELETE',
      credentials: 'include'
    });
  } catch (error) {
    console.error('Error removing from backend cart:', error);
  }
}


export async function updateQuantity(productId, newQuantity) {
  cart.forEach((product) => {
    if (product.id === productId) {
      product.quantity = newQuantity;
    };
  });
  try {
    await fetch('https://amazon-clone-backend-71hb.onrender.com/api/user/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ cart })
    });
  } catch (err) {
    console.error('Failed to update cart quantity in backend:', err);
  }
};

export async function updateDeliveryOption(productId, deliveryOptionId) {
let matchingItems;
  cart.forEach((items) => {
        if (productId === items.id) {
          matchingItems = items;
        } 
      });
  if (matchingItems) {
    matchingItems.deliveryOptionId = deliveryOptionId;
  }
  try {
    await fetch('https://amazon-clone-backend-71hb.onrender.com/api/user/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ cart })
    });
  } catch (err) {
    console.error('Failed to update delivery option in backend:', err);
  }
};

export async function clearCart() {
  cart.length = 0;

  await fetch('https://amazon-clone-backend-71hb.onrender.com/api/user/cart', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ cart })
  });
}