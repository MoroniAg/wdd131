(function () {
    document.addEventListener('DOMContentLoaded', function () {
        try {
            const params = new URLSearchParams(window.location.search);
            const pEmail = params.get('email');
            const pSubject = params.get('subject');
            const pMessage = params.get('message');
            if (pEmail || pSubject || pMessage) {
                const stored = JSON.parse(localStorage.getItem('quicknutri_contacts') || '[]');
                stored.push({ email: pEmail || '', subject: pSubject || '', message: pMessage || '', time: new Date().toISOString() });
                localStorage.setItem('quicknutri_contacts', JSON.stringify(stored));
                // remove params from URL
                const url = new URL(window.location.href);
                url.search = '';
                window.history.replaceState({}, '', url.toString());
            }
        } catch (err) {
            console.error('Failed to parse URL params for contact save', err);
        }

        const form = document.getElementById('contact-form');
        const status = document.getElementById('contact-status');

        if (form) {
            form.addEventListener('submit', function (e) {
                e.preventDefault();
                const email = form.email.value.trim();
                const subject = form.subject.value.trim();
                const message = form.message.value.trim();

                if (!email || !subject || !message) {
                    status.textContent = 'Please complete all required fields.';
                    status.style.color = '#b3261e';
                    return;
                }

                try {
                    const stored = JSON.parse(localStorage.getItem('quicknutri_contacts') || '[]');
                    stored.push({ email, subject, message, time: new Date().toISOString() });
                    localStorage.setItem('quicknutri_contacts', JSON.stringify(stored));
                    status.textContent = 'Thanks! Your message was saved.';
                    status.style.color = 'var(--brand)';
                    form.reset();
                } catch (err) {
                    status.textContent = 'Could not save message locally.';
                    status.style.color = '#b3261e';
                    console.error('contact save failed', err);
                }
            });
        }

        const listEl = document.getElementById('contacts-list');
        const empty = document.getElementById('contacts-empty');
        if (listEl) {
            try {
                const stored = JSON.parse(localStorage.getItem('quicknutri_contacts') || '[]');
                if (!stored.length) {
                    if (empty) empty.style.display = '';
                    return;
                }
                if (empty) empty.style.display = 'none';
                stored.slice().reverse().forEach(function (item) {
                    const article = document.createElement('article');
                    article.className = 'contact-item';
                    const subject = document.createElement('h3');
                    subject.textContent = item.subject;
                    const email = document.createElement('p');
                    email.innerHTML = `<strong>Email:</strong> ${item.email}`;
                    const message = document.createElement('p');
                    message.textContent = item.message;
                    const time = document.createElement('p');
                    time.className = 'muted';
                    time.textContent = 'Sent: ' + new Date(item.time).toLocaleString();
                    article.appendChild(subject);
                    article.appendChild(email);
                    article.appendChild(message);
                    article.appendChild(time);
                    listEl.appendChild(article);
                });
            } catch (err) {
                listEl.textContent = 'Could not read saved contacts.';
                console.error(err);
            }
        }
    });
})();
