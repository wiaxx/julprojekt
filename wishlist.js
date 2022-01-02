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