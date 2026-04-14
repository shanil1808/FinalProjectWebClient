function loadWishlist() {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    let box = document.getElementById("wishlistBox");

    if (wishlist.length === 0) {
        box.innerHTML = "<p class='text-center'>No items in wishlist</p>";
        return;
    }

    box.innerHTML = wishlist.map((item, index) => `
        <div class="card p-3 mb-3">
            <div class="row align-items-center">

                <div class="col-md-2">
                    <img src="${item.img}" class="img-fluid">
                </div>

                <div class="col-md-6">
                    <h5>${item.name}</h5>
                    <p>$${item.price}</p>
                </div>

                <div class="col-md-4 text-end">
                    <button class="btn btn-danger btn-sm" onclick="removeItem(${index})">
                        Remove
                    </button>
                </div>

            </div>
        </div>
    `).join("");
}

function removeItem(index) {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    wishlist.splice(index, 1);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    loadWishlist();
}

loadWishlist();