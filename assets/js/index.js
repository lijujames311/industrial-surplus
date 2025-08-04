async function loadFeatured() {
  try {
    const response = await fetch('catalog.json');
    const data = await response.json();
    const list = document.getElementById('featured-list');
    data.slice(0, 3).forEach(item => {
      const card = document.createElement('div');
      card.className = 'card';

      const detail = item.size_od_in && item.size_od_in !== 'N/A'
        ? `${item.size_od_in}″ OD × ${item.size_width_in}″ W × ${item.size_id_in}″ ID`
        : (item.description || '');
      const detailHtml = detail ? `<p>${detail}</p>` : '';

      card.innerHTML = `
        <a href="${item.slug}.html">
          <img src="${item.photo1}" alt="${item.brand} ${item.grinding_type}" loading="lazy">
        </a>
        <div class="card-body">
          <h3>${item.brand} ${item.grinding_type}</h3>
          ${detailHtml}
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
