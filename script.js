
function setLanguage(lang) {
  document.querySelectorAll('[data-ua], [data-en]').forEach(el => {
    el.textContent = el.dataset[lang];
  });
}
