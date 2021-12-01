window.addEventListener('load', () => {
    const adminCred = {
        username: "admin",
        password: "password"
    };
    if (localStorage.getItem("admin") === null) {
        localStorage.setItem("admin", JSON.stringify(adminCred));
    }
});