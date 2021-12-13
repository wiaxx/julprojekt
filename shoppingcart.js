// create a stripe client, use to show card payment
const stripe = Stripe('pk_test_51K2zTpD3GBWLS7iLLPtd48ZhQIIr0mPsszx3VB6ALeTAmY3ROomN4C1feYx1xXntPj0BQ58rjC6OKdjDLTaz8bLo00x7Wim6Ff');

// put "dummy"-product data in localStorage to fix feature and design
const dummyProd = [{
    id: 100,
    name: "Monstera",
    desc: "Green big plant",
    img: "https://images.unsplash.com/photo-1525498128493-380d1990a112?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80",
    price: 499,
    inv: 5
}, {
    id: 101,
    name: "Palm Tree",
    desc: "Exotic tree",
    img: "https://images.unsplash.com/photo-1574173011032-7b713139ea86?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=442&q=80",
    price: 4499,
    inv: 3
}, {
    id: 102,
    name: "Cactus",
    desc: "Sticky bush",
    img: "https://images.unsplash.com/photo-1589944908960-f6c10e05e4b4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=327&q=80",
    price: 259,
    inv: 12
}
];

// set dummy-products in localStorage after page load, call function to show products on page
window.addEventListener('load', () => {
    localStorage.setItem("shopCart", JSON.stringify(dummyProd));
    showShopCart();
});

document.querySelector(".orderBtn").addEventListener('click', placeOrder);

// variable to store total amount of shop cart
let totSum = 0;

// global variables used in multiple function
const totProdsDiv = document.querySelector(".inputTotProd");
const totSumDiv = document.querySelector(".inputTotSum");
const shopCart = JSON.parse(localStorage.getItem('shopCart'));
const orderBtn = document.querySelector(".orderBtn");
const paymentBg = document.querySelector(".payment");

// function to show all products from localStorage shopCart on site
function showShopCart() {
    const shoppingCart = JSON.parse(localStorage.getItem("shopCart"))

    // if shopping cart is empty, dont show order button and totals
    if (shoppingCart === null) {
        document.querySelector(".cart-h1").textContent = "Your shopping cart is empty :("
        orderBtn.style.display = "none";
        document.querySelector(".total").style.display = "none";
    } else {
        orderBtn.style.display = "block";
    };

    // loop through saved products/array to create seperate html for each product
    shoppingCart.forEach(element => {
        const div = document.createElement("div");
        div.setAttribute("id", `${element.id}`);
        div.classList.add("prodCard");

        const rmBtn = document.createElement("button");
        rmBtn.innerHTML = 'X';
        rmBtn.classList.add("rmBtn");

        const img = document.createElement("img");
        img.setAttribute("src", `${element.img}`);
        img.setAttribute("id", "shopImg");

        const prodName = document.createElement("p");
        prodName.innerText = `${element.name}`
        prodName.classList.add("prodName");

        const qaDiv = document.createElement("div");
        qaDiv.classList.add("qaDiv");

        const plusBtn = document.createElement("button");
        plusBtn.innerText = "+";
        plusBtn.classList.add("changeBtn");

        const qaInput = document.createElement("input");
        qaInput.value = 1;
        qaInput.classList.add("quantity");
        qaInput.setAttribute("id", `qa${element.id}`);
        qaInput.setAttribute("type", "number");
        qaInput.setAttribute("min", "0");
        qaInput.readOnly = true;

        const subBtn = document.createElement("button");
        subBtn.innerText = "-";
        subBtn.classList.add("changeBtn");

        const priceSpan = document.createElement("span");
        priceSpan.innerText = `á ${element.price}:-`;

        qaDiv.append(subBtn, qaInput, plusBtn);
        div.append(rmBtn, img, prodName, qaDiv, priceSpan);
        document.querySelector(".product-holder").appendChild(div);

        totSum += Number(element.price)
        totSumDiv.innerHTML = `${totSum}:-`;
    });

    totProdsDiv.innerText = `${shoppingCart.length} PCS`
    document.querySelector(".product-holder").addEventListener('click', removeOrChange);
};

// function to check which button is clicked and send to function
function removeOrChange(e) {
    if (e.target.className === 'rmBtn') {
        removeItem(e);
    };
    if (e.target.className === 'changeBtn') {
        changeQuantity(e);
    };
};

// function to remove item from shopping cart/localStorage
function removeItem(e) {

    // element to remove
    const element = e.target.parentElement;
    // targetItem id for seach index in localStorage array
    const targetItem = e.target.parentElement.id;
    // get localStorage to search for item to remove
    const shopCartItems = JSON.parse(localStorage.getItem("shopCart"));
    // find index in array for item to remove
    const indexOfTarget = shopCartItems.findIndex(x => x.id == targetItem);
    // remove target item from localStorage array
    const removedItem = shopCartItems.splice(indexOfTarget, 1);
    // push updated array to localStorage
    localStorage.setItem("shopCart", JSON.stringify(shopCartItems));
    element.remove();

    const quantOfProd = e.target.parentElement.children[3].children[1].value
    const numberOfProd = Number(quantOfProd);

    // update total products in cart
    totProdsDiv.innerText = `${shopCartItems.length} PCS`
    // update total sum in cart when removing product
    if (numberOfProd > 1) {
        let minusPrice = removedItem[0].price * numberOfProd;
        totSumDiv.innerHTML = `${totSum -= Number(minusPrice)}:-`;
    } else {
        totSumDiv.innerHTML = `${totSum -= Number(removedItem[0].price)}:-`;
    };
};

// function to change quantity in shopping cart
function changeQuantity(e) {

    // variable to find id on element to change right quantity input
    const changeProd = e.target.parentElement.childNodes[1];
    // variable to hold current quantity from target element
    const currentQuant = changeProd.value;
    // variable to convert current quantity to number
    let quantity = Number(currentQuant);
    // variable to find id on parent div element for seach of index of product
    const divId = e.path[2].id
    // variable to find index of products for update total sum
    const indexOfTarget = shopCart.findIndex(x => x.id == divId);
    const priceToUse = shopCart[indexOfTarget].price

    let changedEl = document.querySelector(`#${changeProd.id}`);

    // change quantity on site based on choice, validator on 0 to prevent - value
    // change total products and total sum
    if (e.target.innerText === '+') {
        changedEl.value = quantity += 1;
        totProdsDiv.innerText = `${shopCart.length += 1} PCS`;
        totSumDiv.innerHTML = `${totSum += Number(priceToUse)}:-`;
    } else if (e.target.innerText === '-') {
        if (changedEl.value == 0) {
            return;
        } else {
            changedEl.value = quantity -= 1;
            totProdsDiv.innerText = `${shopCart.length -= 1} PCS`
            totSumDiv.innerHTML = `${totSum -= Number(priceToUse)}:-`;
        };
    };
};

// create a stripe (payment) element
const element = stripe.elements();
// create custom styling for stripe element
let style = {
    base: {
        color: '#3d3d3d',
        fontFamily: '"Montserrat", sans-serif',
        fontSize: '22px'
    },
    invalid: {
        color: 'red',
        iconColor: '#a23c3c'
    }
};
// create a card payment element
let card = element.create('card', { style: style });
console.log(card)
// add the card payment element to html element
card.mount('#card');

// function to place order, show card payment as method and send to order conf
function placeOrder() {
    document.querySelector("#payment-form").style.display = "flex";
    paymentBg.style.display = "flex";
};

// close payment form with click on window
window.onclick = function(e) {
    if (e.target === paymentBg) {
        paymentBg.style.display = "none";
    };
  };