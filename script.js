
function setLanguage(lang) {
  document.querySelectorAll('[data-ua], [data-en]').forEach(el => {
    el.textContent = el.dataset[lang];
  });
}
function sendMessage() {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const text = `Привіт! Мене звати ${name}. Я хочу замовити: ${message}. Мій email: ${email}`;
  const encoded = encodeURIComponent(text);
  document.getElementById('whatsapp-link').href = `https://wa.me/14372441529?text=${encoded}`;
  document.getElementById('instagram-link').href = `https://instagram.com/vitas_weet`;
}
