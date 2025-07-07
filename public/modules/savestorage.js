import { cart } from "../data/cart";
function saveCartStorage() {
    localStorage.setItem('cart', JSON.stringify(cart))
};