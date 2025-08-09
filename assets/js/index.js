async function loadFeatured() {
  try {
    const response = await fetch('catalog.json');
    const data = await response.json();
    const list = document.getElementById('featured-list');
    data.slice(0, 3).forEach(item => {
      const card = document.createElement('div');
      card.className = 'card';

      card.innerHTML = `
        <a href="${item.slug}.html">
          <img src="${item.photo1}" alt="${item.brand} ${type}" loading="lazy">
        </a>
        <div class="card-body">

          <a class="btn-small" href="${item.slug}.html">View Details</a>
        </div>
      `;
      list.appendChild(card);
    });
  } catch (err) {
    console.error('Failed to load featured items', err);
  }
}

document.addEventListener('DOMContentLoaded', loadFeatured);
