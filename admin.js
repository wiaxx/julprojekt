// window on load function for check if already logged in as admin
window.addEventListener('load', () => {
    if (JSON.parse(localStorage.getItem("logged")) === true) {
        adminPage.style.display = "none";
        create.style.display = "flex";
    };
});

document.querySelector(".login").addEventListener('click', logIn);
document.querySelector(".forget").addEventListener('click', showAdminCreds);
document.querySelector(".close").addEventListener('click', closeAdminCreds);
document.querySelector(".logOut").addEventListener('click', logOut);
document.querySelector(".saveProd").addEventListener('click', saveProduct);
document.querySelector(".getImg").addEventListener('click', getImg);
document.querySelector(".cancelProd").addEventListener('click', () => {
    document.querySelector("form").reset();
})

//get admin credentials from localStorage
const adminCred = JSON.parse(localStorage.getItem("admin"));

//global variable used in different functions
const passwordInfo = document.querySelector(".passwordInfo");
const adminPage = document.querySelector(".adminPage");
const create = document.querySelector(".create");
const imgHolder = document.querySelector(".imgHold");

//function to check if input value match admin cred saved in localStorage
function logIn(e) {
    e.preventDefault();
    const username = document.querySelector(".username").value;
    const password = document.querySelector("#password").value;

    // check if input username and password matches admin log in creds
    // if yes, change loginForm to display none and show "create product"
    if (username === adminCred.username && password === adminCred.password) {
        adminPage.style.display = "none";
        localStorage.setItem("logged", true);
        create.style.display = "flex";
        document.querySelector("form").reset();
    } else {
        alert("Sorry, wrong username or password");
    };
};

// function to show admin credentials from button "forgot password"
function showAdminCreds(e) {
    e.preventDefault();
    const adminInfo = document.querySelector(".adminInfo");
    adminInfo.innerHTML = `Username is: ${adminCred.username} <br> Password is: ${adminCred.password}`;
    passwordInfo.style.display = "block";
}

//function to close admin crententials
function closeAdminCreds() {
    passwordInfo.style.display = "none";
}

//function to logOut as admin, send you back to logIn form
function logOut() {
    localStorage.setItem("logged", false);
    create.style.display = "none";
    adminPage.style.display = "block";
}

//function to save created product in localStorage
function saveProduct(e) {
    e.preventDefault();
    // variables for input value
    const prodName = document.querySelector(".prodName").value;
    const prodPrice = document.querySelector("#prodPrice").value;
    const prodDesc = document.querySelector(".prodDesc").value;
    const prodInv = document.querySelector("#prodInv").value;
    const prodImg = document.querySelector("#prodImg").value;
    
    // check already stored product IDs, do prevent duplicates
    let id;
    if (localStorage.getItem("prodID") === null) {
        id = 0;
    } else {
        id = JSON.parse(localStorage.getItem("prodID"));
    }

    // if (prodName || prodPrice || prodInv || prodImg === "") {
    //     alert("You forgot to put in some values");
    // }

    // object with all productinformation
    const product = {
        id: id,
        name: prodName,
        desc: prodDesc,
        img: prodImg,
        price: prodPrice,
        inv: prodInv
    };
    console.log(product)

    // check already stored products and push new product to existing
    let products;
    if (localStorage.getItem("products") === null) {
        products = [];
    } else {
        products = JSON.parse(localStorage.getItem("products"));
    }
    products.push(product)
    localStorage.setItem("products", JSON.stringify(products));

    // increase productID and store in localStorage for next product created
    id++;
    localStorage.setItem("prodID", JSON.stringify(id));

    document.querySelector(".prodInfo").reset();
    imgHolder.style.backgroundImage = "none";
};

//function to fetch image and save url to inputfield
async function getImg(e) {
    e.preventDefault();
    const response = await fetch('https://api.unsplash.com/photos/random?client_id=MrBKjudpbn-DaRLVMzoMnS-_1SsFcfWXYBUaSGDkMlw&collections=10165528')
    response.json()
    .then ( res => {
        imgHolder.style.backgroundImage = `url(${res.urls.small})`;
        const imgUrl = document.querySelector("#prodImg");
        imgUrl.value = `${res.urls.small}`;
    });
};