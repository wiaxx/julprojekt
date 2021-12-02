document.querySelector(".login").addEventListener('click', logIn);

//function to check if input value match admin cred saved in localStorage
function logIn(e) {
    e.preventDefault();
    const username = document.querySelector(".username").value;
    const password = document.querySelector("#password").value;

    // get admin credentials from localStorage
    const adminCred = JSON.parse(localStorage.getItem("admin"));

    // check if input username and password matches admin log in creds
    // if yes, change loginForm to display none and show welcome and "create product" btn
    if (username === adminCred.username && password === adminCred.password) {
        const loginForm = document.querySelector(".loginForm");
        loginForm.style.display = "none";

        const h1 = document.createElement("h1");
        h1.innerText = "Welcome Admin!";
        document.querySelector("main").appendChild(h1);
        
        //call function to create "create product" button
        // createProdBtn();

    } else {
        alert("Sorry, wrong username or password");
    };
};

