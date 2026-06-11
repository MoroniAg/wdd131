
(function () {
  const DATA_URL = 'data/recipes.json';
  const grid = document.getElementById('recipes-grid');
  const status = document.getElementById('recipes-status');
  const searchInput = document.getElementById('recipe-search');
  const chips = document.querySelectorAll('.chip');

  let allRecipes = [];
  let activeCategory = 'all';
  let activeQuery = '';

  function setStatus(message, isError) {
    if (!status) return;
    status.textContent = message;
    status.classList.toggle('recipes-status--error', !!isError);
  }

  function setBusy(busy) {
    if (!grid) return;
    grid.setAttribute('aria-busy', busy ? 'true' : 'false');
  }

  function categoryLabel(c) {
    if (c === 'all') return 'all';
    if (!c) return '';
    return c.charAt(0).toUpperCase() + c.slice(1);
  }

  function createCard(recipe) {
    const card = document.createElement('article');
    card.className = 'recipe-card';
    card.setAttribute('data-category', recipe.category || '');
    card.setAttribute('data-time', String(recipe.time || 0));

    const initial = (recipe.title || '?').trim().charAt(0).toUpperCase();

    const media = document.createElement('div');
    media.className = 'recipe-card-media';
    media.setAttribute('aria-hidden', 'true');
    const mediaLabel = document.createElement('span');
    mediaLabel.className = 'recipe-card-media-label';
    mediaLabel.textContent = initial;
    media.appendChild(mediaLabel);

    const body = document.createElement('div');
    body.className = 'recipe-card-body';

    const meta = document.createElement('p');
    meta.className = 'recipe-card-meta';
    const cat = document.createElement('span');
    cat.className = 'recipe-card-category';
    cat.textContent = categoryLabel(recipe.category);
    const time = document.createElement('span');
    time.className = 'recipe-card-time';
    time.textContent = (recipe.time || 0) + ' min';
    meta.appendChild(cat);
    meta.appendChild(time);

    const title = document.createElement('h3');
    title.className = 'recipe-card-title';
    title.textContent = recipe.title || 'Untitled recipe';

    const summary = document.createElement('p');
    summary.className = 'recipe-card-summary';
    summary.textContent = recipe.summary || '';

    const ingredients = document.createElement('p');
    ingredients.className = 'recipe-card-ingredients';
    const ingLabel = document.createElement('strong');
    ingLabel.textContent = 'Ingredients: ';
    ingredients.appendChild(ingLabel);
    ingredients.appendChild(
      document.createTextNode((recipe.ingredients || []).join(', '))
    );

    const actions = document.createElement('div');
    actions.className = 'recipe-card-actions';
    const fav = document.createElement('button');
    fav.type = 'button';
    fav.className = 'btn btn--ghost recipe-card-fav';

    if (localStorage.getItem(`favorite_${recipe.id}`) !== null) {
      fav.textContent = '✓ Saved';
      fav.setAttribute('aria-label', `Saved ${recipe.title || 'recipe'} to favorites`);
    } else {
      fav.textContent = '♥ Save';
      fav.setAttribute('aria-label', `Save ${recipe.title || 'recipe'} to favorites`);
    }

    actions.appendChild(fav);

    body.appendChild(meta);
    body.appendChild(title);
    body.appendChild(summary);
    body.appendChild(ingredients);
    body.appendChild(actions);

    card.appendChild(media);
    card.appendChild(body);

    fav.addEventListener('click', function () {

      if (localStorage.getItem(`favorite_${recipe.id}`) === null) {
        localStorage.setItem(`favorite_${recipe.id}`, recipe.id);
        fav.textContent = '✓ Saved';
        fav.setAttribute('aria-label', `Saved ${recipe.title || 'recipe'} to favorites`);
      } else {
        localStorage.removeItem(`favorite_${recipe.id}`);
        fav.textContent = '♥ Save';
        fav.setAttribute('aria-label', `Save ${recipe.title || 'recipe'} to favorites`);
      }


    });


    return card;
  }

  function applyFilters() {
    if (!grid) return;
    const cards = grid.querySelectorAll('.recipe-card');
    let visible = 0;
    const q = activeQuery.trim().toLowerCase();
    cards.forEach(function (card) {
      const cat = card.getAttribute('data-category') || '';
      const title = (card.querySelector('.recipe-card-title')?.textContent || '').toLowerCase();
      const ing = (card.querySelector('.recipe-card-ingredients')?.textContent || '').toLowerCase();

      const matchesCategory = activeCategory === 'all' || cat === activeCategory;
      const matchesQuery = !q || title.indexOf(q) !== -1 || ing.indexOf(q) !== -1;
      const show = matchesCategory && matchesQuery;
      card.classList.toggle('is-hidden', !show);
      if (show) visible += 1;
    });

    if (visible === 0) {
      setStatus('No recipes match your filters.', true);
    } else if (allRecipes.length > 0) {
      setStatus(`Showing ${visible} of ${allRecipes.length} recipes.`, false);
    }
  }

  function render(recipes) {
    if (!grid) return;
    grid.innerHTML = '';
    recipes.forEach(function (recipe) {
      grid.appendChild(createCard(recipe));
    });
    setBusy(false);
    if (recipes.length === 0) {
      setStatus('No recipes available yet.', true);
    } else {
      setStatus(`Showing ${recipes.length} recipes.`, false);
    }
    applyFilters();
  }

  function wireFilters() {
    if (chips && chips.length) {
      chips.forEach(function (chip) {
        chip.addEventListener('click', function () {
          chips.forEach(function (c) { c.classList.remove('is-active'); });
          chip.classList.add('is-active');
          activeCategory = chip.getAttribute('data-category') || 'all';
          applyFilters();
        });
      });
    }
    if (searchInput) {
      searchInput.addEventListener('input', function (e) {
        activeQuery = e.target.value || '';
        applyFilters();
      });
    }
  }

  function load() {
    setBusy(true);
    setStatus('Loading recipes…', false);
    fetch(DATA_URL, { cache: 'no-store' })
      .then(function (response) {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        return response.json();
      })
      .then(function (data) {
        allRecipes = Array.isArray(data) ? data : (Array.isArray(data.recipes) ? data.recipes : []);
        render(allRecipes);
        wireFilters();
      })
      .catch(function (err) {
        setBusy(false);
        setStatus('Could not load recipes. Please try again later.', true);
        console.error(`QuickNutri: failed to load recipes.json`, err);
      });
  }

  if (grid) {
    document.addEventListener('DOMContentLoaded', load);
  }

  function applyQuickFilter() {

  }

  document.addEventListener('DOMContentLoaded', function () {
    const quickFilter = document.querySelector('[aria-label="nav-quick"]');
    quickFilter?.addEventListener('click', function () {
      console.log('Quick filter clicked');
      const quickrecipes = allRecipes.filter(recipe => recipe.time <= 15);
      render(quickrecipes);
    });


    const gourmetFilter = document.querySelector('[aria-label="nav-gourmet"]');
    gourmetFilter?.addEventListener('click', function () {
      console.log('Gourmet filter clicked');
      const gourmetRecipes = allRecipes.filter(recipe => recipe.time > 15);
      render(gourmetRecipes);
    });
  }
  )
})();
