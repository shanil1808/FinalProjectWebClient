function login() {
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (!email || !password) {
        alert("Fill all fields!");
        return;
    }

    let user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        alert("Invalid email or password!");
        return;
    }

    localStorage.setItem("currentUser", JSON.stringify(user));
    localStorage.setItem("loggedIn", "true");

    window.location.href = "index.html";
}