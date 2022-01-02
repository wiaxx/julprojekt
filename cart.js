// Hämtar produkterna från localStorage o måste bli rätt produkt-item(s) som sätt i localStorage shopping-cart

//window.localStorage.getItem('products');//

JSON.parse(window.localStorage.getItem('products')) || [];

// Load Cart From LocalStorage 
window.addEventListener('load', () => {
    localStorage.getItem('products', JSON.stringify)
    let products = JSON.parse(localStorage.getItem("products")) || [];

    let addToCartBtn = document.querySelectorAll('.productCartBtn');
    addToCartBtn.forEach((c, i) => {
        c.addEventListener('click', () => {
            addItem();  // Add item(s) to localStorage
            showCartBtn(); // Update cart btn amount
            addCartItem(products[i]);

        });

    });

    // Add item(s) to localStorage

    function addItem() {

        let item = parseInt(localStorage.getItem('itemInCart'));

        if (item) {
            localStorage.setItem('itemInCart', item + 1);
        } else {
            localStorage.setItem('itemInCart', 1);
        };

    };

    function showCartBtn() {
        let item = JSON.parse(localStorage.getItem('itemInCart'));

        if (item) {
            document.getElementById('shopping-cart').innerText = item;
        } else {
            document.getElementById('shopping-cart').innerText = 0;
        };
    };

    function addCartItem(products) {

        let cartItem = JSON.parse(localStorage.getItem('cart-item')) || [];

        // Check a value here ......
        if (cartItem != null) {

            // Check the value undefined or not? If not.....//
            if (cartItem[products.id] == undefined) {
                // Add item(s)
                products.qty = 1;
                cartItem = {
                    ...cartItem,
                    [products.id]: products
                }

            } else {
                // If item(s) has already been placed add more item(s)
                cartItem[products.id].qty += 1;
            }

        } else {

            products.qty = 1;
            cartItem = {
                [products.id]: products
            }
        }
        // Convert object to an array //
        let prdInCart = Object.values(cartItem);

        localStorage.setItem('prdInCart', JSON.stringify(prdInCart));

        localStorage.setItem('cart-item', JSON.stringify(cartItem));


        getTotalCost(products.price);

    }

    function getTotalCost(price) {

        let totalCost = localStorage.getItem('costTotal');

        if (totalCost != null) {
            totalCost = parseInt(totalCost);
            totalCost += price;
        } else {
            totalCost = price;
        }

        localStorage.setItem('costTotal', totalCost);
    }

});
