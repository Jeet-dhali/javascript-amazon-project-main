export let orders = [];

export async function loadOrdersFromBackend() {
  try {
    const response = await fetch('http://localhost:5000/api/user/orders', {
      method: 'GET',
      credentials: 'include' 
    });

    const data = await response.json();
    orders = data.orders || [];
  } catch (err) {
    console.error('Failed to load orders from backend:', err);
    orders = [];
  }
}

export async function addOrder(orderPayload) {
  try {
    const response = await fetch('http://localhost:5000/api/user/orders', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderPayload) // should include cart and total
    });

    const newOrder = await response.json();
    orders.unshift(newOrder); // update in-memory orders list
  } catch (err) {
    console.error('Failed to place order:', err);
  }
}



