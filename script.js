
function setLanguage(lang) {
    localStorage.setItem("lang", lang);
    translatePage(lang);
    const links = document.querySelectorAll("a");
    links.forEach(link => {
        if (link.href.includes("cart.html")) {
            const url = new URL(link.href);
            url.searchParams.set("lang", lang);
            link.href = url.toString();
        }
    });
}

function getLanguage() {
    return localStorage.getItem("lang") || "ua";
}

function applyLanguageOnLoad() {
    const lang = getLanguage();
    translatePage(lang);
    document.getElementById("langSwitch").value = lang;
}

function translatePage(lang) {
    const translations = {
        ua: {
            addToCart: "Додати в кошик",
            cart: "Кошик",
            confirmWhatsapp: "Підтвердити через WhatsApp",
            confirmMessenger: "Підтвердити через Messenger",
            delete: "Видалити",
            quantity: "Кількість",
            shades: "Відтінки"
        },
        en: {
            addToCart: "Add to cart",
            cart: "Cart",
            confirmWhatsapp: "Confirm via WhatsApp",
            confirmMessenger: "Confirm via Messenger",
            delete: "Delete",
            quantity: "Quantity",
            shades: "Shades"
        }
    };

    const t = translations[lang];
    document.querySelectorAll("[data-translate]").forEach(el => {
        const key = el.getAttribute("data-translate");
        if (t[key]) el.textContent = t[key];
    });
}


function setLanguage(lang) {
    document.querySelectorAll('[data-lang-' + lang + ']').forEach(el => {
        el.textContent = el.getAttribute('data-lang-' + lang);
    });
}
function sendOrder(method) {
    if (method === 'whatsapp') {
        window.open('https://wa.me/14372441529', '_blank');
    } else if (method === 'messenger') {
        window.open('https://www.facebook.com/share/19esF7jcEz/?mibextid=wwXIfr', '_blank');
    }
}

let cart = [];

function toggleCart() {
    const cartSection = document.querySelector('.order');
    cartSection.style.display = cartSection.style.display === 'none' ? 'block' : 'none';
}

function setLanguage(lang) {
    document.querySelectorAll('[data-lang-' + lang + ']').forEach(el => {
        el.textContent = el.getAttribute('data-lang-' + lang);
    });
}

document.querySelectorAll('.gallery-item button').forEach((btn, index) => {
    btn.addEventListener('click', () => {
        const item = btn.closest('.gallery-item');
        const img = item.querySelector('img');
        const shades = item.querySelector('input').value;
        const imgSrc = img.getAttribute('src');
        const imgClone = img.cloneNode();
        imgClone.classList.add('animated-to-cart');
        document.body.appendChild(imgClone);
        const rect = img.getBoundingClientRect();
        imgClone.style.position = 'absolute';
        imgClone.style.left = rect.left + 'px';
        imgClone.style.top = rect.top + 'px';
        imgClone.style.width = img.width + 'px';
        imgClone.style.zIndex = 1000;
        setTimeout(() => document.body.removeChild(imgClone), 1000);
        cart.push({ img: imgSrc, shades: shades, qty: 1 });
        renderCart();
    });
});

function renderCart() {
    const container = document.getElementById('cart-items');
    container.innerHTML = '';
    cart.forEach((item, index) => {
        const div = document.createElement('div');
        div.innerHTML = `
            <div>
                <img src="${item.img}" width="100" />
                <p>Відтінки: ${item.shades}</p>
                <p>Кількість: ${item.qty}</p>
                <button onclick="removeFromCart(${index})">❌</button>
            </div>
        `;
        container.appendChild(div);
    });
}

function removeFromCart(index) {
    cart.splice(index, 1);
    renderCart();
}

function sendOrder(method) {
    if (cart.length === 0) {
        alert("Кошик порожній.");
        return;
    }
    let message = "✅ Замовлення VitaSweets:%0A";
    cart.forEach((item, i) => {
        message += `${i+1}. ${item.img} — Відтінки: ${item.shades}%0A`;
    });

    if (method === 'whatsapp') {
        window.open('https://wa.me/14372441529?text=' + message, '_blank');
    } else if (method === 'messenger') {
        window.open('https://www.facebook.com/share/19esF7jcEz/?mibextid=wwXIfr', '_blank');
    }
}

function toggleModal(id) {
    const modal = document.getElementById(id);
    if (modal.style.display === "block") {
        modal.style.display = "none";
    } else {
        modal.style.display = "block";
        if (id === "cartModal") renderModalCart();
    }
}

function renderModalCart() {
    const container = document.getElementById('modal-cart-items');
    container.innerHTML = '';
    cart.forEach((item, index) => {
        const div = document.createElement('div');
        div.innerHTML = `
            <div style="margin-bottom: 10px;">
                <img src="${item.img}" width="100" />
                <p>Відтінки: ${item.shades}</p>
                <p>Кількість: ${item.qty}</p>
                <button onclick="removeFromCart(${index})">❌ Видалити</button>
            </div>
        `;
        container.appendChild(div);
    });
}

// Галерея: відкриття фото у modal
document.querySelectorAll('.gallery-item img').forEach((img) => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => {
        document.getElementById('modalImage').src = img.src;
        toggleModal('imageModal');
    });
});

function scrollToGallery() {
    const gallery = document.getElementById('gallery');
    gallery.scrollIntoView({ behavior: 'smooth' });
}

function updateLocalCart() {
    localStorage.setItem('vitasweets_cart', JSON.stringify(cart));
}

function renderCart() {
    updateLocalCart();
}


function animateAddToCart(imgElement) {
    const imgRect = imgElement.getBoundingClientRect();
    const cartIcon = document.getElementById("cart-icon");
    const cartRect = cartIcon.getBoundingClientRect();

    const clonedImg = imgElement.cloneNode(true);
    clonedImg.style.position = 'absolute';
    clonedImg.style.top = imgRect.top + 'px';
    clonedImg.style.left = imgRect.left + 'px';
    clonedImg.style.width = imgRect.width + 'px';
    clonedImg.style.height = imgRect.height + 'px';
    clonedImg.classList.add('fly-to-cart');

    document.body.appendChild(clonedImg);

    setTimeout(() => {
        document.body.removeChild(clonedImg);
    }, 1000);
}
