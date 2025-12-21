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
xhr.send();

function addProductToCart(id){
    xhr.open('GET',`${url}/products/${id}`);
    xhr.responseType = 'json'
    xhr.onload = function(){
      
    };
}


let cartProd = document.getElementById('cart-products');

let cart = [];
if(localStorage.getItem('cart')){
    cart = JSON.parse(localStorage.getItem('cart'));
    drawCartProducts();
}

function addProductToCart(id){
    let product = productsArray.find(function(p){
         return p.id == id;
    })
    cart.push(product);
    drawCartProducts();
    localStorage.setItem("cart", JSON.stringify.('cart'));

    document.getElementById('cart-button').classList.add('active');
    setTimeout(function(){
        document.getElementById('cart-button');
    }, 500);
}

function drawCartProducts(){
    if(cart.length === 0) return cartProd.innerHTML = 'cart is empty';
    cartProd.innerHTML=null;
    let sum = 0;
    cart.forEach(function(p){
          cartProd.innerHTML += `
          <p><img src="${p.photo_url}">${p.name} | ${p.price}</p>
          <hr>
          `;
          sum += p.price;
    });
    cartProd.innerHTML +=`
    <p>Total: ${sum}</p>
    <button onclick="butAll()">Buy all</button>
    `;
}

function buyAll(){
    cart = [];
    cartProd.innerHTML = 'Money was withdrawn from ur bank account';
    localStorage.setItem("cart", '[]');
}

function openCard(){
    cartProd.classList.toggle('hide');
}

function cleanAll(){
    cart = [];
    localStorage.setItem("cart", '[]');
    drawCartProducts();
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

   css:

   
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: Arial, Helvetica, sans-serif;
}

body {
    background-color: #f2f2f2; 
    color: #100f0f; 
}

header {
    background-color: #dde8ff; 
    color: #111;
    padding: 15px 25px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 2px solid #e5e7eb;
    box-shadow: 0 2px 5px rgba(0,0,0,0.05);
    border-radius: 0 0 10px 10px;
}

header h1 {
    font-size: 40px;
    font-weight: 700;
    color: #1e40af; 
    letter-spacing: 1px;
}

#cart {
    position: relative;
}

#cart-button {
    background-color: #f2f2f2; 
    border: #143692;
    padding: 8px;
    border-radius: 50%;
    cursor: pointer;
    transition: background-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
    box-shadow: 0 2px 6px rgba(0,0,0,0.15);
}

#cart-button:hover {
    background-color: #f2f2f2; 
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

#cart-button img {
    width: 40px;
    height: 40px;
}

#product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
    gap: 20px;
    padding: 20px;
}

.product {
    background-color: #ffffff;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 15px;
    transition: transform 0.5s ease, box-shadow 0.5s ease;
}

.product:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 10px black;
}

.product-name {
    color: #143692; 
}

.product-photo {
    width: 100%;
    max-width: 220px;      
    height: 180px;         
    object-fit: cover;     
    display: block;
    margin: 0 auto 10px;  
    border-radius: 12px;   
    border: 2px solid #6c7e9e; 
    background-color: #e5e7eb;
}



