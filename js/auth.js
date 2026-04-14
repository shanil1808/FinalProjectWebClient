function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
}

window.onload = function () {
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
    }
};

function getUser() {
    return JSON.parse(localStorage.getItem("currentUser"));
}

function logout() {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("loggedIn");
    location.href = "index.html";
}

function updateNavbarAuth() {
    const user = getUser();
    const authArea = document.querySelector(".auth-area");

    if (!authArea) return;

    if (user) {
        authArea.innerHTML = `
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">
                     <i class="bi bi-person"></i>${user.name}
                </a>
                <ul class="dropdown-menu dropdown-menu-end">
                    <li><a class="dropdown-item" href="profile.html">Profile</a></li>
                    <li><a class="dropdown-item text-danger" href="#" onclick="logout()">Logout</a></li>
                </ul>
            </li>
        `;
    } else {
        authArea.innerHTML = `
            <li class="nav-item"><a class="nav-link" href="login.html">Login</a></li>
            <li class="nav-item"><a class="nav-link" href="register.html">Register</a></li>
        `;
    }
}

document.addEventListener("DOMContentLoaded", updateNavbarAuth);