async function loadCatalog() {
  try {
    const response = await fetch('catalog.json');
    const data = await response.json();
    const grid = document.getElementById('catalog-grid');

    const params = new URLSearchParams(window.location.search);
    const query = (params.get('q') || '').toLowerCase();
    const items = query
      ? data.filter(item => {
          const type = (item.item_type || item.grinding_type || '').toLowerCase();
          return (
            item.brand.toLowerCase().includes(query) ||
            type.includes(query) ||
            item.description.toLowerCase().includes(query)
          );
        })
      : data;

    items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'card';
      const type = item.item_type || item.grinding_type || '';
      card.innerHTML = `
        <a href="${item.slug}.html">
          <img src="${item.photo1}" alt="${item.brand} ${type}" loading="lazy">
        </a>
        <div class="card-body">
          <h3>${item.brand} ${type}</h3>
          <p>${item.size_od_in}″ OD × ${item.size_width_in}″ W × ${item.size_id_in}″ ID</p>
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
