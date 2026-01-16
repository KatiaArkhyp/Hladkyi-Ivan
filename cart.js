function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    document.querySelectorAll(".cart-count").forEach(el => {
        el.textContent = count;
    });
}

document.addEventListener("click", function (e) {
    if (e.target.classList.contains("add-to-cart")) {
        const btn = e.target;

        const product = {
            title: btn.dataset.title,
            price: Number(btn.dataset.price),
            img: btn.dataset.img,
            qty: 1
        };

        const cart = getCart();
        const existing = cart.find(item => item.title === product.title);

        if (existing) {
            existing.qty++;
        } else {
            cart.push(product);
        }

        saveCart(cart);
        updateCartCount();
    }
});

updateCartCount();

const cartList = document.querySelector(".cart-list");
const totalEl = document.querySelector(".cart-total strong");

if (cartList) {
    const cart = getCart();
    let total = 0;

    cartList.innerHTML = "";

    cart.forEach((item, index) => {
        total += item.price * item.qty;

        cartList.innerHTML += `
            <div class="cart-item">
                <img src="${item.img}">
                <div class="cart-info">
                    <h3>${item.title}</h3>
                    <p>${item.price} грн × ${item.qty}</p>
                </div>
                <button class="remove-item" data-index="${index}">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
    });

    totalEl.textContent = total + " грн";
}
document.addEventListener("click", function (e) {
    if (e.target.closest(".remove-item")) {
        const index = e.target.closest(".remove-item").dataset.index;
        const cart = getCart();

        cart.splice(index, 1);
        saveCart(cart);
        location.reload();
    }
});
