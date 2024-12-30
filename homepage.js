function truncatewords(str,numWords){
    const words= str.split('');
    if(words.length<=numWords){
        return str;
    }
    return words.slice(0,numWords).join('')+'...';
}
fetch("https://fakestoreapi.com/products")
.then((Response)=>{return Response.json()})
.then((data)=>{
    const productData=data;
    const containersCards=productData.map((product)=>{
        console.log(product);
        const truncateDescription=truncatewords(product.description,60);
        const truncateTitle=truncatewords(product.title,15);
        return(
            `
            <div class="product-card">
                <div class="product-card2">
                <img class="product-image" src="${product.image}" alt="${product.name}">
                <p class="product-title">${truncateTitle}</p>
                <p class="product-description">${truncateDescription}</p>
                </div>
                <hr>
                <p class="product-price">$${product.price}</p>
                <hr>
                <div class="buttons">
                    <button>Details</button>
                    <button>Add to Cart</button>
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


