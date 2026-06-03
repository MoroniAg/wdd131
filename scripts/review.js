window.addEventListener('DOMContentLoaded', () => {
  try {
    const ref = document.referrer || '';
    const cameFromForm = ref.includes('form.html') || ref.endsWith('/form.html');
    // Also consider query params present (form submitted via GET)
    const hasQuery = location.search && location.search.length > 0;
    if (cameFromForm || hasQuery) {
      const key = 'reviewsCompleted';
      const current = parseInt(localStorage.getItem(key) || '0', 10);
      localStorage.setItem(key, String(current + 1));
    }
  } catch (e) {
    // ignore storage errors
  }
});

window.addEventListener('DOMContentLoaded', () => {
  try {
    const key = 'reviewsCompleted';
    const value = parseInt(localStorage.getItem(key) || '0', 10);
    const el = document.getElementById('count');
    if (el) el.textContent = String(value);
  } catch (e) {
    // ignore
  }
});
