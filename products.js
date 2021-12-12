// Products list ////

// Copy code from app.js and continue ------> changing const to let instead


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







// Add To Cart Button //

window.onload = function(){
    // check cart box 
    const cart = document.querySelector('.cart');
    const cartBox = querySelector('.cartBox');
    cart.addEventListener("click", function(){
        alert('shopping cart is working');
    });


}


/*  $(document).ready(function(){
    var cartCountValue = 0;
    var cartCount = $('.cart .count');
    $(cartCount).text(cartCountValue);

    $('.cart-btn').on('click', function(){
        var cartBtn = this;
        var cartCountPosition = $(cartCount).offset();
        var btnPosition = $(this).offset();
        var leftPos = 
        cartCountPosition.left < btnPosition.left
        ? btnPosition.left - (btnPosition.left - cartCountPosition.left):cartCountPosition.left;

        var topPos =cartCountPosition.top < btnPosition.top
        ? cartCountPosition.top
        : cartCountPosition.top;
        $(cartBtn).append("<span class='count'>1</span>");

        $(cartBtn).find(".count").each(function(i, count){
            $(count).offset({
                left: leftPos,
                top: topPos
            })
            .animate(
            {
                opcity: 0
            },
                800,
                function(){
                    $(this).remove();
                    cartCountValue++;
                    $(cartCount).text(cartCountValue);
                }
            );
        });
    });

}); */