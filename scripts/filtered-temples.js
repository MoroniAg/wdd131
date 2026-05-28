const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  {
    templeName: "Rome Italy",
    location: "Rome, Italy",
    dedicated: "2010, March, 14",
    area: 12400,
    imageUrl:
      "https://www.churchofjesuschrist.org/imgs/17e2c70d687fffedfe115197e57fa8f5d1d369bb/full/500%2C/0/default"
  },
  {
    templeName: "Tokyo Japan",
    location: "Tokyo, Japan",
    dedicated: "1999, September, 12",
    area: 15800,
    imageUrl:
      "https://www.churchofjesuschrist.org/imgs/df6b96801c9f11ec99eeeeeeac1ea2207e7c517b/full/500%2C/0/default"
  },
  {
    templeName: "Salt Lake City Utah",
    location: "Salt Lake City, Utah, United States",
    dedicated: "1893, April, 6",
    area: 253000,
    imageUrl:
      "https://www.churchofjesuschrist.org/imgs/64de5983126b11eca393eeeeac1e50dfc2db6c7e/full/500%2C/0/default"
  },
  {
    templeName: "Apia Samoa",
    location: "Apia, Samoa",
    dedicated: "1983, June, 17",
    area: 8700,
    imageUrl:
      "https://www.churchofjesuschrist.org/imgs/6007b20e832459d2d8540c15a8f5fa80d7dcff0f/full/500%2C/0/default"
  },
  {
    templeName: "Bern Switzerland",
    location: "Bern, Switzerland",
    dedicated: "1955, September, 11",
    area: 11600,
    imageUrl:
      "https://www.churchofjesuschrist.org/imgs/a2c415301c7991e2e10059b5ec588a28785917b0/full/500%2C/0/default"
  },
  {
    templeName: "Accra Ghana",
    location: "Accra, Ghana",
    dedicated: "2004, December, 11",
    area: 11200,
    imageUrl:
      "https://www.churchofjesuschrist.org/imgs/7cf8e8b9e5a5a1f379d4e2c9bc2166f9c6007aca/full/500%2C/0/default"
  }

];


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

  renderTemples(temples);
});

function renderTemples(list) {
  const grid = document.querySelector('.temples-grid');
  if (!grid || !Array.isArray(list)) return;
  grid.innerHTML = '';
  list.forEach(t => {
    const card = document.createElement('article');
    card.className = 'temple-card';

    const h3 = document.createElement('h3');
    h3.textContent = t.templeName || '';
    card.appendChild(h3);

    const pLoc = document.createElement('p');
    pLoc.innerHTML = `<i class="temple-label">Location:</i> ${t.location || ''}`;
    card.appendChild(pLoc);

    const pDed = document.createElement('p');
    pDed.innerHTML = `<i class="temple-label">Dedicated:</i> ${t.dedicated || ''}`;
    card.appendChild(pDed);

    const pArea = document.createElement('p');
    pArea.innerHTML = `<i class="temple-label">Size:</i> ${t.area ? t.area.toLocaleString() + ' sq ft' : ''}`;
    card.appendChild(pArea);

    const img = document.createElement('img');
    img.src = t.imageUrl || '';
    img.alt = t.templeName || 'Temple image';
    img.loading = 'lazy';
    img.width = '300';
    img.height = '225';
    img.fetchPriority = 'high';
    card.appendChild(img);



    grid.appendChild(card);
  });
}



const homeLink = document.getElementById('home-link');
const oldLink = document.getElementById('old-link');
const newLink = document.getElementById('new-link');
const largeLink = document.getElementById('large-link');
const smallLink = document.getElementById('small-link');

homeLink.addEventListener('click', function (e) {
  e.preventDefault();
  window.location.href = 'filtered-temples.html';
});

oldLink.addEventListener('click', function (e) {
  e.preventDefault();
  const filtered = temples.filter(t => {
    const d = new Date(t.dedicated);
    return !isNaN(d) && d.getFullYear() < 1900;
  });
  renderTemples(filtered);
});

newLink.addEventListener('click', function (e) {
  e.preventDefault();
  const filtered = temples.filter(t => {
    const d = new Date(t.dedicated);
    return !isNaN(d) && d.getFullYear() > 2000;
  });
  renderTemples(filtered);
});

largeLink.addEventListener('click', function (e) {
  e.preventDefault();
  const filtered = temples.filter(t => t.area > 90000);
  renderTemples(filtered);
});

smallLink.addEventListener('click', function (e) {
  e.preventDefault();
  const filtered = temples.filter(t => t.area < 10000);
  renderTemples(filtered);
});