import { Product, StoreConfig } from '../types';
import { THEMES } from './themes';

export function generateExportHtml(
  products: Product[],
  config: StoreConfig,
  isPublicExport: boolean = true
): string {
  const productsJson = JSON.stringify(products);
  const configJson = JSON.stringify(config);
  const theme = THEMES[config.themeId] || THEMES['emerald-dark'];

  return `<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${config.headlineAr} | ${config.storeNameAr}</title>
  <meta name="description" content="${config.taglineAr}">
  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <!-- Tailwind Play CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            accentCol: '${theme.accent}',
          }
        }
      }
    }
  </script>
  <style>
    :root {
      --accent: ${theme.accent};
      --bg: ${theme.bgMain};
      --card: ${theme.bgCard};
      --border: ${theme.border};
      --text: ${theme.textPrimary};
    }
    html[lang="ar"] { font-family: 'Cairo', system-ui, sans-serif; }
    html[lang="en"] { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; }
    body { background-color: ${theme.bgMain}; color: ${theme.textPrimary}; }
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: ${theme.bgMain}; }
    ::-webkit-scrollbar-thumb { background: ${theme.border}; border-radius: 3px; }
  </style>
</head>
<body class="min-h-screen flex flex-col antialiased selection:bg-[${theme.accent}] selection:text-black" style="background-color: ${theme.bgMain}; color: ${theme.textPrimary};">

  <!-- Top Announcement Bar -->
  <div class="border-b px-4 py-2 text-xs text-center flex items-center justify-center gap-2" style="background-color: ${theme.type === 'light' ? '#f1f5f9' : '#0e1216'}; border-color: ${theme.border}; color: ${theme.textSecondary};">
    <span class="inline-block w-2 h-2 rounded-full animate-pulse" style="background-color: ${theme.accent};"></span>
    <span id="announcement-text">${config.bannerTextAr}</span>
  </div>

  <!-- Header -->
  <header class="sticky top-0 z-40 backdrop-blur-md border-b" style="background-color: ${theme.type === 'light' ? 'rgba(255,255,255,0.95)' : theme.bgHeader + 'ea'}; border-color: ${theme.border};">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
      <!-- Brand -->
      <a href="#" class="flex items-center gap-3">
        ${config.logoUrl ? `<img src="${config.logoUrl}" alt="Logo" class="h-9 w-auto rounded object-contain">` : ''}
        <span class="text-lg font-bold tracking-tight flex items-center gap-1.5" style="color: ${theme.textPrimary};">
          <span style="color: ${theme.accent};">●</span>
          <span id="brand-name">${config.storeNameAr}</span>
        </span>
      </a>

      <!-- Navigation / Categories -->
      <nav class="hidden md:flex items-center gap-6 text-sm font-medium" style="color: ${theme.textMuted};">
        <button onclick="setFilter('all')" class="hover:opacity-100 transition-colors">الكل</button>
        <button onclick="setFilter('streetwear')" class="hover:opacity-100 transition-colors">الملابس</button>
        <button onclick="setFilter('gaming')" class="hover:opacity-100 transition-colors">الألعاب</button>
        <button onclick="setFilter('accessories')" class="hover:opacity-100 transition-colors">الإكسسوارات</button>
        <button onclick="setFilter('gear')" class="hover:opacity-100 transition-colors">المعدات</button>
      </nav>

      <!-- Actions -->
      <div class="flex items-center gap-2 sm:gap-3">
        <!-- Language Switcher -->
        <button onclick="toggleLang()" class="px-2.5 py-1 text-xs font-semibold rounded-lg border transition" style="background-color: ${theme.type === 'light' ? '#f1f5f9' : '#14181d'}; border-color: ${theme.border}; color: ${theme.textPrimary};">
          <span id="lang-btn-label">English</span>
        </button>

        <!-- Cart Button -->
        <button onclick="toggleCart(true)" class="relative flex items-center gap-2 px-3.5 py-1.5 rounded-lg border transition" style="background-color: ${theme.type === 'light' ? '#f1f5f9' : '#14181d'}; border-color: ${theme.border}; color: ${theme.textPrimary};">
          <svg class="w-4 h-4" style="color: ${theme.accent};" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
          </svg>
          <span class="text-xs font-medium hidden sm:inline" id="cart-btn-text">السلة</span>
          <span id="cart-badge" class="px-1.5 py-0.2 text-xs font-bold rounded-full font-mono" style="background-color: ${theme.accent}; color: #000000;">0</span>
        </button>
      </div>
    </div>
  </header>

  <!-- Hero Section -->
  <section class="relative overflow-hidden pt-12 pb-16 px-4 sm:px-6 border-b" style="border-color: ${theme.border}; background-color: ${theme.bgMain};">
    <div class="max-w-5xl mx-auto text-center relative z-10">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-medium mb-5" style="background-color: ${theme.badgeBg}; border-color: ${theme.border}; color: ${theme.accent};">
        <span>${config.heroBadgeAr}</span>
      </div>
      <h1 id="hero-headline" class="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 leading-tight" style="color: ${theme.textPrimary};">
        ${config.headlineAr}
      </h1>
      <p id="hero-tagline" class="text-base sm:text-lg max-w-2xl mx-auto mb-8" style="color: ${theme.textSecondary};">
        ${config.taglineAr}
      </p>

      <!-- Search & Filters -->
      <div class="max-w-xl mx-auto flex flex-col sm:flex-row gap-2">
        <div class="relative flex-1">
          <input type="text" id="search-input" oninput="handleSearch(this.value)" placeholder="ابحث في المنتجات الـ 10 الحصرية..." class="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none transition shadow-inner" style="background-color: ${theme.type === 'light' ? '#ffffff' : theme.bgCard}; border-color: ${theme.border}; color: ${theme.textPrimary};">
        </div>
      </div>
    </div>
  </section>

  <!-- Products Section -->
  <main class="max-w-7xl mx-auto px-4 sm:px-6 py-12 flex-1">
    <div class="flex items-center justify-between mb-8 pb-4 border-b" style="border-color: ${theme.border};">
      <div>
        <h2 class="text-xl font-bold flex items-center gap-2" style="color: ${theme.textPrimary};">
          <span>المنتجات الحصرية</span>
          <span class="text-xs font-normal" style="color: ${theme.textMuted};">(10 منتجات)</span>
        </h2>
        <p class="text-xs mt-0.5" style="color: ${theme.textMuted};">اضغط على "طلب وإضافة" لإضافة أي منتج ومتابعة تصفح باقي المنتجات</p>
      </div>

      <!-- Quick category pills -->
      <div class="flex items-center gap-1.5 p-1 rounded-xl border text-xs overflow-x-auto" style="background-color: ${theme.type === 'light' ? '#e2e8f0' : theme.bgCard}; border-color: ${theme.border};">
        <button onclick="setFilter('all')" class="filter-tab active px-3 py-1.5 rounded-lg font-medium" data-cat="all" style="background-color: ${theme.accent}; color: #000000;">الكل</button>
        <button onclick="setFilter('streetwear')" class="filter-tab px-3 py-1.5 rounded-lg font-medium" data-cat="streetwear" style="color: ${theme.textMuted};">الملابس</button>
        <button onclick="setFilter('gaming')" class="filter-tab px-3 py-1.5 rounded-lg font-medium" data-cat="gaming" style="color: ${theme.textMuted};">الألعاب</button>
        <button onclick="setFilter('accessories')" class="filter-tab px-3 py-1.5 rounded-lg font-medium" data-cat="accessories" style="color: ${theme.textMuted};">إكسسوارات</button>
        <button onclick="setFilter('gear')" class="filter-tab px-3 py-1.5 rounded-lg font-medium" data-cat="gear" style="color: ${theme.textMuted};">معدات</button>
      </div>
    </div>

    <!-- Product Grid -->
    <div id="product-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <!-- Rendered via JS -->
    </div>
  </main>

  <!-- Cart Slide-Over Drawer -->
  <div id="cart-drawer" class="fixed inset-0 z-50 overflow-hidden pointer-events-none transition-all duration-300 opacity-0 invisible">
    <div class="absolute inset-0 bg-black/70 backdrop-blur-sm pointer-events-auto" onclick="toggleCart(false)"></div>
    <div class="fixed inset-y-0 end-0 max-w-full flex pointer-events-auto">
      <div class="w-screen max-w-md border-s p-6 flex flex-col shadow-2xl" style="background-color: ${theme.bgCard}; border-color: ${theme.border}; color: ${theme.textPrimary};">
        <div class="flex items-center justify-between pb-4 border-b" style="border-color: ${theme.border};">
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5" style="color: ${theme.accent};" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
            <h3 class="text-base font-bold">سلة التسوق والطلب</h3>
          </div>
          <button onclick="toggleCart(false)" class="p-1 hover:opacity-80" style="color: ${theme.textMuted};">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        <div class="p-2 my-2 rounded-lg border text-xs flex justify-between items-center" style="background-color: ${theme.type === 'light' ? '#f8fafc' : '#0a0d10'}; border-color: ${theme.border};">
          <span>💡 بإمكانك إضافة أكثر من منتج وطلبهم سوياً</span>
          <button onclick="toggleCart(false)" class="font-bold underline" style="color: ${theme.accent};">تابع التسوق</button>
        </div>

        <div id="cart-items" class="flex-1 overflow-y-auto py-4 space-y-3">
          <!-- Cart items via JS -->
        </div>

        <!-- Checkout Form in Cart -->
        <div class="pt-4 border-t space-y-3" style="border-color: ${theme.border};">
          <div class="flex justify-between items-center text-sm">
            <span style="color: ${theme.textMuted};">المجموع الكلي:</span>
            <span id="cart-total" class="text-lg font-bold font-mono" style="color: ${theme.accent};">0 ${config.currency}</span>
          </div>

          <div class="space-y-2 pt-2">
            <input type="text" id="cust-name" placeholder="الاسم الكامل" class="w-full border rounded-lg px-3 py-2 text-xs focus:outline-none" style="background-color: ${theme.type === 'light' ? '#ffffff' : '#181f25'}; border-color: ${theme.border}; color: ${theme.textPrimary};">
            <input type="tel" id="cust-phone" placeholder="رقم الهاتف للتوصيل" class="w-full border rounded-lg px-3 py-2 text-xs focus:outline-none" style="background-color: ${theme.type === 'light' ? '#ffffff' : '#181f25'}; border-color: ${theme.border}; color: ${theme.textPrimary};">
            <input type="text" id="cust-address" placeholder="المدينة والعنوان بالتفصيل" class="w-full border rounded-lg px-3 py-2 text-xs focus:outline-none" style="background-color: ${theme.type === 'light' ? '#ffffff' : '#181f25'}; border-color: ${theme.border}; color: ${theme.textPrimary};">
            <textarea id="cust-notes" placeholder="ملاحظات الطلب (اختياري)..." rows="2" class="w-full border rounded-lg px-3 py-2 text-xs focus:outline-none" style="background-color: ${theme.type === 'light' ? '#ffffff' : '#181f25'}; border-color: ${theme.border}; color: ${theme.textPrimary};"></textarea>
          </div>

          <div class="grid grid-cols-2 gap-2 pt-2">
            <button onclick="orderViaWhatsApp()" class="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl font-bold text-xs transition shadow-lg active:scale-95" style="background-color: ${theme.accent}; color: #000000;">
              <span>إرسال طلب واتساب</span>
            </button>
            <button onclick="orderViaEmail()" class="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border text-xs font-medium hover:opacity-80 transition" style="background-color: ${theme.type === 'light' ? '#f1f5f9' : '#181f25'}; border-color: ${theme.border}; color: ${theme.textPrimary};">
              <span>طلب بالبريد</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Product Details Modal -->
  <div id="product-modal" class="fixed inset-0 z-50 overflow-y-auto hidden">
    <div class="fixed inset-0 bg-black/80 backdrop-blur-sm" onclick="closeProductModal()"></div>
    <div class="flex min-h-full items-center justify-center p-4">
      <div class="relative border rounded-2xl max-w-xl w-full p-6 overflow-hidden shadow-2xl" style="background-color: ${theme.bgCard}; border-color: ${theme.border}; color: ${theme.textPrimary};">
        <button onclick="closeProductModal()" class="absolute top-4 end-4 p-1 hover:opacity-80" style="color: ${theme.textMuted};">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
        <div id="modal-content" class="space-y-4">
          <!-- Populated via JS -->
        </div>
      </div>
    </div>
  </div>

  <!-- Floating Toast "Added! Keep Shopping" -->
  <div id="toast-added" class="fixed bottom-6 start-4 end-4 sm:start-auto sm:end-6 sm:max-w-md z-50 p-3 rounded-2xl border shadow-2xl flex items-center justify-between gap-3 transition-all duration-300 opacity-0 invisible" style="background-color: ${theme.type === 'light' ? '#ffffff' : '#14181d'}; border-color: ${theme.accent};">
    <div class="flex items-center gap-2">
      <span class="w-2.5 h-2.5 rounded-full" style="background-color: ${theme.accent};"></span>
      <span id="toast-text" class="text-xs font-bold" style="color: ${theme.textPrimary};">تمت الإضافة للسلة! تابع التسوق</span>
    </div>
    <button onclick="toggleCart(true)" class="px-3 py-1.5 rounded-xl text-xs font-bold" style="background-color: ${theme.accent}; color: #000000;">
      عرض السلة
    </button>
  </div>

  <!-- Footer -->
  <footer class="mt-auto border-t py-8 px-4 sm:px-6 text-xs" style="background-color: ${theme.type === 'light' ? '#f1f5f9' : '#080a0c'}; border-color: ${theme.border}; color: ${theme.textMuted};">
    <div class="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
      <div class="flex items-center gap-2">
        <span>© 2026 ${config.storeNameAr} - ${config.headlineAr}</span>
        ${!isPublicExport ? `<a href="#settings" class="transition ml-2 opacity-50 hover:opacity-100" style="color: ${theme.accent};" title="إعدادات المتجر (Ctrl+Shift+E)">⚙</a>` : ''}
      </div>
      <div class="flex items-center gap-6">
        <span>واتساب: <a href="https://wa.me/${config.whatsappNumber.replace(/[^0-9]/g, '')}" class="dir-ltr font-mono hover:underline" style="color: ${theme.textPrimary};">${config.whatsappNumber}</a></span>
        <span>البريد: <a href="mailto:${config.emailAddress}" class="font-mono hover:underline" style="color: ${theme.textPrimary};">${config.emailAddress}</a></span>
      </div>
    </div>
  </footer>

  <!-- Shop Logic Script -->
  <script>
    let products = ${productsJson};
    let config = ${configJson};
    let currentLang = 'ar';
    let currentCategory = 'all';
    let searchQuery = '';
    let cart = [];

    function renderProducts() {
      const grid = document.getElementById('product-grid');
      const filtered = products.filter(p => {
        const matchesCat = currentCategory === 'all' || p.category === currentCategory;
        const q = searchQuery.toLowerCase();
        const matchesSearch = !q || 
          p.titleAr.toLowerCase().includes(q) || 
          p.titleEn.toLowerCase().includes(q) ||
          p.descAr.toLowerCase().includes(q);
        return matchesCat && matchesSearch;
      });

      if (filtered.length === 0) {
        grid.innerHTML = '<div class="col-span-full py-16 text-center text-neutral-500">لا توجد منتجات مطابقة للبحث</div>';
        return;
      }

      grid.innerHTML = filtered.map(p => {
        const title = currentLang === 'ar' ? p.titleAr : p.titleEn;
        const desc = currentLang === 'ar' ? p.descAr : p.descEn;
        const badge = currentLang === 'ar' ? (p.badgeAr || '') : (p.badgeEn || '');
        const discount = p.originalPrice && p.originalPrice > p.price 
          ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100) 
          : 0;

        return \`
          <div class="group rounded-2xl border overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl" style="background-color: ${theme.bgCard}; border-color: ${theme.border};">
            <div class="relative aspect-[4/3] bg-black/20 overflow-hidden cursor-pointer" onclick="openProductModal(\${p.id})">
              <img src="\${p.image}" alt="\${title}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy">
              \${badge ? \`<span class="absolute top-3 end-3 text-[11px] font-semibold px-2 py-0.5 rounded border" style="background-color: ${theme.type === 'light' ? '#ffffff' : '#000000cc'}; color: ${theme.accent}; border-color: ${theme.border};">\${badge}</span>\` : ''}
              \${discount > 0 ? \`<span class="absolute top-3 start-3 text-[11px] font-bold px-2 py-0.5 rounded bg-red-600/90 text-white font-mono">-\${discount}%</span>\` : ''}
            </div>

            <div class="p-4 flex-1 flex flex-col justify-between gap-3">
              <div>
                <div class="flex items-center justify-between text-xs mb-1" style="color: ${theme.textMuted};">
                  <span class="capitalize font-semibold" style="color: ${theme.accent};">\${p.category}</span>
                  <span class="font-mono">Slot \${p.slot}</span>
                </div>
                <h3 class="text-sm font-bold line-clamp-1" style="color: ${theme.textPrimary};">\${title}</h3>
                <p class="text-xs line-clamp-2 mt-1" style="color: ${theme.textMuted};">\${desc}</p>
              </div>

              <div class="pt-2 border-t flex items-center justify-between gap-2" style="border-color: ${theme.border};">
                <div class="flex items-baseline gap-1.5">
                  <span class="text-base font-bold font-mono" style="color: ${theme.textPrimary};">\${p.price}</span>
                  <span class="text-xs font-semibold" style="color: ${theme.accent};">\${config.currency}</span>
                  \${p.originalPrice ? \`<span class="text-xs line-through font-mono opacity-60" style="color: ${theme.textMuted};">\${p.originalPrice}</span>\` : ''}
                </div>

                <button onclick="orderAndKeepShopping(\${p.id})" class="px-3 py-2 rounded-xl text-xs font-bold transition shadow-sm active:scale-95 whitespace-nowrap" style="background-color: ${theme.accent}; color: #000000;" title="طلب وإضافة للسلة ومتابعة التسوق">
                  + طلب وإضافة
                </button>
              </div>
            </div>
          </div>
        \`;
      }).join('');
    }

    // Modal Details
    function openProductModal(id) {
      const p = products.find(x => x.id === id);
      if (!p) return;
      const title = currentLang === 'ar' ? p.titleAr : p.titleEn;
      const desc = currentLang === 'ar' ? p.descAr : p.descEn;
      
      const modal = document.getElementById('product-modal');
      const content = document.getElementById('modal-content');
      content.innerHTML = \`
        <div class="aspect-[16/10] bg-black/20 rounded-xl overflow-hidden mb-4 border" style="border-color: ${theme.border};">
          <img src="\${p.image}" alt="\${title}" class="w-full h-full object-cover">
        </div>
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-bold" style="color: ${theme.textPrimary};">\${title}</h2>
          <span class="text-base font-bold font-mono" style="color: ${theme.accent};">\${p.price} \${config.currency}</span>
        </div>
        <p class="text-sm leading-relaxed" style="color: ${theme.textSecondary};">\${desc}</p>
        <div class="grid grid-cols-2 gap-3 pt-4 border-t" style="border-color: ${theme.border};">
          <button onclick="orderAndKeepShopping(\${p.id}); closeProductModal();" class="py-2.5 rounded-xl font-bold text-xs transition" style="background-color: ${theme.accent}; color: #000000;">
            طلب وإضافة (تابع التسوق)
          </button>
          <button onclick="orderAndKeepShopping(\${p.id}); closeProductModal(); toggleCart(true);" class="py-2.5 rounded-xl border text-xs font-semibold transition" style="background-color: ${theme.type === 'light' ? '#f1f5f9' : '#1e242b'}; border-color: ${theme.border}; color: ${theme.textPrimary};">
            إضافة وعرض السلة
          </button>
        </div>
      \`;
      modal.classList.remove('hidden');
    }

    function closeProductModal() {
      document.getElementById('product-modal').classList.add('hidden');
    }

    function setFilter(cat) {
      currentCategory = cat;
      document.querySelectorAll('.filter-tab').forEach(b => {
        if (b.dataset.cat === cat) {
          b.style.backgroundColor = '${theme.accent}';
          b.style.color = '#000000';
        } else {
          b.style.backgroundColor = 'transparent';
          b.style.color = '${theme.textMuted}';
        }
      });
      renderProducts();
    }

    function handleSearch(val) {
      searchQuery = val;
      renderProducts();
    }

    function toggleLang() {
      currentLang = currentLang === 'ar' ? 'en' : 'ar';
      document.documentElement.lang = currentLang;
      document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
      document.getElementById('lang-btn-label').textContent = currentLang === 'ar' ? 'English' : 'عربي';
      renderProducts();
    }

    // Order and continue shopping workflow
    function orderAndKeepShopping(id) {
      const p = products.find(x => x.id === id);
      if (!p) return;
      const existing = cart.find(x => x.product.id === id);
      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({ product: p, quantity: 1 });
      }
      updateCartUI();
      showToast('✓ أُضيف ' + (currentLang === 'ar' ? p.titleAr : p.titleEn) + ' للسلة! تابع التسوق لإضافة المزيد.');
    }

    function showToast(msg) {
      const t = document.getElementById('toast-added');
      const text = document.getElementById('toast-text');
      text.textContent = msg;
      t.classList.remove('opacity-0', 'invisible');
      setTimeout(() => {
        t.classList.add('opacity-0', 'invisible');
      }, 3500);
    }

    function changeQuantity(id, delta) {
      const idx = cart.findIndex(x => x.product.id === id);
      if (idx !== -1) {
        cart[idx].quantity += delta;
        if (cart[idx].quantity <= 0) {
          cart.splice(idx, 1);
        }
      }
      updateCartUI();
    }

    function toggleCart(open) {
      const drawer = document.getElementById('cart-drawer');
      if (open) {
        drawer.classList.remove('opacity-0', 'invisible', 'pointer-events-none');
      } else {
        drawer.classList.add('opacity-0', 'invisible', 'pointer-events-none');
      }
    }

    function updateCartUI() {
      const badge = document.getElementById('cart-badge');
      const itemsContainer = document.getElementById('cart-items');
      const totalEl = document.getElementById('cart-total');

      const count = cart.reduce((sum, item) => sum + item.quantity, 0);
      const total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

      badge.textContent = count;
      totalEl.textContent = total + ' ' + config.currency;

      if (cart.length === 0) {
        itemsContainer.innerHTML = '<div class="py-12 text-center text-xs" style="color: ${theme.textMuted};">سلتك فارغة حالياً. تصفح المنتجات واضغط "طلب وإضافة".</div>';
        return;
      }

      itemsContainer.innerHTML = cart.map(item => \`
        <div class="flex items-center gap-3 p-2.5 rounded-xl border" style="background-color: ${theme.type === 'light' ? '#f8fafc' : '#161c22'}; border-color: ${theme.border};">
          <img src="\${item.product.image}" class="w-12 h-12 rounded-lg object-cover bg-black/20">
          <div class="flex-1 min-w-0">
            <h4 class="text-xs font-bold truncate" style="color: ${theme.textPrimary};">\${currentLang === 'ar' ? item.product.titleAr : item.product.titleEn}</h4>
            <div class="text-[11px] font-mono" style="color: ${theme.accent};">\${item.product.price} \${config.currency}</div>
          </div>
          <div class="flex items-center gap-1.5 px-2 py-1 rounded-lg border text-xs" style="border-color: ${theme.border};">
            <button onclick="changeQuantity(\${item.product.id}, -1)" class="px-1 font-bold">-</button>
            <span class="font-mono font-bold px-1">\${item.quantity}</span>
            <button onclick="changeQuantity(\${item.product.id}, 1)" class="px-1 font-bold">+</button>
          </div>
        </div>
      \`).join('');
    }

    function getOrderText() {
      const name = document.getElementById('cust-name').value.trim() || 'زبون';
      const phone = document.getElementById('cust-phone').value.trim() || 'غير محدد';
      const address = document.getElementById('cust-address').value.trim() || 'غير محدد';
      const notes = document.getElementById('cust-notes').value.trim();

      let lines = [];
      lines.push('مرحباً، أود إتمام الطلب التالي من *' + config.storeNameAr + '*:');
      lines.push('---------------------------');
      lines.push('📦 *تفاصيل المنتجات:*');

      let total = 0;
      cart.forEach((it, idx) => {
        lines.push((idx + 1) + '. ' + it.product.titleAr + ' (الكمية: ' + it.quantity + ') - ' + (it.product.price * it.quantity) + ' ' + config.currency);
        total += it.product.price * it.quantity;
      });

      lines.push('---------------------------');
      lines.push('💰 *المجموع الإجمالي (' + cart.reduce((s, i) => s + i.quantity, 0) + ' قطع):* ' + total + ' ' + config.currency);
      lines.push('---------------------------');
      lines.push('👤 *بيانات العميل:*');
      lines.push('• الاسم: ' + name);
      lines.push('• رقم الهاتف: ' + phone);
      lines.push('• العنوان: ' + address);
      if (notes) lines.push('• ملاحظات: ' + notes);
      lines.push('---------------------------');
      lines.push('يرجى تأكيد التوصيل، شكراً لكم!');

      return lines.join('\\n');
    }

    function orderViaWhatsApp() {
      if (cart.length === 0) {
        alert('يرجى إضافة منتجات إلى السلة أولاً');
        return;
      }
      const text = getOrderText();
      const cleanPhone = config.whatsappNumber.replace(/[^0-9]/g, '');
      const url = 'https://wa.me/' + cleanPhone + '?text=' + encodeURIComponent(text);
      window.open(url, '_blank');
    }

    function orderViaEmail() {
      if (cart.length === 0) {
        alert('يرجى إضافة منتجات إلى السلة أولاً');
        return;
      }
      const text = getOrderText();
      const subject = 'طلب جديد من ' + config.storeNameAr;
      const url = 'mailto:' + config.emailAddress + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(text);
      window.location.href = url;
    }

    renderProducts();
    updateCartUI();
  </script>
</body>
</html>`;
}

export function downloadFile(content: string, filename: string) {
  const blob = new Blob([content], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
