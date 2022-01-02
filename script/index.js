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
	desc: "The Swiss Cheese Plant",
	img: "https://images.unsplash.com/photo-1637967885705-a60e3fea266d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2564&q=80",
	price: 699,
}, {
	id: 2,
	name: "Musa acuminata",
	desc: "The Dwarf Cavendish Banana",
	img: "https://images.unsplash.com/photo-1638824097313-8a42fef7c87c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80",
	price: 799,
}, {
	id: 3,
	name: "Zamioculcas Zamiifolia",
	desc: "Zanzibar Gem",
	img: "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80",
	price: 299,
}, {
	id: 4,
	name: "Dracaena trifasciata",
	desc: "Snake Plant",
	img: "https://images.unsplash.com/photo-1638824096986-5c5ed96d118a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80",
	price: 259,
}, ]
window.addEventListener('load', () => {
	localStorage.setItem("products", JSON.stringify(dummyProd));
	showProd();
});

function showProd() {
	const shoppingCart = JSON.parse(localStorage.getItem("products"));
	let indexGrid = document.createElement("div");
	indexGrid.className = 'indexGrid';
	document.querySelector(".newestProducts").prepend(indexGrid);
	shoppingCart.forEach(function(element, i) {
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
		indexGrid.appendChild(div);
	});
	document.querySelector(".indexGrid").addEventListener('click', fullHeart);
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