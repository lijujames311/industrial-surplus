async function loadInventory() {
  try {
    const response = await fetch('data/inventory.json');
    const data = await response.json();
    const grid = document.getElementById('inventory-grid');
    const typeSelect = document.getElementById('type');

    function render(items) {
      grid.innerHTML = '';
      items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
          <img src="${item.photo}" alt="${item.name}" loading="lazy">
          <div class="card-body">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
          </div>
        `;
        grid.appendChild(card);
      });
    }

    render(data);

    typeSelect.addEventListener('change', () => {
      const value = typeSelect.value;
      const filtered = value ? data.filter(item => item.type === value) : data;
      render(filtered);
    });
  } catch (err) {
    console.error('Failed to load inventory', err);
  }
}

document.addEventListener('DOMContentLoaded', loadInventory);
