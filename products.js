/*
ATT GÖRA

- anpassa addEventListener classnamn för fungerande add-to-cart button
- att-to-cart button måste hitta rätt product i localStorage array och lägga i localStorage prdInCart
*/

// window onload event for concat different products list to show all.
window.addEventListener('load', () => {

    let products = JSON.parse(localStorage.getItem("products"));
    let newProducts = JSON.parse(localStorage.getItem("newProducts"));

    if (products.length === 4) {
        if (newProducts !== null) {
            let newProductList = products.concat(dummyProd, newProducts);
            localStorage.setItem('products', JSON.stringify(newProductList))
        } else {
            localStorage.setItem('products', JSON.stringify(products))
        };
    };
    showProd();
});

let dummyProd = [{
    id: 5,
    name: "Pilea Peperomioides",
    desc: "The Chinese Money Plant ",
    img: "https://images.unsplash.com/photo-1614594805320-e6a5549d7f95?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80",
    price: 199,
},
{
    id: 6,
    name: "Asplenium Nidus",
    desc: "The Bird's-Nest Fern",
    img: "https://images.unsplash.com/photo-1636901942318-972ea62b4d5d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80",
    price: 599,
},
{
    id: 7,
    name: "Pachira Aquatica",
    desc: "The Guiana Chestnut",
    img: "https://images.unsplash.com/photo-1633789242668-886f4098ea1c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2564&q=80",
    price: 399,
},
];

function showProd() {

    const products = JSON.parse(localStorage.getItem("products"));

    let grid = document.createElement("div");
    grid.className = 'grid';

    document.querySelector(".products").prepend(grid);

    products.forEach(function (element, i) {
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

    let addToCartBtn = document.querySelectorAll('.productCartBtn');
    addToCartBtn.forEach((c, i) => {
        c.addEventListener('click', () => {
            addItem();  // Add item(s) to localStorage
            showCartBtn(); // Update cart btn amount
            addItemToLocalStorage(dummyProd[i]);
        });
    });
};

// function for heart button
function fullHeart(e) {
    const wishBtn = e.target.parentElement.offsetParent.childNodes[1].childNodes[3];
    if (e.target.className === "far fa-heart fa-lg") {
        wishBtn.innerHTML = '<i class="fas fa-heart"></i>'
    };
};

// Add item(s) to localStorage //
function addItem() {
    let item = JSON.parse(localStorage.getItem('itemInCart'));

    if (item) {
        localStorage.setItem('itemInCart', item + 1);
    } else {
        localStorage.setItem('itemInCart', 1);
    };
};

// Show cart button amount //
function showCartBtn() {
    let item = JSON.parse(localStorage.getItem('itemInCart'));

    if (item) {
        document.getElementById('shopping-cart').innerText = item;
    } else {
        document.getElementById('shopping-cart').innerText = 0;
    };
};

// Function add item(s) to shopping-cart
function addItemToLocalStorage(dummyProd) {

    let itemInCart = JSON.parse(localStorage.getItem('prdInCart'))

    // check the value
    if (itemInCart != null) {
        // check value undefined?? //
        if (itemInCart[dummyProd.id] == undefined) {
            // Add more item(s)
            dummyProd.qty = 1;
            itemInCart = {
                ...itemInCart,
                [dummyProd.id]: dummyProd
            }
        } else {
            // if the item has already placed then add more qty+++
            itemInCart[dummyProd.id].qty += 1;
        }
    } else {
        // if the cart is empty then add one more and continue++
        dummyProd.qty = 1;
        itemInCart = {
            [dummyProd.id]: dummyProd
        }
    }
    localStorage.setItem('prdInCart', JSON.stringify(itemInCart))
}

function loadCart() {
    let itemInCart = JSON.parse(localStorage.getItem('prdInCart'));

    if (itemInCart == null) {
        return 0;
    }
    // Convert object to array so continue with loop..... //

    Object.entries(itemInCart).map(item => {
        console.log(item);
    });

    localStorage.setItem('prdInCart', JSON.stringify(itemInCart))
    loadCart();
}




/*

/*
hämta produkter från localStorage satt av index.js med tillägg från products.js & admin.js
let products = JSON.parse(localStorage(getItem('products')))

baserat på "add-to-cart"-button, findIndex(av target-knapp) i products (localStorage) för att 
hitta vilken artikel från products-arrayen som ska pushas in i 
localStorage(setItem(prdInCart, JSON.stringify(product)))

*/



/*
const productItem = [];

for (var i = 0; i < btn.length; i++) {
    let cartBtn = btn[i]
    cartBtn.addEventListener('click', () => {
        
        let dummyProd = {
            id: i +1,
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

} */ 