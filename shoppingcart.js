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

// set dummy-products in localStorage after page load, call show products in shop cart function
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

        const qaSpan = document.createElement("span");
        qaSpan.innerText = "1";
        qaSpan.classList.add("quatity");

        const subBtn = document.createElement("button");
        subBtn.innerText = "-";
        subBtn.classList.add("changeBtn");

        const priceSpan = document.createElement("span");
        priceSpan.innerText = `${element.price}:-`;

        qaDiv.append(subBtn, qaSpan, plusBtn);
        div.append(rmBtn, img, prodName, qaDiv, priceSpan);
        document.querySelector(".product-holder").appendChild(div);

        totSum += Number(element.price)
        document.querySelector(".inputTotSum").innerHTML = `${totSum}:-`;
    });

    document.querySelector(".inputTotProd").innerText = `${shoppingCart.length} PCS`
};

