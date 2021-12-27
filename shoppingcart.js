// create a stripe client, use to show card payment
const stripe = Stripe('pk_test_51K2zTpD3GBWLS7iLLPtd48ZhQIIr0mPsszx3VB6ALeTAmY3ROomN4C1feYx1xXntPj0BQ58rjC6OKdjDLTaz8bLo00x7Wim6Ff');

// call function to show products on page
window.addEventListener('DOMContentLoaded', () => {
    showShopCart();
});

// variable to store total amount of shop cart
let totSum = 0;
let totQty = 0;

// global variables used in multiple function
const totProdsDiv = document.querySelector(".inputTotProd");
const totSumDiv = document.querySelector(".inputTotSum");
const shopCart = JSON.parse(localStorage.getItem('prdInCart'));
const orderBtn = document.querySelector(".orderBtn");
const paymentBg = document.querySelector(".payment");
const payBtn = document.querySelector("#pay");
const paymentForm = document.querySelector("#payment-form");

// global eventListener
document.querySelector(".orderBtn").addEventListener('click', placeOrder);

// function to show all products from localStorage shopCart on site
function showShopCart() {
    const shoppingCart = JSON.parse(localStorage.getItem('prdInCart'));

    // if shopping cart is empty, dont show order button and totals
    if (shoppingCart === null) {
        document.querySelector(".cart-h1").textContent = "Your shopping cart is empty :("
        document.querySelector(".total").style.display = "none";
    } else {
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
            qaInput.value = element.qty;
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

            totSum += Number(element.price * element.qty);
            totSumDiv.innerHTML = `${totSum}:-`;
            totQty += Number(element.qty);
            totProdsDiv.innerText = `${totQty} PCS`;
        });
    };
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
    const shopCartItems = JSON.parse(localStorage.getItem("prdInCart"));
    // find index in array for item to remove
    const indexOfTarget = shopCartItems.findIndex(x => x.id == targetItem);
    // remove target item from localStorage array
    const removedItem = shopCartItems.splice(indexOfTarget, 1);
    // push updated array to localStorage
    localStorage.setItem("prdInCart", JSON.stringify(shopCartItems));
    element.remove();

    const quantOfProd = e.target.parentElement.children[3].children[1].value;
    const numberOfProd = Number(quantOfProd);

    // update total products in cart
    totProdsDiv.innerText = `${totQty -= quantOfProd} PCS`
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
    const divId = e.path[2].id;
    // variable to find index of products for update total sum
    const indexOfTarget = shopCart.findIndex(x => x.id == divId);
    const priceToUse = shopCart[indexOfTarget].price;
    const qtyToUse = shopCart[indexOfTarget].qty;

    let changedEl = document.querySelector(`#${changeProd.id}`);

    // change quantity on site based on choice, validator on 0 to prevent - value
    // change total products and total sum
    if (e.target.innerText === '+') {
        changedEl.value = quantity += 1;
        totProdsDiv.innerText = `${totQty += 1} PCS`;
        totSumDiv.innerHTML = `${totSum += Number(priceToUse)}:-`;
    } else if (e.target.innerText === '-') {
        if (changedEl.value == 0) {
            return;
        } else {
            changedEl.value = quantity -= 1;
            totProdsDiv.innerText = `${totQty -= 1} PCS`
            totSumDiv.innerHTML = `${totSum -= Number(priceToUse)}:-`;
        };
        //update qty in localStorage after minus plus input
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
// add the card payment element to html element
card.mount('#card');

// check if card info is correct
card.on('change', (event) => {
    let message = document.querySelector("#messages");
    if (event.error) {
        message.textContent = event.error.message;
    } else {
        message.textContent = "";
        payBtn.disabled = false;
    };
});

// handle submit payment and get token
paymentForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const customName = document.querySelector("#name").value;
    const customEmail = document.querySelector("#email").value;
    const customAddress = document.querySelector("#address").value;

    if (customName == "" || customEmail == "" || customAddress == "") {
        alert("please fill in your info")
        return
    } else {

        // customer info for display on order confirmation
        const customInfo = {
            name: customName,
            email: customEmail,
            address: customAddress,
            total: totSumDiv.innerText
        };
        // save cutomer info to localStorage
        localStorage.setItem("customInfo", JSON.stringify(customInfo));

        // get products in shopCart, save to order confirmation page
        let orderedProducts = JSON.parse(localStorage.getItem("prdInCart"));
        localStorage.setItem("ordered", JSON.stringify(orderedProducts));

        stripe.createToken(card).then((result) => {
            if (result.error) {
                let errorElement = document.querySelector("#error")
                errorElement.textContent = result.error.message;
                return;
            } else {
                stripeTokenHandler(result.token);
            };
        });
    };
});

// handle token and submit form, send to order confirmation page
const stripeTokenHandler = function (token) {
    let hiddenInput = document.createElement("input");
    hiddenInput.setAttribute("type", "hidden");
    hiddenInput.setAttribute("name", "stripeToken");
    hiddenInput.setAttribute("value", token.id);
    paymentForm.appendChild(hiddenInput);

    localStorage.setItem("prdInCart", []);
    paymentForm.submit();
    window.location.href = "./orderconf.html";
};

// function place order, show payment form for card
function placeOrder() {
    paymentForm.style.display = "flex";
    paymentBg.style.display = "flex";
    payBtn.disabled = true;
    payBtn.innerText = `PAY ${totSumDiv.innerText}`;
};

// close payment form with click on window
window.onclick = function (e) {
    if (e.target === paymentBg) {
        paymentBg.style.display = "none";
    };
};