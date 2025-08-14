document.addEventListener('DOMContentLoaded', () => {
  fetch('/data/inventory.json')
    .then(res => res.json())
    .then(items => {
      const list = document.getElementById('inventory-list');
      items.forEach(item => {
        const div = document.createElement('div');
        div.innerHTML = `<h3>${item.code}</h3>
                         <img src="${item.image}" alt="${item.code}" style="max-width:200px;">
                         <p>${item.description}</p>
                         <p><strong>Contact for pricing</strong></p>`;
        list.appendChild(div);
      });
    });
});
