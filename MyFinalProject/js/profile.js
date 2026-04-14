let user = JSON.parse(localStorage.getItem("currentUser"));

if (!user) {
    document.getElementById("profileBox").innerHTML =
        "<p>Please login first</p>";
} else {
    document.getElementById("profileBox").innerHTML = `
        <div class="card p-4 shadow-sm w-50 mx-auto">
            <h4>${user.name}</h4>
            <p>${user.email}</p>

            <button class="btn btn-danger" onclick="logout()">Logout</button>
        </div>
    `;
}

function logout() {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("loggedIn");
    window.location.href = "index.html";
}