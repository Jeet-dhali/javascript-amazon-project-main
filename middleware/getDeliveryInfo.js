const deliveryOptions = [{
    id: '1',
    deliveryDays: 7,
    priceCents: 0
},{
    id: '2',
    deliveryDays: 3,
    priceCents: 499
}, {
    id: '3',
    deliveryDays: 1,
    priceCents: 999
}
];

function getDeliveryId(cartItems) {
  const deliveryOptionId = cartItems;
    let deliveryOption;
    deliveryOptions.forEach((options) => {
      if (options.id === deliveryOptionId) {
        deliveryOption = options;
      };
    });
    return deliveryOption;
};

module.exports = {deliveryOptions, getDeliveryId};