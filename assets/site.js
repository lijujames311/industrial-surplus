// Shared footer build + year, then try to read /assets/build.json for commit info
(function(){
  const yearEls = document.querySelectorAll('[data-year]');
  yearEls.forEach(el => el.textContent = new Date().getFullYear());
  const buildOut = document.getElementById('build');
  async function setBuild(){
    try{
      const res = await fetch('/assets/build.json', {cache:'no-store'});
      if(res.ok){
        const info = await res.json();
        if(buildOut) buildOut.textContent = `${(info.sha||'').slice(0,7)}-${info.branch||''}`;
        return;
      }
    }catch(e){}
    const meta = document.querySelector('meta[name="build"]');
    if(meta && buildOut) buildOut.textContent = meta.content;
  }
  setBuild();
})();

// Home page categories
(async function(){
  const slot = document.getElementById('home-categories');
  if (!slot) return;
  const data = await fetch('/data/inventory.json').then(r=>r.json()).catch(()=>[]);
  const cats = Array.from(new Set(data.map(x => x.type))).slice(0,6);
  slot.innerHTML = cats.map(c => `
    <a href="/inventory.html?type=${encodeURIComponent(c)}" class="group rounded-2xl ring-1 ring-white/10 p-5 hover:ring-white/20 transition block">
      <div class="text-lg font-semibold">${c}</div>
      <div class="text-zinc-400 text-sm">Browse ${c} listings</div>
    </a>`).join('');
})();

// Inventory page
(async function(){
  const grid = document.getElementById('results');
  if (!grid) return;
  const params = new URLSearchParams(location.search);
  const qInput = document.getElementById('q');
  const brandSel = document.getElementById('brand');
  const typeSel = document.getElementById('type');
  const clearBtn = document.getElementById('clear');
  const data = await fetch('/data/inventory.json').then(r=>r.json()).catch(()=>[]);

  const brands = Array.from(new Set(data.map(x => x.brand).filter(Boolean))).sort();
  brands.forEach(b => brandSel.insertAdjacentHTML('beforeend', `<option>${b}</option>`));

  if (params.get('type')) typeSel.value = params.get('type');

  function render(){
    const q = (qInput?.value||'').trim().toLowerCase();
    const b = brandSel.value;
    const t = typeSel.value;
    const items = data.filter(x => {
      const blob = [x.title,x.model,x.machine,x.brand,x.sku].filter(Boolean).join(' ').toLowerCase();
      const matchQ = !q || blob.includes(q);
      const matchB = !b || x.brand === b;
      const matchT = !t || x.type === t;
      return matchQ && matchB && matchT;
    });
    if (!items.length){
      grid.innerHTML = `<div class="text-zinc-400">No results. Try clearing filters.</div>`;
      return;
    }
    grid.innerHTML = items.map(x => `
      <a href="/product.html?id=${encodeURIComponent(x.id)}" class="block rounded-2xl ring-1 ring-white/10 p-3 hover:ring-white/20 transition bg-zinc-900/50">
        <div class="aspect-[4/3] overflow-hidden rounded-xl bg-zinc-900">
          <img src="${(x.images&&x.images[0]) || '/assets/placeholder.svg'}" alt="${x.title}" class="h-full w-full object-cover transition group-hover:scale-[1.02]" loading="lazy">
        </div>
        <div class="mt-3 flex items-center justify-between gap-3">
          <div>
            <h3 class="font-semibold">${x.title}</h3>
            <p class="text-xs text-zinc-400">${[x.brand||'', x.model||''].join(' ').trim()}</p>
          </div>
          ${x.price ? `<div class="text-sm font-semibold">$${Number(x.price).toLocaleString()}</div>` : ''}
        </div>
        <div class="mt-2 text-xs text-zinc-400">${[x.type, x.machine].filter(Boolean).join(' • ')}</div>
      </a>
    `).join('');
  }

  qInput?.addEventListener('input', render);
  brandSel.addEventListener('change', render);
  typeSel.addEventListener('change', render);
  clearBtn.addEventListener('click', ()=>{ if(qInput){qInput.value='';} brandSel.value=''; typeSel.value=''; render(); });

  render();
})();

