async function loadWheels() {
  const res = await fetch('/assets/data/wheels.json', { cache: 'no-store' });
  const data = await res.json();
  return data.wheels || [];
}

function fmt(x, unit='') {
  if (x === null || x === undefined || x === '') return 'TBD';
  return unit ? `${x} ${unit}` : `${x}`;
}

function cardTemplate(w) {
  const img = (w.photo_urls && w.photo_urls[0]) || '/assets/images/placeholder-wheel.jpg';
  return `
    <div class="rounded-2xl ring-1 ring-zinc-200 shadow-sm overflow-hidden flex flex-col">
      <img src="${img}" alt="${w.wheel_code || w.inventory_code}" class="w-full h-44 object-cover">
      <div class="p-4 flex-1 flex flex-col gap-3">
        <div class="text-sm text-zinc-500">${w.brand || ''}</div>
        <div class="font-semibold">${w.wheel_code || w.inventory_code}</div>
        <dl class="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-zinc-600">
          <div><dt class="text-zinc-500">OD</dt><dd>${fmt(w.specs?.od_mm,'mm')}</dd></div>
          <div><dt class="text-zinc-500">Width</dt><dd>${fmt(w.specs?.width_mm,'mm')}</dd></div>
          <div><dt class="text-zinc-500">Bore</dt><dd>${fmt(w.specs?.bore_mm,'mm')}</dd></div>
          <div><dt class="text-zinc-500">Module</dt><dd>${fmt(w.specs?.module)}</dd></div>
        </dl>
        <div class="mt-auto flex gap-2">
          <button data-id="${w.id}" class="viewBtn px-3 py-2 rounded-xl border border-zinc-300">Details</button>
          <a href="/contact.html?wheel=${encodeURIComponent(w.inventory_code)}" class="px-3 py-2 rounded-xl bg-black text-white">Contact</a>
        </div>
      </div>
    </div>
  `;
}

function detailsTemplate(w) {
  const s = w.specs || {};
  return `
    <div class="space-y-2">
      <div><span class="text-zinc-500">Inventory:</span> <span class="font-medium">${w.inventory_code}</span></div>
      <div><span class="text-zinc-500">Brand:</span> ${w.brand || 'Kapp Niles'}</div>
      <div><span class="text-zinc-500">Type:</span> ${w.series || 'Electroplated CBN Gear Grinding Wheel'}</div>
      <div class="grid grid-cols-2 gap-x-6 gap-y-1">
        <div><span class="text-zinc-500">OD:</span> ${fmt(s.od_mm,'mm')}</div>
        <div><span class="text-zinc-500">Width:</span> ${fmt(s.width_mm,'mm')}</div>
        <div><span class="text-zinc-500">Bore:</span> ${fmt(s.bore_mm,'mm')}</div>
        <div><span class="text-zinc-500">Module:</span> ${fmt(s.module)}</div>
        <div><span class="text-zinc-500">Pressure Angle:</span> ${fmt(s.pressure_angle_deg,'°')}</div>
        <div><span class="text-zinc-500">Helix Angle:</span> ${fmt(s.helix_angle_deg,'°')}</div>
      </div>
      <div class="text-zinc-600"><span class="text-zinc-500">Notes:</span> ${w.notes || 'Public-safe listing. Contact for pricing.'}</div>
    </div>
  `;
}

function applyFilters(items) {
  const q = document.getElementById('searchInput').value.trim().toLowerCase();
  const odMin = parseFloat(document.getElementById('odMin').value);
  const modMin = parseFloat(document.getElementById('modMin').value);
  return items.filter(w => {
    const hay = (w.wheel_code || '') + ' ' + (w.inventory_code || '') + ' ' + (w.notes || '');
    if (q && !hay.toLowerCase().includes(q)) return false;
    const od = parseFloat(w.specs?.od_mm);
    if (!isNaN(odMin) && !(od >= odMin)) return false;
    const mod = parseFloat(w.specs?.module);
    if (!isNaN(modMin) && !(mod >= modMin)) return false;
    return true;
  });
}

(async function init() {
  const grid = document.getElementById('grid');
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  const modalImg = document.getElementById('modalImg');
  const closeModal = document.getElementById('closeModal');
  const resetBtn = document.getElementById('resetBtn');

  const all = await loadWheels();

  function render() {
    const items = applyFilters(all);
    grid.innerHTML = items.map(cardTemplate).join('');
    for (const btn of grid.querySelectorAll('.viewBtn')) {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const w = all.find(x => x.id === id);
        if (!w) return;
        modalTitle.textContent = w.wheel_code || w.inventory_code || 'Wheel Details';
        modalBody.innerHTML = detailsTemplate(w);
        modalImg.src = (w.photo_urls && w.photo_urls[0]) || '/assets/images/placeholder-wheel.jpg';
        document.getElementById('modalContactBtn').href = '/contact.html?wheel=' + encodeURIComponent(w.inventory_code);
        modal.classList.remove('hidden');
        modal.classList.add('flex');
      });
    }
  }

  // Close modal handlers
  closeModal.addEventListener('click', () => {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  });
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  });

  // Filters
  document.getElementById('searchInput').addEventListener('input', render);
  document.getElementById('odMin').addEventListener('input', render);
  document.getElementById('modMin').addEventListener('input', render);
  resetBtn.addEventListener('click', () => {
    document.getElementById('searchInput').value = '';
    document.getElementById('odMin').value = '';
    document.getElementById('modMin').value = '';
    render();
  });

  render();
})();
