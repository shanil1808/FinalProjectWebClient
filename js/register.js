function register() {
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value;
    let confirm = document.getElementById("confirm").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (!name || !email || !password || !confirm) {
        alert("All fields are required!");
        return;
    }

    if (!email.includes("@")) {
        alert("Enter valid email!");
        return;
    }

    if (password.length < 4) {
        alert("Password must be at least 4 characters!");
        return;
    }

    if (password !== confirm) {
        alert("Passwords do not match!");
        return;
    }

    //Check if user exists
    let exists = users.find(u => u.email === email);

    if (exists) {
        alert("Account already exists! Please login.");
        window.location.href = "login.html";
        return;
    }

    //Add user to localStorage
    users.push({ name, email, password });

    localStorage.setItem("users", JSON.stringify(users));

    alert("Account created!");
    window.location.href = "login.html";
}