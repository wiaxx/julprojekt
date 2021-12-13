//set admin credentials in localStorage when page is loaded
window.addEventListener('load', () => {
    const adminCred = {
        username: "admin",
        password: "password"
    };
    if (localStorage.getItem("admin") === null) {
        localStorage.setItem("admin", JSON.stringify(adminCred));
    }
});

const dummyProd = [{
    id: 1,
    name: "Monstera Deliciosa",
    desc: "Split-leaf philodendron",
    img: "https://images.unsplash.com/photo-1525498128493-380d1990a112?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80",
    price: 699,
}
    , {
    id: 2,
    name: "Ficus Elastica",
    desc: "Broadleaf evergreen tree",
    img: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLWxpa2VkfDI1fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=600&q=60",
    price: 799,
}, {
    id: 3,
    name: "Lorem ipsum",
    desc: "Dolor sit amet",
    img: "https://images.unsplash.com/photo-1584589167171-541ce45f1eea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    price: 0, 
},
{
    id: 4,
    name: "Eucalyptus Globulus",
    desc: "Aromatic tree",
    img: "https://images.unsplash.com/photo-1533038590840-1cde6e668a91?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLWxpa2VkfDI0fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=600&q=60",
    price: 299,
}, {
    id: 5,
    name: "Ficus Lyrata",
    desc: "Fiddle Leaf Fig Tree ",
    img: "https://images.unsplash.com/photo-1453904300235-0f2f60b15b5d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fHBsYW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60",
    price: 899,
},
]

window.addEventListener('load', () => {
    localStorage.setItem("indexProd", JSON.stringify(dummyProd));
    showIndexProd();
});

function showIndexProd() {
    const shoppingCart = JSON.parse(localStorage.getItem("indexProd"))

    // create allPlantsBtn, append one product only
    let allPlantsBtn = document.createElement("button");
    allPlantsBtn.classList.add("allPlantsBtn");
    allPlantsBtn.textContent = "See all plants";

    shoppingCart.forEach(function (element, i) {
        const div = document.createElement("div");
        div.setAttribute("id", `${element.id}`);
        div.classList.add("indexProduct");
        div.classList.add("indexProduct-" + (i+1));
        
        const divImage = document.createElement("div");
        divImage.classList.add("image");

        const img = document.createElement("img");
        img.setAttribute("src", `${element.img}`);

        const divContent = document.createElement("div");
        divContent.classList.add("content");

        const prodTitle = document.createElement("h3");
        prodTitle.innerText = `${element.name}`
        prodTitle.classList.add("indexProductName");

        const prodDesc = document.createElement("p");
        prodDesc.innerText = `${element.desc}`
        prodDesc.classList.add("indexProductDescription");

        const prodPrice = document.createElement("span");
        prodPrice.innerText = `${element.price}:-`
        prodPrice.classList.add("indexProductPrice");;

        const wishBtn = document.createElement("button");
        wishBtn.innerHTML = '<i class="far fa-heart fa-lg">';
        wishBtn.classList.add("indexProductWishBtn");

        const cartBtn = document.createElement("button");
        cartBtn.innerHTML = '<i class="fas fa-shopping-basket fa-lg">';
        cartBtn.classList.add("indexProductCartBtn");

        // only append allPlantsBtn to product 3
        if (i + 1 === 3) {
            div.append(divImage, divContent);
            divImage.append(img);
            divContent.append(prodTitle, prodDesc, prodPrice, wishBtn, cartBtn, allPlantsBtn);
        } else {
            div.append(divImage, divContent);
            divImage.append(img);
            divContent.append(prodTitle, prodDesc, prodPrice, wishBtn, cartBtn);
        };
        document.querySelector(".newestProducts").appendChild(div);
    });
};
