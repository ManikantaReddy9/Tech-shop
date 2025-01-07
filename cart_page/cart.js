document.getElementById('cbtn').addEventListener('click',()=>{
    window.location.href='../home_page/homePage.html'
});

function loadCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const container = document.querySelector('.container3');
    if (cart.length === 0) {
        container.innerHTML = `
            <h1 class="empty">Your Cart is Empty</h1>
            <button class="button" id="cbtn">
                <i class="fa-solid fa-arrow-left left"></i> Continue Shopping
            </button>
        `;
    } else {
        let cartItemsHTML = cart.map((product, index) => `
            <div class="cart-item">
                <img src="${product.image}" alt="${product.title}" class="cart-item-image">
                <div class="cart-item-details">
                    <h3>${product.title}</h3>
                    <p>$${product.price}</p>
                    <button onclick="removeFromCart(${index})">Remove</button>
                </div>
            </div>
        `).join('');

        cartItemsHTML += `
            <button class="button" id="cbtn">
                <i class="fa-solid fa-arrow-left left"></i> Continue Shopping
            </button>
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
