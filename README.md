js:

let productsGrid = document.getElementById('product-grid');
let productsArray = [];
let xhr = new XMLHttpRequest();
let url = 'https://my-json-server.typicode.com/Diswix/ladygaga';

xhr.open('GET', url + '/products');
xhr.responseType = 'json'
xhr.onload = function () {
    productsArray = xhr.response
    productsGrid.innerHTML = null;
    productsArray.forEach(p => {
        productsArray.push(p);
        let pElem = document.createElement('div');
        pElem.classList.add('product');
        pElem.innerHTML = `
        <h2 class='product-name'>${p.name}</h2>
        <img src='${p.photo_url}' alt='${p.name}' class='product-photo'>
        <p class='product-price'><b>price:</b> ${p.price}</p>
        <p class='product-decription'><b>Description:</b>${p.description} </p>
        <a href="user.Profile.html?id='${p.author_id}'">Seller</a>
        <button onclick="addProductToCart(${p.id})">Buy</button>
        `;
        productsGrid.append(pElem);
    });
}

html:

    <header>
        <h1> RoboCode Marketplace</h1>
        <div id="cart">
            <button id="cart-button" onclick="openCart()">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy4VwnUaVMSQhSC6RSWMwSH47j8AubSHlaEw&s" alt="cart">
            </button>
            <div id="cart-products" class="hide">
                Cart is empty
            </div>
        </div>
    </header>
    <main>
        <div id="product-grid">

        </div>
    </main>
    <script src="script1.js" defer></script>
   <link rel="stylesheet" href="style1.css">
