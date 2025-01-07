document.getElementById('cbtn').addEventListener('click',()=>{
    window.location.href='../home_page/homePage.html'
});

function loadCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const container = document.querySelector('.container3');

    if (cart.length === 0) {
        container.innerHTML = `
            <br><br><br><br>
            <h1 class="empty">Your Cart is Empty</h1>
            <button class="button" id="cbtn">
                <i class="fa-solid fa-arrow-left left"></i> Continue Shopping
            </button>
            <br><br><br><br>
        `;
    } else {
        let cartItemsHTML = `
        <div class="fcart">
            <div class="cart-items">
                <span class="cart-top">Item List</span><br>
                <hr class="oline">
                ${cart.map((product, index) => `
                    <div class="cart-item">
                        <img src="${product.image}" alt="${product.title}" class="cart-item-image">
                        <h3>${product.title}</h3>
                        <div class="cart-item-details">
                            <button class="minus" data-index="${index}" onclick="updateQuantity(${index}, -1)">-</button>
                            <span id="quantity-${index}">${product.quantity || 1}</span>
                            <button class="plus" data-index="${index}" onclick="updateQuantity(${index}, 1)">+</button>
                            <p id="per-item-price-${index}" class="price">
                                ${product.quantity || 1} \u00D7 $${product.price.toFixed(2)}
                            </p>
                        </div>
                    </div>
                    <hr class="tline">
                `).join('')}
            </div>
            <div class="fcart2">
                <h3 class="summary">Order Summary</h3>
                <hr class="ooline">
                <div class="last">
                    <span class="lone" id="total-items">Products (${cart.reduce((sum, item) => sum + (item.quantity || 1), 0)})</span>
                    <span class="ltwo" id="total-price"> $${cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0).toFixed(2)}</span>
                </div>
                <div class="shipping">
                    <span class="sone">Shipping</span>
                    <span class="stwo">$30</span>
                </div>
                <div class="amount">
                    <span class="aone">Total Amount</span>
                    <span class="atwo">$890.94</span>
                </div>
                <button class="check">Go To Checkout</button>
            </div>
        </div>
        `;

        container.innerHTML = cartItemsHTML;
    }

    document.getElementById('cbtn').addEventListener('click', () => {
        window.location.href = '../home_page/homePage.html';
    });
}


function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart)); 
    loadCartItems(); 
    updateCartCount();
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.length;
    document.querySelector('.cart').innerHTML = `
        <i class="i2"> Cart(${cartCount})</i>
    `;
}

document.addEventListener('DOMContentLoaded', () => {
    loadCartItems();
    updateCartCount();
});

function updateOrderSummary() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const totalPrice = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

    document.getElementById('total-items').textContent = `Total Items: ${totalItems}`;
    document.getElementById('total-price').textContent = `Total Price: $${totalPrice.toFixed(2)}`;
}

function updateQuantity(index, change) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (!cart[index].quantity) {
        cart[index].quantity = 1; 
    }

    cart[index].quantity += change;

    if (cart[index].quantity < 1) {
        cart.splice(index, 1); 
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    loadCartItems(); 

    localStorage.setItem('cart', JSON.stringify(cart));

    const quantityElement = document.getElementById(`quantity-${index}`);
    quantityElement.textContent = cart[index].quantity;

    const perItemPriceElement = document.getElementById(`per-item-price-${index}`);
    const totalItemPrice = cart[index].quantity * cart[index].price;
    perItemPriceElement.textContent = `${cart[index].quantity} \u00D7 $${cart[index].price.toFixed(2)}`;

    updateOrderSummary();
    updateCartCount();
}





