// Shopping Cart Button //

/*
ATT GÖRA

- anpassa addEventListener classnamn för fungerande add-to-cart button
- att-to-cart button måste hitta rätt product i localStorage array och lägga i localStorage prdInCart
    *** HÄMTA PRODUKTERNA FRÅN LOCALSTORAGE.GETITEM('PRODUCTS') FÖR ATT LÄGGA IN VALD PRDUKT I SHOPCART
*/

// window onload event for concat different products list to show all.
window.addEventListener('load', () => {

    let products = JSON.parse(localStorage.getItem("products"));
    let newProducts = JSON.parse(localStorage.getItem("newProducts"));

    if (products.length === 4) {
        let newProductList = products.concat(dummyProd, newProducts);
        localStorage.setItem('products', JSON.stringify(newProductList))
    } else {
        localStorage.setItem('products', JSON.stringify(products))
    }
    showProd();
});

let dummyProd = [{
    id: 5,
    name: "Pilea Peperomioides",
    desc: "The Chinese Money Plant ",
    img: "https://images.unsplash.com/photo-1614594805320-e6a5549d7f95?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80",
    price: 199
},
{
    id: 6,
    name: "Asplenium Nidus",
    desc: "The Bird's-Nest Fern",
    img: "https://images.unsplash.com/photo-1636901942318-972ea62b4d5d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80",
    price: 599
},
{
    id: 7,
    name: "Pachira Aquatica",
    desc: "The Guiana Chestnut",
    img: "https://images.unsplash.com/photo-1633789242668-886f4098ea1c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2564&q=80",
    price: 399
}]

function showProd() {

    const shoppingCart = JSON.parse(localStorage.getItem("products"));

    let grid = document.createElement("div");
    grid.className = 'grid';

    document.querySelector(".products").prepend(grid);

    shoppingCart.forEach(function (element, i) {
        const div = document.createElement("div");
        div.setAttribute("id", `${element.id}`);
        div.classList.add("product");
        div.classList.add("product-" + (i + 1));

        const divImage = document.createElement("div");
        divImage.classList.add("image");
        divImage.style.backgroundImage = `url(${element.img})`;

        const divContent = document.createElement("div");
        divContent.classList.add("content");

        const prodTitle = document.createElement("h3");
        prodTitle.innerText = `${element.name}`
        prodTitle.classList.add("productName");

        const prodDesc = document.createElement("p");
        prodDesc.innerText = `${element.desc}`
        prodDesc.classList.add("productDescription");

        const prodPrice = document.createElement("span");
        prodPrice.innerText = `${element.price}:-`
        prodPrice.classList.add("productPrice");;

        const wishBtn = document.createElement("button");
        wishBtn.innerHTML = '<i class="far fa-heart fa-lg">';
        wishBtn.classList.add("productWishBtn");

        const cartBtn = document.createElement("button");
        cartBtn.innerHTML = '<i class="fas fa-shopping-basket fa-lg">';
        cartBtn.classList.add("productCartBtn");

        div.append(divImage, divContent);
        divContent.append(prodTitle, prodDesc, prodPrice, wishBtn, cartBtn);

        grid.appendChild(div);
    });
    document.querySelector(".grid").addEventListener('click', fullHeart);
};

// function for heart button
function fullHeart(e) {
    const wishBtn = e.target.parentElement.offsetParent.childNodes[1].childNodes[3]
    wishBtn.innerHTML = '<i class="fas fa-heart"></i>'
}

let cartNumbers = document.querySelectorAll('.productCartBtn');

const btn = document.getElementsByClassName('productCartBtn');

const productItem = [];

cartNumbers.forEach((c, i) => {
    c.addEventListener('click', () => {
        addItem();  //Add Item(s) to LocalStorage
        updateCart(); //Update the cart amount 
    });
});

// Function add item(s) to LocalStorage

function addItem() {
    let item = parseInt(localStorage.getItem('item'));

    if (item) {
        localStorage.setItem('item', item + 1); // if the item has already been placed then keep on adding. //
    } else {
        localStorage.setItem('item', 1); // if not --> adding the item. //
    }
}

// Show item-qty in localStorage

function updateCart() {
    let item = parseInt(localStorage.getItem('item'));

    if (item) {
        document.querySelector('.count').innerHTML = item; // if the item has already been placed then update the amount cart. //
    } else {
        document.querySelector('.count').innerHTML = 0; //if not setting to 0. //
    }

}
updateCart();


/*

// hämta produkter från localStorage satt av index.js med tillägg från products.js & admin.js
let products = JSON.parse(localStorage(getItem('products')))

baserat på "add-to-cart"-button, findIndex(av target-knapp) i products (localStorage) för att 
hitta vilken artikel från products-arrayen som ska pushas in i 
localStorage(setItem(prdInCart, JSON.stringify(product)))

*/


// Being to set the item(s) to localStorage

for (var i = 0; i < btn.length; i++) {
    let cartBtn = btn[i]
    cartBtn.addEventListener('click', () => {

        let dummyProd = {

            image: event.target.parentElement.children[0].src,
            name: event.target.parentElement.children[1].textContent,
            price: event.target.parentElement.children[2].textContent,
            totalPrice: parseInt(event.target.parentElement.children[2].textContent),
            qty: 1
        }

        addItemToLocalStorage(dummyProd)
    })
}
// Add item(s) to localStorage

function addItemToLocalStorage(dummyProd) {
    let cartItem = JSON.parse(localStorage.getItem('prdInCart'))
    if (cartItem === null) {
        productItem.push(dummyProd)
        localStorage.setItem('prdInCart', JSON.stringify(productItem))

    } else {
        cartItem.forEach(item => {
            if (dummyProd.name == item.name) {
                dummyProd.qty = item.qty += 1;
                dummyProd.totalPrice = item.totalPrice += dummyProd.totalPrice;
            } else {
                productItem.push(item)
            }
        });
        productItem.push(dummyProd)
    }
    localStorage.setItem('prdInCart', JSON.stringify(productItem))
    window.location.reload();
}

//localStorage.setItem("cart-item", JSON.stringify(cartItem));