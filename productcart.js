
let cartNumbers = document.querySelectorAll('.cart-btn');

const btn = document.getElementsByClassName('cart-btn')

const productItem = [];

cartNumbers.forEach( (c, i) => {
    c.addEventListener( 'click', () => {
        addItem();  //Add Item(s) to LocalStorage
        updateCart(); //Update the cart amount 
    } );
});

// Function add item(s) to LocalStorage

function addItem() {
    let item = parseInt(localStorage.getItem('item'));

    if(item){  
        localStorage.setItem( 'item', item + 1 ); // if the item has already been placed then keep on adding. //
    }else{
        localStorage.setItem( 'item', 1 ); // if not --> adding the item. //
    }
}

// Show item-qty in localStorage

function updateCart(){
    let item = parseInt(localStorage.getItem('item'));
    
    if(item){
        document.querySelector('.count').innerHTML = item; // if the item has already been placed then update the amount cart. //
    }else{
        document.querySelector('.count').innerHTML = 0; //if not setting to 0. //
    }
    
}  
updateCart();


 // Being to set the item(s) to localStorage

for(var i = 0; i < btn.length; i++){
    let cartBtn = btn[i]
    cartBtn.addEventListener('click', () => {
    
        let dummyProd = {  
            
            image: event.target.parentElement.children[0].src,
            name: event.target.parentElement.children[1].textContent,
            price: event.target.parentElement.children[2].textContent,
            totalPrice: parseInt(event.target.parentElement.children[2].textContent),
            qty: 1
        }
        
        addItemToLocalStorage(dummyProd)
    })
}
// Add item(s) to localStorage

function addItemToLocalStorage(dummyProd){
    let cartItem = JSON.parse(localStorage.getItem('prdInCart'))
    if(cartItem === null ){ 
        productItem.push(dummyProd)
        localStorage.setItem('prdInCart', JSON.stringify(productItem))

    }else{
        cartItem.forEach(item => {
            if(dummyProd.name == item.name){
                dummyProd.qty = item.qty +=  1;
                dummyProd.totalPrice = item.totalPrice += dummyProd.totalPrice;
            }else{
                productItem.push(item)
            }
        });
        productItem.push(dummyProd)
    }
    localStorage.setItem('prdInCart', JSON.stringify(productItem))
    window.location.reload();
}

