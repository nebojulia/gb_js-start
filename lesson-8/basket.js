'use strict';

let addButton = document.querySelector('.addToCardButton');
let cartIconWrap = document.querySelector('.cartIconWrap');
let cartList = document.querySelector('.cartList');
let cartCounter = document.querySelector('.cartProductNum');
let featuredItems = document.querySelector('.featuredItems');
let totalPrice = document.querySelector('.cartList__totalPrice');
let cartTotalEl = document.querySelector('.cartList__total');


cartIconWrap.addEventListener('click', () => {
    cartList.classList.toggle('hidden');
});

const cart = {};

featuredItems.addEventListener('click', event => {
    if (!event.target.closest('.addToCardButton')) {
        return;
    }
    const item = event.target.closest('.featuredItem');
    const id = +item.dataset.id;
    const name = item.dataset.name;
    const price = +item.dataset.price;
    addToCart(id, name, price);
});

function addToCart(id, name, price) {
    if (!(id in cart)) {
        cart[id] = {
            id: id,
            name: name,
            price: price,
            count: 0,
        };
    }
    cart[id].count++;
    cartCounter.textContent = getTotalCartCount().toString();
    totalPrice.textContent = getTotalCartPrice().toFixed(2);
    renderProductsInCart(id);
}

function getTotalCartCount() {
    /**return Object.values(cart)
        .reduce((acc, product) => acc + product.count, 0);
    */
    
    const productsArr = Object.values(cart);
    let count = 0;

    for (const product of productsArr) {
        count += product.count;
    }
    return count;
}

function getTotalCartPrice() {
    return Object.values(cart)
    .reduce((acc, product) => acc + product.count * product.price, 0);
}

function renderProductsInCart(id) {
    const cartRowEl = cartList.
        querySelector(`.cartList__items[data-productId="${id}"]`);
    if (!cartRowEl) {
        renderNewProductsInCart(id);
        return;
    }
    cartRowEl.querySelector('.itemCount').textContent = cart[id].count;
    cartRowEl.querySelector('.itemTotal').textContent = (cart[id].count * cart[id].price).toFixed(2);
}

function renderNewProductsInCart(productId) {
    const newProductRow = `
    <div class="cartList__items" data-productId="${productId}">
            <div class = "itemName">
                ${cart[productId].name}
            </div>
            <div>
                <span class = "itemCount">${cart[productId].count}</span> шт.
            </div>
            <div class = "itemPrice">
                ${cart[productId].price}
            </div>
            <div>
                <span class = "itemTotal">${(cart[productId].price * cart[productId].count.toFixed(2))}</span>
            </div>
        </div>
    `;
    cartTotalEl.insertAdjacentHTML('beforebegin', newProductRow);
}