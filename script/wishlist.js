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
        div.append(img, prodTitle, prodPrice, wishBtn);
        wishlistDiv.appendChild(div);
    });
});