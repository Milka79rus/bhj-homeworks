const products = Array.from(document.querySelectorAll('.product'));
const cart = document.querySelector('.cart');
const cartProducts = document.querySelector('.cart__products');

// Проверка видимости корзины
const updateCartVisibility = () => {
    cart.style.display = cartProducts.children.length > 0 ? 'block' : 'none';
};

// Сохранение в LocalStorage
const saveCart = () => {
    const data = Array.from(cartProducts.querySelectorAll('.cart__product')).map(p => ({
        id: p.dataset.id,
        src: p.querySelector('.cart__product-image').src,
        count: p.querySelector('.cart__product-count').innerText
    }));
    localStorage.setItem('cart_storage', JSON.stringify(data));
};

// Функция добавления/обновления товара в корзине
const addToCart = (id, image, count) => {
    const productsInCart = Array.from(cartProducts.querySelectorAll('.cart__product'));
    const productInCart = productsInCart.find(p => p.dataset.id === id);

    if (productInCart) {
        const countElement = productInCart.querySelector('.cart__product-count');
        countElement.innerText = parseInt(countElement.innerText) + count;
    } else {
        cartProducts.insertAdjacentHTML('beforeend', `
      <div class="cart__product" data-id="${id}">
        <img class="cart__product-image" src="${image}">
        <div class="cart__product-count">${count}</div>
        <div class="cart__product-remove" style="cursor:pointer; color:red; font-size:12px; text-align:center;">Удалить</div>
      </div>
    `);

        // Обработчик удаления (Повышенный уровень #1)
        const newProduct = cartProducts.lastElementChild;
        newProduct.querySelector('.cart__product-remove').addEventListener('click', () => {
            newProduct.remove();
            saveCart();
            updateCartVisibility();
        });
    }
    saveCart();
    updateCartVisibility();
};

// Анимация перемещения (Повышенный уровень #2)
const animateProduct = (productImg, productId) => {
    const target = cartProducts.querySelector(`.cart__product[data-id="${productId}"] .cart__product-image`);
    if (!target) return;

    const clone = productImg.cloneNode();
    const startPos = productImg.getBoundingClientRect();
    const endPos = target.getBoundingClientRect();

    clone.style.position = 'fixed';
    clone.style.left = `${startPos.left}px`;
    clone.style.top = `${startPos.top}px`;
    clone.style.width = `${productImg.offsetWidth}px`;
    clone.style.zIndex = '1000';
    clone.style.transition = 'all 0.6s ease-in-out';

    document.body.appendChild(clone);

    setTimeout(() => {
        clone.style.left = `${endPos.left}px`;
        clone.style.top = `${endPos.top}px`;
        clone.style.opacity = '0.3';
        clone.style.transform = 'scale(0.2)';
    }, 10);

    setTimeout(() => clone.remove(), 600);
};

// Инициализация кнопок товаров
products.forEach(product => {
    const quantityValue = product.querySelector('.product__quantity-value');
    const decBtn = product.querySelector('.product__quantity-control_dec');
    const incBtn = product.querySelector('.product__quantity-control_inc');
    const addBtn = product.querySelector('.product__add');
    const productImg = product.querySelector('.product__image');

    decBtn.onclick = () => {
        let current = parseInt(quantityValue.innerText);
        if (current > 1) quantityValue.innerText = --current;
    };

    incBtn.onclick = () => {
        let current = parseInt(quantityValue.innerText);
        quantityValue.innerText = ++current;
    };

    addBtn.onclick = () => {
        const id = product.dataset.id;
        const count = parseInt(quantityValue.innerText);
        const imgSrc = productImg.src;

        addToCart(id, imgSrc, count);
        animateProduct(productImg, id);
    };
});

// Загрузка из LocalStorage (Повышенный уровень #3)
window.onload = () => {
    const savedData = JSON.parse(localStorage.getItem('cart_storage')) || [];
    savedData.forEach(item => addToCart(item.id, item.src, parseInt(item.count)));
    updateCartVisibility();
};