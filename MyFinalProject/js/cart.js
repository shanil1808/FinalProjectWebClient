let user = JSON.parse(localStorage.getItem("currentUser"));

if (!user) {
    alert("Please login first!");
    window.location.href = "login.html";
}

function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let container = document.getElementById("cartContainer");

    if (cart.length === 0) {
        container.innerHTML = "<p class='text-center'>Cart is empty</p>";
        document.getElementById("grandTotal").innerText = 0;
        return;
    }

    let total = 0;

    container.innerHTML = cart.map((item, index) => {
        let itemTotal = item.price * item.qty;
        total += itemTotal;

        return `
        <div class="card mb-3 p-3 shadow-sm">
            <div class="row align-items-center">
                <div class="col-md-2">
                    <img src="${item.img}" class="img-fluid rounded">
                </div>
                <div class="col-md-3">
                    <h5>${item.name}</h5>
                    <p>$${item.price}</p>
                </div>
                <div class="col-md-3">
                    <input type="number" min="1" value="${item.qty}" class="form-control"
                        onchange="updateQty(${index}, this.value)">
                </div>
                <div class="col-md-2">
                    <h6>$${itemTotal}</h6>
                </div>
                <div class="col-md-2 text-end">
                    <button class="btn btn-danger btn-sm" onclick="removeItem(${index})">
                        Remove
                    </button>
                </div>
            </div>
        </div>
        `;
    }).join("");
    
    document.getElementById("grandTotal").innerText = total;
}

function updateQty(index, qty) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart[index].qty = parseInt(qty);

    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

loadCart();