function truncatewords(str,numWords){
    const words= str.split('');
    if(words.length<=numWords){
        return str;
    }
    return words.slice(0,numWords).join('')+'...';
}

function normalizeCategory(category) {
    return category.toLowerCase().replace(/['\s]+/g, '-');
}
function getCartItems() {
    return JSON.parse(localStorage.getItem('cartItems')) || [];
}

function saveCartItems(cartItems) {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

function addToCart(product) {
    const cartItems = getCartItems();
    cartItems.push(product);
    saveCartItems(cartItems);

    updateCartCount();
    alert("Item added to cart!");
}

function updateCartCount() {
    const cartItems = getCartItems();
    const cartCount = cartItems.length;
    document.querySelector('.cart').innerHTML = `<a class="i2" href="../cart_page/cart.html">Cart(${cartCount})</a>`;
}

updateCartCount();

fetch("https://fakestoreapi.com/products")
.then((Response)=>{return Response.json()})
.then((data)=>{
    const productData=data;
    const containersCards=productData.map((product)=>{
        console.log(product); 
        const truncateDescription=truncatewords(product.description,60);
        const truncateTitle=truncatewords(product.title,15);
        const normalizedCategory = normalizeCategory(product.category);
        return(
            `
            <div class="product-card ${normalizedCategory}">
                <div class="product-card2">
                <img class="product-image" src="${product.image}" alt="${product.name}">
                <p class="product-title">${truncateTitle}</p>
                <p class="product-description">${truncateDescription}</p>
                </div>
                <hr>
                <p class="product-price">$${product.price}</p>
                <hr>
                <div class="buttons">
                    <button onclick="showDetails(${encodeURIComponent(JSON.stringify(product))})">Details</button>
                    <button onclick="addToCart('${encodeURIComponent(JSON.stringify(product))}')">Add to Cart</button>
                </div>
            </div>
            `
        );  
    });
    const container=document.getElementById("container");
    container.innerHTML=containersCards.join("")
}).catch((Error)=>{
    console.log(Error);
});

function filteritems(category){
    const items=document.querySelectorAll('.product-card');
    items.forEach(item=>{
        if(category==='all'||item.classList.contains(category)){
            item.style.display='block';
        }
        else{
            item.style.display='none';
        }
    });
}







