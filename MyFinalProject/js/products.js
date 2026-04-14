//Array of products
const products = [
    {id:1, name:"iPhone 17", price:1129, category:"Apple", img:"images/17promax.jpg"},
    {id:2, name:"iPhone 16", price:999, category:"Apple", img:"images/ip2.jpg"},
    {id:3, name:"iPhone 15", price:499, category:"Apple", img:"images/ip3.jpg"},
    {id:4, name:"Samsung Galaxy S26", price:1850, category:"Samsung", img:"images/Samsung.jpg"},
    {id:5, name:"Samsung Galaxy Z Fold7", price:3000, category:"Samsung", img:"images/s2.jpg"},
    {id:6, name:"Samsung Galaxy Tab A11+", price:500, category:"Samsung", img:"images/s3.jpg"},
    {id:7, name:"Google Pixel 8", price:450, category:"Google", img:"images/googlepixel.jpg"},
    {id:8, name:"Google Pixel 10", price:1099.99, category:"Google", img:"images/gp10.jpg"},
    {id:9, name:"Google Pixel 9", price:658, category:"Google", img:"images/gp3.jpg"},
    {id:10, name:"HUAWEI P30", price:545, category:"Huawei", img:"images/Huawei.jpg"},
    {id:11, name:"Huawei P40", price:575, category:"Huawei", img:"images/h2.jpg"},
    {id:12, name:"HUAWEI Nova 5T", price:399, category:"Huawei", img:"images/h3.jpg"}
];

//Category set to "All" by default
let currentCategory = "All";

// READ CATEGORY FROM URL
const params = new URLSearchParams(window.location.search);
const categoryFromURL = params.get("cat");

if (categoryFromURL) {
    currentCategory = categoryFromURL;
}

const searchInput = document.getElementById("search");
if (searchInput) {
    searchInput.addEventListener("keyup", displayProducts);
}

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

function displayProducts() {
    const list = document.getElementById("productList");
    const search = document.getElementById("search")?.value.toLowerCase() || "";

    list.innerHTML = "";

    products.forEach(p => {
        const matchCategory =
            currentCategory === "All" || p.category === currentCategory;
        const matchSearch =
            p.name.toLowerCase().includes(search);

        if (matchCategory && matchSearch) {
            list.innerHTML += `
                <div class="col-md-3 col-sm-6 mb-3">
                    <div class="card p-2 text-center position-relative">
                        <i class="bi bi-heart-fill wishlist-icon" onclick="addToWishlist(${p.id})"></i>

                        <img src="${p.img}" class="img-fluid">
                        <h6>${p.name}</h6>
                        <p>$${p.price}</p>

                        <a href="productDetails.html?id=${p.id}" class="btn btn-dark btn-sm mb-1">View Details</a>
                        <button class="btn btn-outline-dark btn-sm" onclick="addToCart(${p.id})">Add to Cart</button>
                    </div>
                </div>
            `;
        }
    });
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push({
        ...product,
        qty: 1
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart!");
}

function filterProducts(cat, btn) {
    currentCategory = cat;

    document.querySelectorAll(".filter-btn").forEach(b => {
        b.classList.remove("btn-dark");
        b.classList.add("btn-outline-dark");
    });

    if (btn) {
        btn.classList.remove("btn-outline-dark");
        btn.classList.add("btn-dark");
    }

    displayProducts();
}

// load products by default
displayProducts();