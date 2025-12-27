let productsGrid = document.getElementById('product-grid');
let productsArray = [];
let cartProd = document.getElementById('cart-content');
let cartTotalDiv = document.getElementById('cart-total');
let totalPriceElem = document.getElementById('total-price');

let xhr = new XMLHttpRequest();
let url = 'https://my-json-server.typicode.com/Diswix/ladygaga';

xhr.open('GET', url + '/products');
xhr.responseType = 'json';
xhr.onload = function() {
    if (xhr.status === 200) {
        productsArray = xhr.response;
        productsGrid.innerHTML = '';
        
        productsArray.forEach(p => {
            let pElem = document.createElement('div');
            pElem.classList.add('product');
            pElem.innerHTML = `
                <h2 class='product-name'>${p.name}</h2>
                <img src='${p.photo_url}' alt='${p.name}' class='product-photo'>
                <p class='product-price'><b>Price:</b> $${p.price}</p>
                <p class='product-description'><b>Description:</b> ${p.description}</p>
                <a href="userProfile.html?id=${p.author_id}" class="seller-link">View Seller</a>
                <button onclick="addProductToCart(${p.id})" class="buy-btn">Add to Cart</button>
            `;
            productsGrid.appendChild(pElem);
        });
    } else {
        productsGrid.innerHTML = '<p>Error loading products. Please try again later.</p>';
    }
};
xhr.send();

let cart = [];
if(localStorage.getItem('cart')) {
    cart = JSON.parse(localStorage.getItem('cart'));
    drawCartProducts();
}

function addProductToCart(id) {
    let product = productsArray.find(function(p) {
        return p.id == id;
    });
    
    if (product) {
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        drawCartProducts();
        
        document.getElementById('cart-button').classList.add('active');
        setTimeout(function() {
            document.getElementById('cart-button').classList.remove('active');
        }, 500);
    }
}

function drawCartProducts() {
    if (cart.length === 0) {
        cartProd.innerHTML = 'Cart is empty';
        cartTotalDiv.style.display = 'none';
        return;
    }
    
    cartProd.innerHTML = '';
    let sum = 0;
    
    cart.forEach(function(p, index) {
        cartProd.innerHTML += `
            <div class="cart-item">
                <img src="${p.photo_url}" alt="${p.name}">
                <div class="cart-item-info">
                    <div class="cart-item-name">${p.name}</div>
                    <div class="cart-item-price">$${p.price}</div>
                </div>
                <button onclick="removeFromCart(${index})" class="remove-item">✕</button>
            </div>
        `;
        sum += p.price;
    });
    
    totalPriceElem.textContent = `Total: $${sum.toFixed(2)}`;
    cartTotalDiv.style.display = 'block';
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    drawCartProducts();
}

function buyAll() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    
    let total = cart.reduce((sum, item) => sum + item.price, 0);
    alert(`Purchase successful!\nTotal: $${total.toFixed(2)}\nThank you for your order!`);
    
    cart = [];
    localStorage.setItem("cart", JSON.stringify([]));
    drawCartProducts();
}

function openCart() {
    let cartDiv = document.getElementById('cart-products');
    cartDiv.classList.toggle('hide');
}

function cleanAll() {
    cart = [];
    localStorage.setItem("cart", JSON.stringify([]));
    drawCartProducts();
}