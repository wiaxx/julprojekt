// Shopping Cart Button //

// Copy code from shopping cart.js and continue ------> changing const to let instead

let dummyProd = [{
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
    price: 259,
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

// Add data to Cart Button //

let cartBtn = document.querySelectorAll('.cart-btn');

cartBtn.forEach((c, i) => {
    c.addEventListener('click', () => {
        addItem();  //Add Item(s) to LocalStorage
        updateCart(); //Update the cart amount 
        addCartItem(dummyProd[i]);
    });
});

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

function addCartItem(dummyProd) {

    let cartItem = JSON.parse(localStorage.getItem('cart-item')); //converter string to arrays

    //check the value, has been placed or not? //
    console.log(cartItem)
    if (cartItem != null) {

        // check if the value = undefined ? //
        if (cartItem[dummyProd.id] === undefined) { // if the value in cart item is undefined. //
            dummyProd.qty = 1;                    // then assign by adding item + 1 (add more product++) //
            cartItem = {
                ...cartItem,                     // all items that has already been placed in cart item //
                [dummyProd.id]: dummyProd          // and add new item(s)
            }
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

    localStorage.setItem('cart-item', JSON.stringify(cartItem));
};