document.getElementById('cbtn').addEventListener('click',()=>{
    window.location.href='../home_page/homePage.html'
});

function displayCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const container = document.querySelector('.container3');

    if (cartItems.length === 0) {
        container.innerHTML = `
            <h1 class="empty">Your Cart is Empty</h1><br>
            <button class="button" id="cbtn"><i class="fa-solid fa-arrow-left left"></i> Continue Shopping</button>
        `;
    } else {
        container.innerHTML = `
            <div class="cart-items">
                ${cartItems
                    .map(
                        (item) => `
                    <div class="cart-item">
                        <img src="${item.image}" alt="${item.title}" class="cart-item-image">
                        <div class="cart-item-details">
                            <p class="cart-item-title">${item.title}</p>
                            <p class="cart-item-price">$${item.price}</p>
                        </div>
                        <button class="remove-item" onclick='removeFromCart(${JSON.stringify(item)})'>Remove</button>
                    </div>
                `
                    )
                    .join('')}
            </div>
        `;
    }

    document.getElementById('cbtn').addEventListener('click', () => {
        window.location.href = '../home_page/homePage.html';
    });
}

function removeFromCart(itemToRemove) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems = cartItems.filter((item) => item.id !== itemToRemove.id);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    displayCartItems(); 
    updateCartCount();
}

displayCartItems();
