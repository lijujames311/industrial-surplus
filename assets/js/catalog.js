let catalogData = [];

function renderCatalog(brand = '', query = '') {
  const grid = document.getElementById('catalog-grid');
  grid.innerHTML = '';
  const q = query.toLowerCase();
  catalogData
    .filter(item => {
      const matchesBrand = brand ? item.brand === brand : true;
      const matchesQuery =
        item.brand.toLowerCase().includes(q) ||
        item.grinding_type.toLowerCase().includes(q);
      return matchesBrand && matchesQuery;
    })
    .forEach(item => {
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
}

function populateBrandFilter() {
  const select = document.getElementById('brand-filter');
  const brands = [...new Set(catalogData.map(item => item.brand))].sort();
  brands.forEach(brand => {
    const opt = document.createElement('option');
    opt.value = brand;
    opt.textContent = brand;
    select.appendChild(opt);
  });
}

async function loadCatalog() {
  try {
    const response = await fetch('catalog.json');
    catalogData = await response.json();
    populateBrandFilter();
    renderCatalog();
  } catch (err) {
    console.error('Failed to load catalog', err);
    document.getElementById('catalog-grid').innerHTML =
      '<p>Failed to load catalog data.</p>';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadCatalog();
  document.getElementById('brand-filter').addEventListener('change', () => {
    const brand = document.getElementById('brand-filter').value;
    const query = document.getElementById('search-input').value.trim();
    renderCatalog(brand, query);
  });
  document.getElementById('search-input').addEventListener('input', e => {
    const query = e.target.value.trim();
    const brand = document.getElementById('brand-filter').value;
    renderCatalog(brand, query);
  });
});

