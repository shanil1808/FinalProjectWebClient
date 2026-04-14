//Array of products
const products = [
  {id:1, name:"iPhone 17", price:1129, img:"images/17promax.jpg", brand:"Apple"},
  {id:2, name:"iPhone 16", price:999, img:"images/ip2.jpg", brand:"Apple"},
  {id:3, name:"iPhone 15", price:499, img:"images/ip3.jpg", brand:"Apple"},
  {id:4, name:"Samsung Galaxy S26", price:1850, img:"images/Samsung.jpg", brand:"Samsung"},
  {id:5, name:"Samsung Galaxy Z Fold7", price:3000, img:"images/s2.jpg", brand:"Samsung"},
  {id:6, name:"Samsung Galaxy Tab A11+", price:500, img:"images/s3.jpg", brand:"Samsung"},
  {id:7, name:"Google Pixel 8", price:450, img:"images/googlepixel.jpg", brand:"Google"},
  {id:8, name:"Google Pixel 10", price:1099.99, img:"images/gp10.jpg", brand:"Google"},
  {id:9, name:"Google Pixel 9", price:658, img:"images/gp3.jpg", brand:"Google"},
  {id:10, name:"Huawei P30", price:545, img:"images/Huawei.jpg", brand:"Huawei"},
  {id:11, name:"Huawei P40", price:575, img:"images/h2.jpg", brand:"Huawei"},
  {id:12, name:"HUAWEI Nova 5T", price:399, img:"images/h3.jpg", brand:"Huawei"}
];

const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"));

const product = products.find(p => p.id === id);

function addToWishlist(id) {
    const product = products.find(p => p.id === id);
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    let exists = wishlist.find(item => item.id === id);

    if (exists) {
        alert("Already in wishlist!");
        return;
    }

    wishlist.push(product);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    alert("Added to wishlist");
}

if (!product) {
  document.getElementById("productBox").innerHTML = `
    <div class="text-center py-5">
      <h3 class="text-danger">Product not found</h3>
    </div>
  `;
} else {
  document.getElementById("productBox").innerHTML = `
    <div class="col-md-6 bg-light d-flex align-items-center justify-content-center p-4">
      <img src="${product.img}" class="img-fluid" style="max-height:350px; object-fit:contain;">
    </div>

    <div class="col-md-6 p-4">
      <i class="bi bi-heart-fill wishlist-icon" onclick="addToWishlist(${product.id})"></i>
      <span class="badge bg-dark mb-2">${product.brand}</span>
      <h2 class="fw-bold mb-2">${product.name}</h2>
      <p class="text-muted">
        Premium quality smartphone with modern performance and smooth experience.
      </p>
      <h3 class="text-success mb-4">$${product.price}</h3>

      <div class="mb-3">
        <label class="form-label fw-semibold">Quantity</label>
        <input type="number" id="qty" class="form-control w-50" value="1" min="1">
      </div>

      <div class="p-3 bg-light rounded mb-3">
        <h5 class="mb-0">Total: $<span id="total">${product.price}</span></h5>
      </div>

      <button class="btn btn-dark w-100 py-2 rounded-3 shadow-sm" onclick="addToCart()">
        Add to Cart
      </button>
    </div>
  `;

  const qtyInput = document.getElementById("qty");

  qtyInput.addEventListener("input", function() {
    document.getElementById("total").innerText = product.price * this.value;
  });

  window.addToCart = function() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push({
      ...product,
      qty: parseInt(qtyInput.value)
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    const btn = event.target;
    btn.innerText = "Added";
    btn.classList.add("btn-success");

    setTimeout(() => {
      btn.innerText = "Add to Cart";
      btn.classList.remove("btn-success");
    }, 1200);
  }
}