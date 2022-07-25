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
        renderProductsInCart();
}

function getTotalCartCount() {
    return Object.values(cart)
        .reduce((acc, product) => acc + product.count, 0);
    
    /**  Вопрос
     * 
     * Повторила как в видео дз,
     *  при клике на кнопку "Add to Cart" в counter выводится NaN.
     * 
    const productsArr = Object.values(cart);
    let count = 0;

    for (const product in productsArr) {
        count += product.count;
    }
    return count;
    */
}

function getTotalCartPrice() {
    return Object.values(cart)
    .reduce((acc, product) => acc + product.count * product.price, 0);
}

function renderProductsInCart(id) {
    renderNewProductsInCart(id);
}

/**Застряла на этапе появления строки с товаром в cartList.
 * Понимаю, что видимо обращаюсь не к тому элементу.
 * Пробовала сделать по примеру видео дз, но изначально хадавала свои названия и в них же запуталась :)
 * Продолжаю копаться, буду благодарна, если укажете на ошибку.
 */

function renderNewProductsInCart(productId) {
    const newProductRow = `
    <div class="cartList__items" data-productId="${productId}">
            <div>
                ${cart[productId].name}
            </div>
            <div>
                <span>${cart[productId].count}</span> шт.
            </div>
            <div>
                ${cart[productId].price}
            </div>
            <div>
                <span>${(cart[productId].price * cart[productId].count.toFixed(2))}</span>
            </div>
        </div>
    `;
        cartTotalEl.insertAdjacentHTML('beforebegin', newProductRow);
}