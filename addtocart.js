
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



    let addToCartBtn = document.querySelectorAll('.productCartBtn');
    addToCartBtn.forEach((c, i) => {
        c.addEventListener('click', () => {
            addItem();  // Add item(s) to localStorage
            showCartBtn(); // Update cart btn amount
            addItemToLocalStorage(dummyProd[i]);
        });
    });


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

























/*
window.addEventListener('load', () => {
    localStorage.setItem("itemInCart", JSON.stringify(dummyProd));
    showShopCart();
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

const btn = document.getElementsByClassName('productCartBtn')

const productItem = [];

cartNumbers.forEach( (c, i) => {
    c.addEventListener( 'click', () => {
        addItem();  //Add Item(s) to LocalStorage
        updateCart(); //Update the cart amount 
        addItemToLocalStorage(dummyProd[i]);
    } );
});

// Function add item(s) to LocalStorage

function addItem() {
    let item = parseInt(localStorage.getItem('item'));

    if(item){  
        localStorage.setItem( 'item', item + 1 ); // if the item has already been placed then keep on adding. //
    }else{
        localStorage.setItem( 'item', 1 ); // if not --> adding the item. //
    }
}

// Show item-qty in localStorage

function updateCart(){
    let item = parseInt(localStorage.getItem('item'));
    
    if(item){
        document.querySelector('.count').innerHTML = item; // if the item has already been placed then update the amount cart. //
    }else{
        document.querySelector('.count').innerHTML = 0; //if not setting to 0. //
    }
    
}  
updateCart();


 // Being to set the item(s) to localStorage

for(var i = 0; i < btn.length; i++){
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

function addItemToLocalStorage(dummyProd){
    let cartItem = JSON.parse(localStorage.getItem('prdInCart'))
    if(cartItem === null ){ 
        productItem.push(dummyProd)
        localStorage.setItem('prdInCart', JSON.stringify(productItem))

    }else{
        cartItem.forEach(item => {
            if(dummyProd.name == item.name){
                dummyProd.qty = item.qty +=  1;
                dummyProd.totalPrice = item.totalPrice += dummyProd.totalPrice;
            }else{
                productItem.push(item)
            }
        });
        productItem.push(dummyProd)
    }
    localStorage.setItem('prdInCart', JSON.stringify(productItem))
    window.location.reload();
}

*/