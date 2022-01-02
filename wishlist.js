window.addEventListener('load', () => {
    let wishlist = JSON.parse(localStorage.getItem('prdInWish')) || [];
    const wishlistDiv = document.querySelector('.wish-items');

    wishlist.forEach(item => {
        const div = document.createElement("div");
        const img = document.createElement("img");
        const prodTitle = document.createElement("h3");
        const prodPrice = document.createElement("span");
        const wishBtn = document.createElement("button");

        div.classList.add('wishCard');
        img.setAttribute("src", `${item.img}`);
        img.classList.add("wlImg");
        prodTitle.innerText = `${item.name}`
        prodTitle.classList.add("productName");
        prodPrice.innerText = `${item.price}:-`
        prodPrice.classList.add("productPrice");;
        wishBtn.innerHTML = '<i class="fas fa-heart">';
        wishBtn.classList.add("wishBtn");

        // const cartBtn = document.createElement("button");
        // cartBtn.innerHTML = '<i class="fas fa-shopping-basket fa-lg">';
        // cartBtn.classList.add("productCartBtn");
        div.append(img, prodTitle, prodPrice, wishBtn);
        wishlistDiv.appendChild(div);
    });
});


/*
window.addEventListener('DOMContentLoaded', () => {
    showWishList();
});

const updateLS = (array, key, value, storage) => {
    const index = array.findIndex( x => x[key] == value);
    const removedObj = array.splice(index, 1);
    localStorage.setItem(`${storage}`, JSON.stringify(array));
   return removedObj;
};

const wishList = JSON.parse(localStorage.getItem('prdInWish'));


function removeOrChange(e) {
    if (e.target.className === 'wishRemove') {
        removeWishItem(e);
};


function removeWishItem(e) {
    const element = e.target.parentElement; 
    const targetItem = e.target.parentElement.id; 
    const wishListItems = JSON.parse(localStorage.getItem("prdInWish")); 

    const removed = updateLS(wishListItems, "id", targetItem, "prdInWish")
    
    const quantOfProd = e.target.parentElement.children[3].children[1].value;
    const numberOfProd = Number(quantOfProd);
    
    element.remove();
    totProdsDiv.innerText = `${totQty -= quantOfProd} PCS`;
 };
}
*/