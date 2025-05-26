
function setLanguage(lang) {
    document.querySelectorAll('[data-uk]').forEach(el => {
        el.textContent = el.getAttribute(`data-${lang}`);
    });
}

const cart = [];

function addToCart(image) {
    const input = event.target.previousElementSibling;
    const color = input.value || "Без коментарів";
    cart.push({ image, color });
    alert("Додано до кошика!");
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartDiv = document.getElementById("cart");
    cartDiv.innerHTML = "";
    cart.forEach((item, index) => {
        const div = document.createElement("div");
        div.textContent = `Позиція ${index + 1}: ${item.image} | Відтінки: ${item.color}`;
        cartDiv.appendChild(div);
    });
}

function sendOrder() {
    if (cart.length === 0) {
        alert("Кошик порожній!");
        return;
    }
    const message = cart.map((item, i) => `Позиція ${i+1}: ${item.image}, Відтінки: ${item.color}`).join("%0A");
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/14372441529?text=${encodedMessage}`, "_blank");
}
