async function loadFeatured() {
  try {
    const response = await fetch('catalog.json');
    const data = await response.json();
    const list = document.getElementById('featured-list');
    data.slice(0, 3).forEach(item => {
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
      list.appendChild(card);
    });
  } catch (err) {
    console.error('Failed to load featured items', err);
  }
}

document.addEventListener('DOMContentLoaded', loadFeatured);
