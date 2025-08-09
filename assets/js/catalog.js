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

      const link = document.createElement('a');
      link.href = `${item.slug}.html`;

      const img = document.createElement('img');
      const type = item.item_type || item.grinding_type || '';
      img.src = item.photo1;
      img.alt = `${item.brand} ${type}`.trim();
      img.loading = 'lazy';
      link.appendChild(img);

      const cardBody = document.createElement('div');
      cardBody.className = 'card-body';

      const btn = document.createElement('a');
      btn.className = 'btn-small';
      btn.href = `${item.slug}.html`;
      btn.textContent = 'View Details';
      cardBody.appendChild(btn);

      card.appendChild(link);
      card.appendChild(cardBody);
      grid.appendChild(card);
    });
  } catch (err) {
    console.error('Failed to load catalog', err);
  }
}

document.addEventListener('DOMContentLoaded', loadCatalog);
