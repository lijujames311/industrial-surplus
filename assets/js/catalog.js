async function loadCatalog() {
  try {
    const response = await fetch('catalog.json');
    const data = await response.json();
    const grid = document.getElementById('catalog-grid');

    const params = new URLSearchParams(window.location.search);
    const query = (params.get('q') || '').toLowerCase();
    const items = query
      ? data.filter(item =>
          item.brand.toLowerCase().includes(query) ||
          item.grinding_type.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query))
      : data;

    items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <a href="${item.slug}.html">
          <img src="${item.photo1}" alt="${item.brand} ${item.grinding_type}" loading="lazy">
        </a>
        <div class="card-body">
          <h3>${item.brand} ${item.grinding_type}</h3>
          <p>Size: ${item.size_od_in}″ OD × ${item.size_width_in}″ W × ${item.size_id_in}″ ID</p>
          <a class="btn-small" href="${item.slug}.html">View Details</a>
        </div>
      `;
      grid.appendChild(card);
    });
  } catch (err) {
    console.error('Failed to load catalog', err);
  }
}

document.addEventListener('DOMContentLoaded', loadCatalog);