// Product page
(async function(){
  const root = document.getElementById('product-container');
  if (!root) return;
  const id = new URLSearchParams(location.search).get('id');
  const data = await fetch('/data/inventory.json').then(r=>r.json()).catch(()=>[]);
  const x = data.find(i => String(i.id) === String(id));
  if (!x){ root.innerHTML = '<p class="text-zinc-400">Item not found.</p>'; return; }

  document.title = `${x.title} – Industrial Surplus Hub`;

  root.innerHTML = `
    <div class="grid md:grid-cols-2 gap-8">
      <div>
        <div class="aspect-[4/3] rounded-2xl bg-zinc-900 overflow-hidden ring-1 ring-white/10">
          <img src="${(x.images&&x.images[0]) || '/assets/placeholder.svg'}" alt="${x.title}" class="h-full w-full object-cover">
        </div>
        <div class="mt-3 grid grid-cols-4 gap-2">
          ${(x.images||[]).slice(0,8).map(src=>`<img src="${src}" class="h-16 w-full object-cover rounded-md" loading="lazy">`).join('')}
        </div>
      </div>
      <div>
        <h1 class="text-3xl font-bold">${x.title}</h1>
        <p class="mt-1 text-zinc-400 text-sm">${[x.brand, x.model, x.machine].filter(Boolean).join(' • ')}</p>
        ${x.price ? `<div class="mt-4 text-2xl font-semibold">$${Number(x.price).toLocaleString()}</div>` : ''}
        <a href="/contact.html" class="inline-flex items-center gap-2 rounded-xl px-4 py-2 mt-6 bg-brand text-black font-semibold hover:bg-brand-dark transition ring-1 ring-black/10">Request quote</a>

        <div class="mt-8">
          <h2 class="text-xl font-semibold">Essential Specs</h2>
          <dl class="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
            ${row('Type', x.type)}
            ${row('Brand', x.brand)}
            ${row('Model', x.model)}
            ${row('SKU', x.sku)}
            ${row('Outer Diameter (OD)', x.od_mm ? x.od_mm + ' mm' : '')}
            ${row('Width', x.width_mm ? x.width_mm + ' mm' : '')}
            ${row('Bore', x.bore_mm ? x.bore_mm + ' mm' : '')}
            ${row('Grit', x.grit)}
            ${row('Concentration', x.concentration)}
            ${row('Bond', x.bond)}
            ${row('Machine', x.machine)}
            ${row('Condition', x.condition)}
            ${row('Notes', x.notes)}
          </dl>
          <p class="mt-6 text-xs text-zinc-500">Detailed profile/geometry is shared only under NDA to protect OEM IP.</p>
        </div>
      </div>
    </div>`;

  const ld = {
    "@context":"https://schema.org",
    "@type":"Product",
    name: x.title,
    brand: x.brand || 'Unbranded',
    sku: x.sku || x.id,
    description: 'CBN grinding wheel – essential specs only; detailed geometry under NDA.',
    offers: x.price ? {"@type":"Offer","price": String(x.price),"priceCurrency":"CAD","availability":"https://schema.org/InStock"} : undefined,
    image: (x.images||[])
  };
  const s = document.createElement('script'); s.type='application/ld+json'; s.textContent = JSON.stringify(ld); document.head.appendChild(s);

  function row(label, val){ if (!val) return ''; return `<div><dt class="text-zinc-400">${label}</dt><dd class="font-medium">${val}</dd></div>`; }
})();

// Contact form → mailto fall-back (no backend required)
(function(){
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const fd = new FormData(form);
    const name = encodeURIComponent(fd.get('name')||'');
    const email = encodeURIComponent(fd.get('email')||'');
    const company = encodeURIComponent(fd.get('company')||'');
    const message = encodeURIComponent(fd.get('message')||'');
    const subject = `Inquiry from ${decodeURIComponent(name)}`;
    const body = `Name: ${decodeURIComponent(name)}%0AEmail: ${decodeURIComponent(email)}%0ACompany: ${decodeURIComponent(company)}%0A%0A${decodeURIComponent(message)}`;
    location.href = `mailto:info@industrialsurplushub.ca?subject=${encodeURIComponent(subject)}&body=${body}`;
  });
})();
