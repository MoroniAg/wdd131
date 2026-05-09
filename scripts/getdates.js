(function () {
  const yearEl = document.getElementById('currentyear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const lastEl = document.getElementById('lastModified');
  if (lastEl) {
    lastEl.textContent = document.lastModified;
  }
})();
