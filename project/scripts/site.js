
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('nav-toggle');
    const nav = document.getElementById('nav-site');
    if (btn && nav) {
      btn.addEventListener('click', function () {
        const open = nav.classList.toggle('open');
        btn.innerText = open ? '✕' : '☰';
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        if (open) {
          nav.style.display = 'block';
        } else {
          nav.style.display = '';
        }
      });
    }
  });

  const yearEl = document.getElementById('currentyear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const lastEl = document.getElementById('lastModified');
  if (lastEl) {
    lastEl.textContent = 'Last modified: ' + document.lastModified;
  }
})();
