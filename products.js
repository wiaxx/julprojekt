// Shopping Cart Button //

// Copy code from shopping cart.js and continue ------> changing const to let instead

const localStorageItem = localStorage.getItem('dummyProd');


const dummyProd = [{

let dummyProd = [{

    id: 1,
    name: "Monstera Deliciosa",
    desc: "The Swiss Cheese Plant",
    img: "https://images.unsplash.com/photo-1637967885705-a60e3fea266d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2564&q=80",
    price: 699,
}
, {
    id: 2,
    name: "Musa acuminata",
    desc: "The Dwarf Cavendish Banana",
    img: "https://images.unsplash.com/photo-1638824097313-8a42fef7c87c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80",
    price: 799,
}, {
    id: 3,
    name: "Zamioculcas Zamiifolia",
    desc: "Zanzibar Gem",
    img: "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80",
    price: 299,
},{
    id: 4,
    name: "Dracaena trifasciata",
    desc: "Snake Plant",
    img: "https://images.unsplash.com/photo-1638824096986-5c5ed96d118a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80",
    price: 259, 
}, {
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
]
if (localStorageItem === null) {
        dummyProd = [];
} else {
        dummyProd = JSON,parse(localStorageItem);
}

window.addEventListener('load', () => {
    localStorage.setItem("products", JSON.stringify(dummyProd));
    showProd();
});




function showProd() {

    const shoppingCart = JSON.parse(localStorage.getItem("products"));

    let grid = document.createElement("div");
    grid.className = 'grid';

    document.querySelector(".products").prepend(grid);
    shoppingCart.forEach(function (element, i) {
        const div = document.createElement("div");
        div.setAttribute("id", `${element.id}`);
        div.classList.add("product");
        div.classList.add("product-" + (i+1));
        
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
};

// Add data to Cart Button //
let cartBtn = document.querySelectorAll('.cart-btn');
cartBtn.forEach((c, i) => {
    c.addEventListener('click', () => {
        addItem();  //Add Item(s) to LocalStorage
        updateCart(); //Update the cart amount 
        addCartItem(dummyProd[i]);

        
    } );

    })



// Function add item(s) to LocalStorage
function addItem() {
    let item = parseInt(localStorage.getItem('item'));

    if (item) {
        localStorage.setItem('item', item + 1); // if the item has already been placed then keep on adding. //
    } else {
        localStorage.setItem('item', 1); // if not --> adding the item. //
    }
    
}

// Update or show quantity in the shopping cart
function updateCart() {
    let item = parseInt(localStorage.getItem('item'));

    if (item) {
        document.querySelector('.count').innerHTML = item; // if the item has already been placed then update the amount cart. //
    } else {
        document.querySelector('.count').innerHTML = 0; //if not setting to 0. //
    }

}
updateCart();

// Adding data to  localStorage //


function addCartItem(dummyProd){
    
    let cartItem = JSON.parse (localStorage.getItem('cart-item')); //converter string to arrays
    
    //check the value, has been placed or not? //

function addCartItem(dummyProd) {

    let cartItem = JSON.parse(localStorage.getItem('cart-item')); //converter string to arrays

    //check the value, has been placed or not? //
    console.log(cartItem)
    if (cartItem != null) {


    if(cartItem != null) {  
        // check if the value = undefined ? //
            localStorage.setItem('prdInCart', JSON.stringify(productItem))

        } else {
            // value has already been placed then add more qty ++  //
            cartItem[dummyProd.id].qty += 1;
        }


    } else {

        // if the shopping cart is empty the add new product item. //
        dummyProd.qty = 1;
        cartItem = {
            [dummyProd.id]: dummyProd
        }
    };
    
    localStorage.setItem("cart-item", JSON.stringify(cartItem) ); 
    
};

function loadCart(){
    localStorage.setItem("cart-item", JSON.stringify(dummyProd));
        if( cartItem == null ){
            return 0;
        }
}


let cartNumbers = document.querySelectorAll('.cart-btn');

const btn = document.getElementsByClassName('cart-btn')

const productItem = [];

cartNumbers.forEach( (c, i) => {
    c.addEventListener( 'click', () => {
        addItem();  //Add Item(s) to LocalStorage
        updateCart(); //Update the cart amount 
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
}}


    

    
    
