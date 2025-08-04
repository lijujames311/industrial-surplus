async function loadFeatured() {
  try {
    const response = await fetch('catalog.json');
    const data = await response.json();
    const list = document.getElementById('featured-list');
    data.slice(0, 3).forEach(item => {
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
      list.appendChild(card);
    });
  } catch (err) {
    console.error('Failed to load featured items', err);
  }
}

document.addEventListener('DOMContentLoaded', loadFeatured);
