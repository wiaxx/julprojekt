// window onload event for concat different products list to show all.
window.addEventListener('load', () => {
	let products = JSON.parse(localStorage.getItem("products")) || [];
	let newProducts = JSON.parse(localStorage.getItem("newProducts"));
	if (products.length === 4) {
		if (newProducts !== null) {
			let newProductList = products.concat(dummyProd, newProducts);
			localStorage.setItem('products', JSON.stringify(newProductList))
		} else {
			let productList = products.concat(dummyProd);
			localStorage.setItem('products', JSON.stringify(productList));
		};
	};
	showProd();
});
let dummyProd = [{
	id: 5,
	name: "Pilea Peperomioides",
	desc: "The Chinese Money Plant ",
	img: "https://images.unsplash.com/photo-1614594805320-e6a5549d7f95?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80",
	price: 199,
}, {
	id: 6,
	name: "Asplenium Nidus",
	desc: "The Bird's-Nest Fern",
	img: "https://images.unsplash.com/photo-1636901942318-972ea62b4d5d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80",
	price: 599,
}, {
	id: 7,
	name: "Pachira Aquatica",
	desc: "The Guiana Chestnut",
	img: "https://images.unsplash.com/photo-1633789242668-886f4098ea1c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2564&q=80",
	price: 399,
}, ];

function showProd() {
	const products = JSON.parse(localStorage.getItem("products"));
	let grid = document.createElement("div");
	grid.className = 'grid';
	document.querySelector(".products").prepend(grid);
	products.forEach(function(element, i) {
		const div = document.createElement("div");
		div.setAttribute("id", `${element.id}`);
		div.classList.add("product");
		div.classList.add("product-" + (i + 1));
		const divImage = document.createElement("div");
		divImage.classList.add("image");
		divImage.style.backgroundImage = `url(${element.img})`;
		const divContent = document.createElement("div");
		divContent.classList.add("content");
		const prodTitle = document.createElement("h3");
		prodTitle.innerText = `${element.name}`
		prodTitle.classList.add("productName");
		const prodDesc = document.createElement("p");
		prodDesc.innerText = `${element.desc}`
		prodDesc.classList.add("productDescription");
		const prodPrice = document.createElement("span");
		prodPrice.innerText = `${element.price}:-`
		prodPrice.classList.add("productPrice");;
		const wishBtn = document.createElement("button");
		wishBtn.innerHTML = '<i class="far fa-heart fa-lg">';
		wishBtn.classList.add("productWishBtn");
		const cartBtn = document.createElement("button");
		cartBtn.innerHTML = '<i class="fas fa-shopping-basket fa-lg">';
		cartBtn.classList.add("productCartBtn");
		div.append(divImage, divContent);
		divContent.append(prodTitle, prodDesc, prodPrice, wishBtn, cartBtn);
		grid.appendChild(div);
	});
	document.querySelector(".grid").addEventListener('click', fullHeart);
};
// function for heart button
function fullHeart(e) {
	const wishBtn = e.target.parentElement.offsetParent.childNodes[1].childNodes[3]
	if (e.target.className === "far fa-heart fa-lg") {
		wishBtn.innerHTML = '<i class="fas fa-heart"></i>'
	};
	if (e.target.className === "fas fa-heart") {
		wishBtn.innerHTML = '<i class="far fa-heart fa-lg"></i>'
	};
};