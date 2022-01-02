JSON.parse(window.localStorage.getItem('products')) || [];

window.addEventListener('load', () => {
    localStorage.getItem('products', JSON.stringify)
    let products = JSON.parse(localStorage.getItem("products")) || [];
    
    let addToWishBtn = document.querySelectorAll('.productWishBtn');
    addToWishBtn.forEach((c, i) => {
        c.addEventListener('click', () => {
            addItem();  
            showWishBtn(); 
            addWishItem(products[i]);
            
        } );
      
    } );
})

function addItem() {

    let item = parseInt(localStorage.getItem('itemInWishList'));

    if (item) {
        localStorage.setItem('itemInWishList', item + 1);
    } else {
        localStorage.setItem('itemInWishList', 1);
    };
    
};

function showWishBtn() {
    let item = JSON.parse(localStorage.getItem('itemInWishList'));

    if (item) {
        document.getElementById('wishlist').innerText = item;
    } else {
        document.getElementById('wishlist').innerText = 0;
    };
};

function addWishItem(products) {
        
    let wishItem = JSON.parse(localStorage.getItem('wish-item')) || [];

 
    if(wishItem != null){


        if (wishItem[products.id] == undefined) {
   
            products.qty = 1; 
            wishItem = {
                ...wishItem,
                [products.id]:products
            }

        }
        
    }else {

        products.qty = 1;
        wishItem = {
            [products.id]:products
        }
    }

    let prdInWish = Object.values(wishItem);
    
    localStorage.setItem('prdInWish', JSON.stringify(prdInWish) );

    localStorage.setItem('wish-item', JSON.stringify(wishItem) );

}

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