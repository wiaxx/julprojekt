// put "dummy"-product data in localStorage to fix feature and design
const dummyProd = [{
    id: 1,
    name: "Monstera",
    desc: "Green big plant",
    img: "https://images.unsplash.com/photo-1525498128493-380d1990a112?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80",
    price: 499,
    inv: 5
}, {
    id: 2,
    name: "Palm Tree",
    desc: "Exotic tree",
    img: "https://images.unsplash.com/photo-1574173011032-7b713139ea86?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=442&q=80",
    price: 4499,
    inv: 3
}, {
    id: 3,
    name: "Cactus",
    desc: "Sticky bush",
    img: "https://images.unsplash.com/photo-1589944908960-f6c10e05e4b4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=327&q=80",
    price: 259,
    inv: 12
}
]

// set dummy-products in localStorage after page load, call function to show products on page
window.addEventListener('load', () => {
    localStorage.setItem("shopCart", JSON.stringify(dummyProd));
    showShopCart();
});

// variable to store total amount of shop cart
let totSum = 0;

// function to show all products from localStorage shopCart on site
function showShopCart() {
    const shoppingCart = JSON.parse(localStorage.getItem("shopCart"))

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

        const prodName = document.createElement("p");
        prodName.innerText = `${element.name}`
        prodName.classList.add("prodName");

        const qaDiv = document.createElement("div");
        qaDiv.classList.add("qaDiv");

        const plusBtn = document.createElement("button");
        plusBtn.innerText = "+";
        plusBtn.classList.add("changeBtn");

<<<<<<< HEAD
        // const qaSpan = document.createElement("span");
        // qaSpan.innerText = "1";
        // qaSpan.classList.add("quantity");

        const qaInput = document.createElement("input");
        qaInput.value = 1;
        qaInput.classList.add("quantity");
=======
        const qaInput = document.createElement("input");
        qaInput.value = 1;
        qaInput.classList.add("quantity");
        qaInput.setAttribute("id", `qa${element.id}`);
        qaInput.setAttribute("type", "number");
        qaInput.setAttribute("min", "0");
        qaInput.readOnly = true;
>>>>>>> e238de8f046354a67c15be6186ddd95f6b7d2919

        const subBtn = document.createElement("button");
        subBtn.innerText = "-";
        subBtn.classList.add("changeBtn");

        const priceSpan = document.createElement("span");
        priceSpan.innerText = `${element.price}:-`;

        qaDiv.append(subBtn, qaInput, plusBtn);
        div.append(rmBtn, img, prodName, qaDiv, priceSpan);
        document.querySelector(".product-holder").appendChild(div);

        totSum += Number(element.price)
        document.querySelector(".inputTotSum").innerHTML = `${totSum}:-`;
    });

    document.querySelector(".inputTotProd").innerText = `${shoppingCart.length} PCS`
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

    // update total products in cart
    document.querySelector(".inputTotProd").innerText = `${shopCartItems.length} PCS`
    // update total sum in cart
    document.querySelector(".inputTotSum").innerHTML = `${totSum -= Number(removedItem[0].price)}:-`
};

const shopCart = JSON.parse(localStorage.getItem('shopCart'));

<<<<<<< HEAD
// function to change quantity in shopping vart
function changeQuantity(e) {
    console.log(e);

    let quantity = document.querySelector(".quantity").value;
    console.log(quantity)

    if (e.target.innerText === '+') {

    } else if (e.target.innerText === '-') {
        console.log("minus")
    }

=======
// function to change quantity in shopping cart
function changeQuantity(e) {

    // variable to find id on element to change right quantity input
    const changeProd = e.target.parentElement.childNodes[1];
    // variable to hold current quantity from target element
    const currentQuant = e.target.parentElement.childNodes[1].value;
    // variable to convert current quantity to number
    let quantity = Number(currentQuant);

    let changedEl = document.querySelector(`#${changeProd.id}`);

    // change quantity on site based on choice, validator on 0 to prevent - value
    if (e.target.innerText === '+') {
        changedEl.value = quantity += 1;
    } else if (e.target.innerText === '-') {
        if (changedEl.value == 0) {
            return;
        } else {
            changedEl.value = quantity -= 1;
        };
    };

    // todo - update total sum and total products. get localstorage and use price on products
>>>>>>> e238de8f046354a67c15be6186ddd95f6b7d2919
};