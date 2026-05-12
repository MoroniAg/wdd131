// Mobile nav toggle for hamburger button
document.addEventListener('DOMContentLoaded', function () {
	const btn = document.getElementById('nav-toggle');
	const nav = document.getElementById('nav-site');
	if (!btn || !nav) return;
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
});

