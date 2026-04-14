let cart = JSON.parse(localStorage.getItem("cart")) || [];
let user = JSON.parse(localStorage.getItem("currentUser"));

if (!user) {
    alert("Please login first!");
    window.location.href = "login.html";
}

function loadSummary() {
    let summary = document.getElementById("summary");
    let total = 0;

    if (cart.length === 0) {
        alert("Your cart is empty!");
        window.location.href = "cart.html";
    }

    summary.innerHTML = cart.map(item => {
        let itemTotal = item.price * item.qty;
        total += itemTotal;

        return `
            <div class="d-flex justify-content-between border-bottom py-2">
                <span>${item.name} (x${item.qty})</span>
                <strong>$${itemTotal}</strong>
            </div>
        `;
    }).join("");

    document.getElementById("total").innerText = total;
}

document.getElementById("checkoutForm").addEventListener("submit", function(e){
    e.preventDefault();

    let name = document.getElementById("name").value.trim();
    let address = document.getElementById("address").value.trim();
    let payment = document.getElementById("payment").value;

    if (!name || !address || !payment) {
        alert("Please fill all fields!");
        return;
    }

    let modal = new bootstrap.Modal(document.getElementById("successModal"));
    modal.show();
});

function clearCart() {
    localStorage.removeItem("cart");
    window.location.href = "index.html";
}

loadSummary();